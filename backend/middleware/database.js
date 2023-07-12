const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "news_app",
    multipleStatements:true
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Database Connected Successfully")
    const sql =
        `CREATE TABLE IF NOT EXISTS user(
            id int NOT NULL AUTO_INCREMENT,
            firstName varchar(255) NOT NULL,
            lastName varchar(255) NOT NULL,
            email varchar(255) NOT NULL UNIQUE,
            password varchar(255) NOT NULL,
            PRIMARY KEY (id)
        );
        
        CREATE TABLE IF NOT EXISTS news(
            id int NOT NULL AUTO_INCREMENT,
            source varchar(255),
            title varchar(255),
            description varchar(255),
            url varchar(255) UNIQUE,
            urlToImage varchar(255),
            publishedAt varchar(255),
            content text,
            category varchar(255),
            country varchar(255),
            language varchar(255),
            PRIMARY KEY (id)
        );
        
        CREATE TABLE IF NOT EXISTS categories(
            id int NOT NULL AUTO_INCREMENT,
            category varchar(25),
            PRIMARY KEY (id)
        );
        
        INSERT INTO categories (category)
        SELECT * FROM (SELECT 'business') AS tmp
        WHERE NOT EXISTS (
            SELECT category FROM categories WHERE category = 'Business'
        ) LIMIT 1;

        INSERT INTO categories (category)
        SELECT * FROM (SELECT 'entertainment') AS tmp
        WHERE NOT EXISTS (
            SELECT category FROM categories WHERE category = 'Entertainment'
        ) LIMIT 1;

        INSERT INTO categories (category)
        SELECT * FROM (SELECT 'general') AS tmp
        WHERE NOT EXISTS (
            SELECT category FROM categories WHERE category = 'General'
        ) LIMIT 1;
        
        INSERT INTO categories (category)
        SELECT * FROM (SELECT 'health') AS tmp
        WHERE NOT EXISTS (
            SELECT category FROM categories WHERE category = 'Health'
        ) LIMIT 1;

        INSERT INTO categories (category)
        SELECT * FROM (SELECT 'science') AS tmp
        WHERE NOT EXISTS (
            SELECT category FROM categories WHERE category = 'Science'
        ) LIMIT 1;

        INSERT INTO categories (category)
        SELECT * FROM (SELECT 'sports') AS tmp
        WHERE NOT EXISTS (
            SELECT category FROM categories WHERE category = 'Sports'
        ) LIMIT 1;

        INSERT INTO categories (category)
        SELECT * FROM (SELECT 'technology') AS tmp
        WHERE NOT EXISTS (
            SELECT category FROM categories WHERE category = 'Technology'
        ) LIMIT 1;
        `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log("Tables Created Successfully")
    });
})

module.exports = { connection };