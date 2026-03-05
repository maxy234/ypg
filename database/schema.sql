-- Bono Region Youth Parliament Database Schema
-- Run this in phpMyAdmin or MySQL command line

CREATE DATABASE IF NOT EXISTS bono_youth_parliament;
USE bono_youth_parliament;

-- Admins table
CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    full_name VARCHAR(100),
    role ENUM('super_admin', 'admin', 'editor') DEFAULT 'editor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Leaders table
CREATE TABLE leaders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    bio TEXT,
    image_path VARCHAR(255),
    display_order INT DEFAULT 0,
    category ENUM('patron', 'executive', 'production') DEFAULT 'executive',
    social_facebook VARCHAR(255),
    social_twitter VARCHAR(255),
    social_linkedin VARCHAR(255),
    social_instagram VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    short_description VARCHAR(300),
    date DATE,
    image_path VARCHAR(255),
    impact_stats VARCHAR(255),
    participants INT DEFAULT 0,
    districts_covered VARCHAR(255),
    status ENUM('ongoing', 'completed', 'upcoming') DEFAULT 'ongoing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News table
CREATE TABLE news (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    summary VARCHAR(300),
    image_path VARCHAR(255),
    publish_date DATE,
    category VARCHAR(50),
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Members (Join Us form submissions)
CREATE TABLE members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    district VARCHAR(100),
    age INT,
    occupation VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by INT,
    reviewed_at TIMESTAMP NULL,
    FOREIGN KEY (reviewed_by) REFERENCES admins(id)
);

-- Gallery table
CREATE TABLE gallery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200),
    image_path VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES admins(id)
);

-- Contact messages
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    subject VARCHAR(200),
    message TEXT,
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    replied_by INT,
    replied_at TIMESTAMP NULL,
    FOREIGN KEY (replied_by) REFERENCES admins(id)
);

-- Events table
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE,
    event_time TIME,
    location VARCHAR(200),
    image_path VARCHAR(255),
    status ENUM('upcoming'),)

    -- Events table (continued)
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE,
    event_time TIME,
    location VARCHAR(200),
    image_path VARCHAR(255),
    status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin (password: admin123 - change immediately!)
INSERT INTO admins (username, password_hash, email, full_name, role) 
VALUES ('admin', '$2y$10$YourHashedPasswordHere', 'admin@bonoyouthparliament.gov.gh', 'System Administrator', 'super_admin');

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, setting_type) VALUES
('site_name', 'Bono Region Youth Parliament Ghana', 'text'),
('site_email', 'info@bonoyouthparliament.gov.gh', 'text'),
('site_phone', '+233 XX XXX XXXX', 'text'),
('site_address', 'Regional Coordinating Council, Sunyani, Bono Region', 'text'),
('facebook_url', 'https://facebook.com/bonoyouthparliament', 'text'),
('twitter_url', 'https://twitter.com/bonoyouth', 'text'),
('instagram_url', 'https://instagram.com/bonoyouthparliament', 'text'),
('youtube_url', 'https://youtube.com/bonoyouthparliament', 'text'),
('maintenance_mode', '0', 'boolean');

-- Create indexes for better performance
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_news_publish_date ON news(publish_date);
CREATE INDEX idx_events_event_date ON events(event_date);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_leaders_category ON leaders(category);