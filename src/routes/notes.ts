import { Router } from "express";
import { CreateNotes, GetNote, GetNotes } from "../controller/notes.controller";

// notes api
export const routes = (router: Router) => {
  router.get("/api/notes", GetNotes);
  router.post("/api/notes", CreateNotes);
  router.get("/api/notes/:id", GetNote);
};
