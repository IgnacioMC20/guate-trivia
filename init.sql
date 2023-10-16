-- Create the guate-trivia database if it doesn't exist
CREATE DATABASE IF NOT EXISTS guate_trivia;

-- Use the guate-trivia database
USE guate_trivia;

-- Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  PRIMARY KEY (id),
  UNIQUE KEY email_unique (email) -- Ensure email is unique
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; -- Recommended settings for Unicode support

-- Create the friends table if it doesn't exist
CREATE TABLE IF NOT EXISTS friends (
  id INT AUTO_INCREMENT,
  user_id_1 INT NOT NULL,
  user_id_2 INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id_1) REFERENCES users(id),
  FOREIGN KEY (user_id_2) REFERENCES users(id),
  CONSTRAINT unique_friendship UNIQUE (user_id_1, user_id_2) -- Ensure the combination of friends is unique
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert 5 fictional users with validations to avoid duplicates
INSERT INTO users (username, email, password, avatar) VALUES
  ('Juan Pérez', 'juan@example.com', 'password1', 'avatar1.jpg'),
  ('Maria González', 'maria@example.com', 'password2', 'avatar2.jpg'),
  ('Carlos Ramírez', 'carlos@example.com', 'password3', 'avatar3.jpg'),
  ('Luisa Martínez', 'luisa@example.com', 'password4', 'avatar4.jpg'),
  ('Ana Sánchez', 'ana@example.com', 'password5', 'avatar5.jpg')
ON DUPLICATE KEY UPDATE email = VALUES(email); -- In case of duplicates, update a specific field

-- Create friendship relationships with validations
INSERT INTO friends (user_id_1, user_id_2)
VALUES
  (1, 2), -- Juan is friends with Maria
  (1, 3), -- Juan is friends with Carlos
  (2, 4), -- Maria is friends with Luisa
  (3, 5) -- Carlos is friends with Ana
ON DUPLICATE KEY UPDATE user_id_1 = VALUES(user_id_1), user_id_2 = VALUES(user_id_2);
-- In case of duplicates, update a specific field
