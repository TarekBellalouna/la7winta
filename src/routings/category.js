const express = require("express");
const router = express.Router();

const userController = require("../controllers/category");

router.post("/add-category", userController.addCategory);
router.put("/edit-category/:id", userController.updateCategory);
router.get("/", userController.getAllCategories);
router.get("fetch-category/:id", userController.getCategoryById);
router.delete("/:id", userController.deleteCategory);

module.exports = router;
