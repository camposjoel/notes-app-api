import { t } from "elysia";

export const CreateNoteDTO = t.Object({
  title: t.String(),
  content: t.Optional(t.String()),
});

export const UpdateNoteDTO = t.Object({
  title: t.Optional(t.String()),
  content: t.Optional(t.String()),
});

export type CreateNoteInput = typeof CreateNoteDTO.static;
export type UpdateNoteInput = typeof UpdateNoteDTO.static;
