const db = require('../config/db');

const User = {
    create: (name, phone, email, callback) => {
        const sql = "INSERT INTO users (name, phone, email) VALUES (?, ?, ?)";
        db.query(sql, [name, phone, email], callback);
    },
    getAll: (callback) => {
        const sql = "SELECT * FROM users";
        db.query(sql, callback);
    },
    update: (id, name, phone, email, callback) => {
        const sql = "UPDATE users SET name = ?, phone = ?, email = ? WHERE id = ?";
        db.query(sql, [name, phone, email, id], callback);
    },
    delete: (id, callback) => {
        const sql = "DELETE FROM users WHERE id = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = User;
