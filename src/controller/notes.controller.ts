import { Request, Response, NextFunction, RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../model/note";

export const GetNotes: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await NoteModel.find().exec();

    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

export const CreateNotes: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title.");
    }

    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const GetNote: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createHttpError(400, "Invalid note id");
    }

    const findNote = await NoteModel.findById(req.params.id).exec();

    if (!findNote) {
      throw createHttpError(404, "Notes not found");
    }

    res.status(200).json(findNote);
  } catch (error) {
    next(error);
  }
};

export const UpdateNote: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createHttpError(400, "Invalid note id");
    }

    if (!title) {
      throw createHttpError(400, "Note must have a title.");
    }

    const findNote = await NoteModel.findById(req.params.id).exec();

    if (!findNote) {
      throw createHttpError(404, "Notes not found");
    }

    findNote.title = title;
    findNote.text = text;

    const updateNote = await findNote.save();

    res.status(200).json(updateNote);
  } catch (error) {
    next(error);
  }
};

export const DeleteNote: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createHttpError(400, "Invalid note id");
    }

    const findNote = await NoteModel.findById(req.params.id).exec();

    if (!findNote) {
      throw createHttpError(404, "Notes not found");
    }

    await findNote.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
