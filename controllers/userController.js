const User = require("../models/userModel");

const register = async (req, res) => {
    let userBody = req.body;

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            "status": "error",
            "message": "Missing data"
        });
    }

    let userData = {
        email: req.body.email,
        password: req.body.password
    }

    try {
        const userAlreadyExist = await User.find({ $or: [{ email: userData.email.toLowerCase() }] });

        if (userAlreadyExist && userAlreadyExist.length >= 1) {
            return res.status(200).json({
                "status": "success",
                "message": "The user already exists"
            });
        }

        let user_to_save = new User(userData);

        try {
            const userStored = await user_to_save.save();

            if (!userStored) {
                return res.status(500).json({
                    "status": "error",
                    "message": "No user saved"
                });
            }

            return res.status(200).json({
                "status": "success",
                "message": "User registered",
                "user": userStored
            });

        } catch {
            return res.status(500).json({
                "status": "error",
                "message": "Error while saving user"
            });
        }
    } catch {
        return res.status(500).json({
            "status": "error",
            "message": "Error while finding user duplicate"
        });
    }
}

const list = (req, res) => {
    User.find().sort('_id').then(users => {
        if (!users) {
            return res.status(404).json({
                status: "Error",
                message: "No users avaliable..."
            });
        }

        return res.status(200).json({
            "status": "success",
            users
        });
    }).catch(error => {
        return res.status(500).json({
            "status": "error",
            error
        });
    });
}

const test = (req, res) => {
    return res.status(200).json({
        "id": 1,
        "name": "Jose Lopez"
    });
  }

module.exports = {
    register,
    list,
    test
}