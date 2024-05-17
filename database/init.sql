-- Criação do banco de dados se não existir
CREATE DATABASE IF NOT EXISTS ecommerce;

-- Seleciona o banco de dados
USE ecommerce;

-- Tabela de usuários (adicionando mais informações)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    birth_date DATE,
    gender ENUM('M', 'F', 'O'),
    password_reset_token VARCHAR(255),
    password_reset_token_expiry DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    role ENUM('admin', 'user') NOT NULL
);

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Tabela de produtos (adicionando mais detalhes)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category_id INT NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0, 
    brand VARCHAR(255), 
    size VARCHAR(10), 
    color VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabela de carrinhos
CREATE TABLE IF NOT EXISTS carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela de itens do carrinho
CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    size VARCHAR(10),
    color VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabela de eventos de rastreamento
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type ENUM('page_view', 'product_view') NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    ip VARCHAR(45) NOT NULL,
    user_agent VARCHAR(255) NOT NULL,
    referrer VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela filha para visualizações de página
CREATE TABLE IF NOT EXISTS page_views (
    event_id INT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Tabela filha para visualizações de produto
CREATE TABLE IF NOT EXISTS product_views (
    event_id INT PRIMARY KEY,
    product_id INT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabela de relatórios
CREATE TABLE IF NOT EXISTS reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_type VARCHAR(255) NOT NULL,
    report_data JSON NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Inserir Usuário Administrador:
INSERT INTO users (name, password, email, phone, role) VALUES 
('Eduardo', '', 'eduardoibarr56@gmail.com', '11999999999', 'admin');

-- Inserir Categorias:
INSERT INTO categories (name, description) VALUES 
('Calçados', 'Variedade de calçados para todos os estilos e ocasiões.'),
('Camisetas', 'Camisetas confortáveis e estilosas para o dia a dia.'),
('Blusas', 'Blusas elegantes e versáteis para compor diferentes looks.');

-- Inserir Produtos (com URLs das imagens):
INSERT INTO products (name, description, price, image_url, category_id) VALUES
('Tênis Casual Masculino Nike Court Vision Low', 'Tênis casual com design inspirado no basquete, conforto e estilo para o dia a dia.', 399.90, 'https://imgnike-a.akamaihd.net/1920x1920/013718ID.jpg', 1),
('Sandália Feminina Birkenstock Arizona', 'Sandália icônica com design anatômico, conforto e estilo para todas as horas.', 499.90, 'https://static.netshoes.com.br/produtos/sandalia-arizona-nubuck-mocha-em-couro-birkenstock-hering-feminina/38/ARI-1280-138/ARI-1280-138_zoom1.jpg?ts=1595439670&ims=544x', 1),
('Camiseta Masculina Básica Reserva Gola Careca', 'Camiseta básica em algodão, ideal para o dia a dia, com caimento confortável e estilo clean.', 99.90, 'https://static.netshoes.com.br/produtos/camiseta-reserva-gola-careca-masculina-lilas/22/B67-6800-022/B67-6800-022_zoom1.jpg?ts=1694700748', 2),
('Camiseta Feminina Estampada Farm Rio Flores Tropicais', 'Camiseta com estampa exclusiva de flores tropicais, tecido leve e toque macio.', 149.90, 'https://a-static.mlcdn.com.br/450x450/camiseta-adidas-farm-rio-estampada-training-feminina/courovestsport/1052166-1052173/65f05f26816fd891611a70f166bfa9fa.jpeg', 2),
('Blusa Feminina Manga Longa Tricô C&A', 'Blusa de tricô com manga longa, ideal para os dias mais frios, com toque macio e design moderno.', 129.90, 'https://cea.vteximg.com.br/arquivos/ids/11886028/Blusa-Tric-Com-Gola-Alta-Marinho_002_1.jpg?v=638260216071970000', 1);
