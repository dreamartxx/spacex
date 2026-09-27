-- =============================================================
-- GÖK ATLASI - HOSTINGER MYSQL VERİTABANI ŞEMASI
-- Hostinger hPanel -> phpMyAdmin veya Veritabanları kısmından içe aktarın (Import).
-- =============================================================

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    grade_level VARCHAR(20) DEFAULT '6. Sınıf',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    grade_level VARCHAR(20) NOT NULL,
    score INT NOT NULL,
    correct_count INT NOT NULL,
    total_questions INT NOT NULL,
    certificate_id VARCHAR(50) NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS game_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    game_type VARCHAR(50) NOT NULL, -- 'orbit_sorter', 'moon_hunter', 'layer_detective'
    score INT NOT NULL,
    time_seconds INT NOT NULL,
    stars_earned INT DEFAULT 3,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Örnek Liderlik Tablosu Verileri
INSERT INTO game_scores (student_name, game_type, score, time_seconds, stars_earned) VALUES
('Ali K.', 'orbit_sorter', 1200, 34, 3),
('Zeynep B.', 'orbit_sorter', 1150, 42, 3),
('Can D.', 'orbit_sorter', 980, 56, 2),
('Ayşe M.', 'moon_hunter', 850, 45, 3);
