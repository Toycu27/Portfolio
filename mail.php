<?php

//Debug Settings
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL); 

//POST Request handler
if ($_POST) {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $response = [
        'success' => false,
        'messages' => [
            'success' => [],
            'warning' => [],
        ]
    ];

    $isValid = validate($response, $name, $email, $message);
    
    if ($isValid) {
        $isSend = submit($response, $name, $email, $message);
    }

    header('Content-Type: application/json; charset=utf-8');
    print json_encode($response);
}

/**
 * validate
 * Validates the client input.
 *
 * @param  Array $response
 * @param  String $name
 * @param  String $email
 * @param  String $message
 * @return bool
 */
function validate(Array &$response, String $name, String $email, String $message):bool {
    if (strlen($name) < 3) {
        $response['messages']['warning'][] 
        = '<div class="flex__item message message--warning">Bitte geben sie einen Namen an.</div>';
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['messages']['warning'][] 
        = '<div class="flex__item message message--warning">Bitte geben sie eine gültige E-Mail Adresse an.</div>';
    }

    if (strlen($message) < 3) {
        $response['messages']['warning'][] 
        = '<div class="flex__item message message--warning">Bitte geben sie eine Nachricht ein.</div>';
    }

    if (count($response['messages']['warning'])) {
        $response['success'] = false;
        return false;
    } else {
        $response['success'] = true;
        return true;
    }
}

/**
 * submit
 * Sends the client input via mail.
 *
 * @param  Array $response
 * @param  String $name
 * @param  String $email
 * @param  String $message
 * @return bool
 */
function submit(Array &$response, String $name, String $email, String $message):bool {
    $headers = 'MIME-Version: 1.0' . "\r\n"
    .'Content-type: text/html; charset=utf-8' . "\r\n"
    .'From: ' . $email . "\r\n";

    if(mail("webmaster@toycu.net", $name, $message, $headers)) {
        $response['messages']['success'][] 
        = '<div class="flex__item message message--success">Vielen Dank ihre Nachricht wurde erfolgreich verschickt.</div>';
    } else {
        $response['messages']['warning'][] 
        = '<div class="flex__item message message--warning">Es gibt ein Mailserver Problem. Bitte benutzen sie eine alternative Kontaktmöglichkeit.</div>';
    }

    if (count($response['messages']['warning'])) {
        $response['success'] = false;
        return false;
    } else {
        $response['success'] = true;
        return true;
    }
}

?>