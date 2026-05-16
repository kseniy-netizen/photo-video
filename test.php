<?php

$host = 'aws-0-eu-west-1.pooler.supabase.com';
$port = '6543';
$dbname = 'postgres';
$user = 'postgres.aayusrueffmmydqhqbhe';
$pass = 'asdlkjqwepoi6';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Подключение успешно!";
} catch (PDOException $e) {
    echo "❌ Ошибка подключения: " . $e->getMessage();
}
