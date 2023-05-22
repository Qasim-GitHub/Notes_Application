const expressAsyncHandler = require("express-async-handler");
const Note = require("../model/notesModel");

const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });

  res.status(200).json(notes);
});

const createNotes = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("PLEASE FILL ALL FIELDS");
  }

  const note = await Note.create({
    user: req.user._id,
    title,
    content,
    category,
  });

  res.status(200).json(note);
});

const getNoteById = expressAsyncHandler(async (req, res) => {
  //   const note = await Note.find({ _id: req.params.id });
  const note = await Note.findById(req.params.id);
  res.status(201).json(note);

  if (!note) {
    res.status(404);
    throw new Error("Note Not Found");
  }
});

const updateNote = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  const { title, content, category } = req.body;
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("you can not perform this action");
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    const update = await note.save();
    res.status(200).json({
      message: "Data is Updated",
      updatedDated: update,
    });
  }
});

const deleteNote = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("you can not perform this action");
  }
  if (note) {
    const deleteNoteById = note.remove();
    res.status(200).json({
      message: "Note is Deleted!",
      data: deleteNoteById,
    });
  }
});

module.exports = { getNotes, createNotes, getNoteById, updateNote, deleteNote };
