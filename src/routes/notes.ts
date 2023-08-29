import { Router } from "express";
import {
  CreateNotes,
  DeleteNote,
  GetNote,
  GetNotes,
  UpdateNote,
} from "../controller/notes.controller";

// notes api
export const routes = (router: Router) => {
  router.get("/api/notes", GetNotes);
  router.post("/api/notes", CreateNotes);
  router.get("/api/notes/:id", GetNote);
  router.put("/api/notes/:id", UpdateNote);
  router.delete("/api/notes/:id", DeleteNote);
};
