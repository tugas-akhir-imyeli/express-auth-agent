import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

// Create a connection to the MySQL server
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Connect to the MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to the database');

    // Create the "aries_authority" database
    connection.query('CREATE DATABASE IF NOT EXISTS aries_authority', (err) => {
        if (err) {
            console.error('Error creating the database:', err);
            return;
        }

        console.log('Database "aries_authority" created');

        // Switch to the "aries_authority" database
        connection.query('USE aries_authority', (err) => {
            if (err) {
                console.error('Error switching to the database:', err);
                return;
            }

            console.log('Using database "aries_authority"');

            // Create the "session" table
            let createTableQuery = `
                CREATE TABLE IF NOT EXISTS issued_list (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    nim VARCHAR(255) NOT NULL,
                    cred_rev_id VARCHAR(255) NOT NULL,
                    rev_reg_id VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `;

            connection.query(createTableQuery, (err) => {
                if (err) {
                    console.error('Error creating the table:', err);
                    return;
                }
                // Close the connection to the MySQL server
                connection.end((err) => {
                    if (err) {
                        console.error('Error closing the connection:', err);
                        return;
                    }

                    console.log('Connection closed');
                });

                console.log('Table "session" created');
            });
        });
    });
});