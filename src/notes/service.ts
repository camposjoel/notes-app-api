import sql from "../db";
import { CreateNoteInput, UpdateNoteInput } from "./model";

export class NoteService {
  async getNotes(userId: number) {
    const notes = await sql`
      SELECT * FROM notes WHERE user_id = ${userId} ORDER BY created_at DESC
    `;
    return [...notes];
  }

  async getNote(id: number, userId: number) {
    const [note] = await sql`
      SELECT * FROM notes WHERE id = ${id} AND user_id = ${userId}
    `;
    return note;
  }

  async createNote(userId: number, data: CreateNoteInput) {
    const [note] = await sql`
      INSERT INTO notes (user_id, title, content)
      VALUES (${userId}, ${data.title}, ${data.content || null})
      RETURNING *
    `;
    return note;
  }

  async updateNote(id: number, userId: number, data: UpdateNoteInput) {
    const [note] = await sql`
      UPDATE notes
      SET title = COALESCE(${data.title || null}, title),
          content = COALESCE(${data.content || null}, content),
          updated_at = NOW()
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `;
    return note;
  }

  async deleteNote(id: number, userId: number) {
    const [note] = await sql`
      DELETE FROM notes
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING id
    `;
    return note;
  }
}
