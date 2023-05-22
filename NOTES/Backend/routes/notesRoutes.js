const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getNotes,
  createNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controller/notesController");

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNotes);
router
  .route("/:id")
  .get(protect, getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);
// .put().delete();

module.exports = router;
