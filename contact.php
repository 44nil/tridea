<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

function clean($value) {
    $value = trim($value ?? '');
    return str_replace(["\r", "\n"], '', $value);
}

$name    = clean($_POST['name'] ?? '');
$email   = clean($_POST['email'] ?? '');
$company = clean($_POST['company'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email']);
    exit;
}

$to      = 'info@eduxperts.com.tr';
$subject = 'New contact form submission — ' . $name;

$body  = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Company / Project: " . ($company !== '' ? $company : '-') . "\n\n";
$body .= "Message:\n$message\n";

$headers   = [];
$headers[] = 'From: EduXperts Website <no-reply@eduxperts.com.tr>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Mail could not be sent']);
}
