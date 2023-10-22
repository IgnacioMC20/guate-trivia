
CREATE DATABASE IF NOT EXISTS guate_trivia;


USE guate_trivia;


CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  PRIMARY KEY (id),
  UNIQUE KEY email_unique (email) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 


CREATE TABLE IF NOT EXISTS friends (
  id INT AUTO_INCREMENT,
  user_id_1 INT NOT NULL,
  user_id_2 INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id_1) REFERENCES users(id),
  FOREIGN KEY (user_id_2) REFERENCES users(id),
  CONSTRAINT unique_friendship UNIQUE (user_id_1, user_id_2) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO users (username, email, password, avatar) VALUES
  ('Juan Pérez', 'juan@example.com', 'password1', 'avatar1.jpg'),
  ('Maria González', 'maria@example.com', 'password2', 'avatar2.jpg'),
  ('Carlos Ramírez', 'carlos@example.com', 'password3', 'avatar3.jpg'),
  ('Luisa Martínez', 'luisa@example.com', 'password4', 'avatar4.jpg'),
  ('Ana Sánchez', 'ana@example.com', 'password5', 'avatar5.jpg')
ON DUPLICATE KEY UPDATE email = VALUES(email); 


INSERT INTO friends (user_id_1, user_id_2)
VALUES
  (1, 2), -- Juan is friends with Maria
  (1, 3), -- Juan is friends with Carlos
  (2, 4), -- Maria is friends with Luisa
  (3, 5) -- Carlos is friends with Ana
ON DUPLICATE KEY UPDATE user_id_1 = VALUES(user_id_1), user_id_2 = VALUES(user_id_2);

