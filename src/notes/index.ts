import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { NoteService } from "./service";
import { CreateNoteDTO, UpdateNoteDTO } from "./model";

export const notes = new Elysia({ prefix: "/notes" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "secret",
    })
  )
  .decorate("noteService", new NoteService())
  .derive(async ({ jwt, headers, set }) => {
    const authHeader = headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      set.status = 401;
      throw new Error("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const profile = await jwt.verify(token);
    if (!profile) {
      set.status = 401;
      throw new Error("Unauthorized");
    }
    return {
      user: profile,
    };
  })
  .get("/", async ({ user, noteService }) => {
    return noteService.getNotes(Number(user.id));
  })
  .get("/:id", async ({ user, noteService, params: { id } }) => {
    const note = await noteService.getNote(Number(id), Number(user.id));
    if (!note) {
      throw new Error("Note not found");
    }
    return note;
  })
  .post(
    "/",
    async ({ user, noteService, body }) => {
      return noteService.createNote(Number(user.id), body);
    },
    {
      body: CreateNoteDTO,
    }
  )
  .put(
    "/:id",
    async ({ user, noteService, params: { id }, body }) => {
      const note = await noteService.updateNote(Number(id), Number(user.id), body);
      if (!note) {
        throw new Error("Note not found");
      }
      return note;
    },
    {
      body: UpdateNoteDTO,
    }
  )
  .delete("/:id", async ({ user, noteService, params: { id } }) => {
    const note = await noteService.deleteNote(Number(id), Number(user.id));
    if (!note) {
      throw new Error("Note not found");
    }
    return { success: true };
  });
