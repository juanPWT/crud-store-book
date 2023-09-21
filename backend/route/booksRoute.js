const {
  getAllBooks,
  getAllBooksById,
  createBooks,
  deleteBooks,
  updateBooks,
} = require("../constroller/Books.js");
const express = require("express");
const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getAllBooksById);
router.post("/", createBooks);
router.patch("/:id", updateBooks);
router.delete("/:id", deleteBooks);

module.exports = router;
