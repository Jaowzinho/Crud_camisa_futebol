DROP DATABASE IF EXISTS camisa_time;

CREATE DATABASE camisa_time;

USE camisa_time;

CREATE TABLE camisa (
    id_camisa INT AUTO_INCREMENT PRIMARY KEY,
    nome_camisa VARCHAR(100) NOT NULL,
    ano_camisa YEAR NOT NULL,
    tamanho_camisa ENUM('PP', 'P', 'M', 'G', 'GG', 'XG') NOT NULL,
    preco_camisa DECIMAL(10, 2) NOT NULL,
    url_img VARCHAR(255) NOT NULL
);
