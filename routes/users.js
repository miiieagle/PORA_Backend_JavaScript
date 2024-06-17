const express = require("express");
const router = express.Router();
const { authValidation } = require("../validations/userValidation");
const usersController = require("../controllers/users");
const authenticateToken = require("../middlewares/auth"); // Import authentication middleware

router.post("/signup", authValidation, usersController.signUp);
router.post("/signin", authValidation, usersController.signIn);

// Example protected route
router.get("/profile", authenticateToken, (req, res) => {
    res.json({ msg: 'Profile route', user: req.user });
});

module.exports = router;
