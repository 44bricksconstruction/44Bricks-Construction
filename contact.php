<?php
/**
 * 44 BRICKS — website form handler (all forms POST here).
 * 1. Emails the enquiry to info@44bricksconstruction.com (Reply-To = visitor).
 * 2. Sends the visitor an automatic confirmation with their reference number.
 * 3. Logs every enquiry to leads/leads.csv (folder is blocked from public access).
 * Returns JSON: { ok, ref } or { ok:false, error }.
 */

// ---- config ----
$TO        = 'info@44bricksconstruction.com, 44bricksconstruction@gmail.com';
$SITE      = '44bricksconstruction.com';
$FROM      = 'website@44bricksconstruction.com'; // must be a mailbox on your domain
$PHONE     = '+233 543 100 015';
$AUTOREPLY = true;
$LOG_DIR   = __DIR__ . '/leads';

header('Content-Type: application/json; charset=utf-8');
$origin  = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://' . $SITE, 'https://www.' . $SITE, 'http://' . $SITE, 'http://www.' . $SITE];
if (in_array($origin, $allowed, true)) { header('Access-Control-Allow-Origin: ' . $origin); header('Vary: Origin'); }
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok' => false, 'error' => 'Method not allowed']); exit; }

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) { $data = $_POST; }

if (!empty($data['_honey'])) { echo json_encode(['ok' => true, 'ref' => 'OK']); exit; }

// ---- simple rate limit: 6 submissions / 10 min per IP ----
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rl = sys_get_temp_dir() . '/b44_' . md5($ip);
$hits = array_filter(@json_decode(@file_get_contents($rl), true) ?: [], function ($t) { return $t > time() - 600; });
if (count($hits) >= 6) { http_response_code(429); echo json_encode(['ok' => false, 'error' => 'Too many submissions — please try again in a few minutes or call ' . $PHONE . '.']); exit; }
$hits[] = time(); @file_put_contents($rl, json_encode(array_values($hits)));

$subject = isset($data['_subject']) ? trim($data['_subject']) : 'New enquiry';
$replyto = isset($data['_replyto']) ? trim($data['_replyto']) : (isset($data['email']) ? trim($data['email']) : '');
$page    = isset($data['_page']) ? trim($data['_page']) : '';
foreach (array_keys($data) as $k) { if (strpos($k, '_') === 0) unset($data[$k]); }

$errors = [];
if (isset($data['email']) && $data['email'] !== '' && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'Please enter a valid email address.';
$nonEmpty = 0; foreach ($data as $v) { if (trim((string)$v) !== '') $nonEmpty++; }
if ($nonEmpty === 0) $errors[] = 'The form is empty.';
if ($errors) { http_response_code(422); echo json_encode(['ok' => false, 'error' => implode(' ', $errors)]); exit; }

function clean($s) { return trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', (string)$s)); }

$ref = '44B-' . date('ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 4));

// ---- email to 44 BRICKS ----
$lines = [$subject, 'Reference: ' . $ref, ''];
foreach ($data as $key => $val) { $lines[] = ucwords(str_replace(['_', '-'], ' ', $key)) . ': ' . trim((string)$val); }
$lines[] = ''; $lines[] = '—';
if ($page) $lines[] = 'Submitted from: ' . $page;
$lines[] = 'Received: ' . date('d M Y, H:i');
$lines[] = 'Visitor IP: ' . $ip;
$headers  = 'From: 44 BRICKS Website <' . $FROM . ">\r\n";
if ($replyto && filter_var($replyto, FILTER_VALIDATE_EMAIL)) $headers .= 'Reply-To: ' . clean($replyto) . "\r\n";
$headers .= "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n";
$sent = @mail($TO, clean('[' . $ref . '] ' . $subject), implode("\r\n", $lines), $headers, '-f' . $FROM);

// ---- log ----
if (!is_dir($LOG_DIR)) { @mkdir($LOG_DIR, 0750, true); @file_put_contents($LOG_DIR . '/.htaccess', "Require all denied\nDeny from all\n"); }
$fh = @fopen($LOG_DIR . '/leads.csv', 'a');
if ($fh) { fputcsv($fh, [date('c'), $ref, $subject, $page, $data['name'] ?? '', $replyto, $data['phone'] ?? '', json_encode($data, JSON_UNESCAPED_UNICODE), $sent ? 'emailed' : 'mail-failed']); fclose($fh); }

if (!$sent) { http_response_code(500); echo json_encode(['ok' => false, 'error' => 'Mail server error', 'ref' => $ref]); exit; }

// ---- confirmation to visitor ----
if ($AUTOREPLY && $replyto && filter_var($replyto, FILTER_VALIDATE_EMAIL)) {
  $name = isset($data['name']) ? clean($data['name']) : '';
  $msg  = 'Hello' . ($name ? ' ' . $name : '') . ",\r\n\r\n"
        . "Thank you for contacting 44 BRICKS. We've received your request (" . clean($subject) . ").\r\n\r\n"
        . 'Your reference: ' . $ref . "\r\n\r\n"
        . "What happens next:\r\n"
        . "  1. A member of our team reviews your request within one working day.\r\n"
        . "  2. We contact you to confirm details and, where needed, arrange a site visit.\r\n"
        . "  3. You receive a clear scope, programme and quotation.\r\n\r\n"
        . 'Need us sooner? Call ' . $PHONE . " or reply to this email.\r\n\r\n"
        . "44 BRICKS — Strong Foundations. Lasting Impact.\r\nhttps://" . $SITE . "\r\n";
  $h2  = 'From: 44 BRICKS <' . $FROM . ">\r\nReply-To: info@44bricksconstruction.com\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n";
  @mail(clean($replyto), 'We received your request — ' . $ref, $msg, $h2, '-f' . $FROM);
}

echo json_encode(['ok' => true, 'ref' => $ref]);
