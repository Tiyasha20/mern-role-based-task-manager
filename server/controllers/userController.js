const User = require("../models/user");

exports.getUsers = async (req, res) => {

    try {

        const users = await User.find().select("_id name email");

        res.json(users);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }

};