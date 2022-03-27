const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/login", userController.signIn);
//router.post("/login", userController.login);
router.put("/passwordreset", userController.passwordReset);
router.post("/register", userController.signUp);
router.post("/check-role", userController.checkRole);
router.get("/:id", userController.userDetails);
router.get("/", userController.getUsers);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.disableUser);
router.post("/update", userController.updateFile);
router.put("/role/:id", userController.updateRole);

module.exports = router;
