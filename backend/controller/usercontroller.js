const User = require('../models/usermodal');

exports.createUser = (req, res) => {
    const { name, phone, email } = req.body;
    User.create(name, phone, email, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json({ message: "User added successfully!" });
    });
};

exports.getUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(results);
    });
};

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
}
    User.update = (userId, name, phone, email, callback) => {
        (userId, name, phone, email, (err, result) => {
            console.log(result)
        if (err) return res.status(500).json({ message: "Database error" });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully!" });
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    User.delete(userId, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully!" });
    });
};