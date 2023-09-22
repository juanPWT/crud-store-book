const {
  getAllBooks,
  getAllBooksById,
  createBooks,
  deleteBooks,
  updateBooks,
  searchBooks,
} = require("../constroller/Books.js");
const express = require("express");
const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getAllBooksById);
router.post("/", createBooks);
router.patch("/:id", updateBooks);
router.delete("/:id", deleteBooks);
router.post("/search", searchBooks);

module.exports = router;
