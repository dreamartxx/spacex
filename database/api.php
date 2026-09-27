<?php
/**
 * GÖK ATLASI - HOSTINGER PHP & MYSQL REST API
 * Bu dosyayı Hostinger üzerinde 'public_html/api.php' konumuna koyabilirsiniz.
 * CORS başlıkları ve JSON yanıtları ile React uygulamanızla haberleşir.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// HOSTINGER MYSQL VERİTABANI BAĞLANTI AYARLARI
// Bu bilgileri Hostinger hPanel -> Veritabanları kısmından alabilirsiniz:
$db_host = "localhost";
$db_name = "u123456789_gokatlasi"; // Hostinger veritabanı adı
$db_user = "u123456789_admin";     // Hostinger veritabanı kullanıcısı
$db_pass = "GucluSifre123!";        // Hostinger veritabanı şifresi

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    // Veritabanı henüz bağlanmadıysa veya yerel geliştirme modundaysa şık bir test yanıtı döner:
    echo json_encode([
        "status" => "mock_mode",
        "message" => "Hostinger veritabanı bilgileri henüz girilmedi veya localhost modunda çalışıyor. Bilgileri api.php dosyasında güncelleyebilirsiniz."
    ]);
    exit();
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'save_quiz':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || empty($data['student_name'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Eksik veri gönderildi."]);
            exit();
        }
        $stmt = $pdo->prepare("INSERT INTO quiz_results (student_name, grade_level, score, correct_count, total_questions, certificate_id) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['student_name'],
            $data['grade_level'] ?? '6. Sınıf',
            intval($data['score']),
            intval($data['correct_count']),
            intval($data['total_questions']),
            $data['certificate_id'] ?? null
        ]);
        echo json_encode(["status" => "success", "id" => $pdo->lastInsertId()]);
        break;

    case 'save_score':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || empty($data['student_name'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Eksik veri."]);
            exit();
        }
        $stmt = $pdo->prepare("INSERT INTO game_scores (student_name, game_type, score, time_seconds, stars_earned) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['student_name'],
            $data['game_type'],
            intval($data['score']),
            intval($data['time_seconds'] ?? 0),
            intval($data['stars_earned'] ?? 3)
        ]);
        echo json_encode(["status" => "success", "id" => $pdo->lastInsertId()]);
        break;

    case 'leaderboard':
        $game_type = isset($_GET['game_type']) ? $_GET['game_type'] : 'orbit_sorter';
        $stmt = $pdo->prepare("SELECT student_name, score, time_seconds, stars_earned, played_at FROM game_scores WHERE game_type = ? ORDER BY score DESC, time_seconds ASC LIMIT 10");
        $stmt->execute([$game_type]);
        $rows = $stmt->fetchAll();
        echo json_encode(["status" => "success", "data" => $rows]);
        break;

    default:
        echo json_encode([
            "status" => "ready",
            "app" => "Gök Atlası Hostinger API",
            "version" => "1.0.0",
            "endpoints" => [
                "POST ?action=save_quiz",
                "POST ?action=save_score",
                "GET ?action=leaderboard&game_type=orbit_sorter"
            ]
        ]);
        break;
}
