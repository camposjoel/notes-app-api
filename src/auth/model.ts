import { t } from "elysia";

export const RegisterDTO = t.Object({
  username: t.String(),
  password: t.String(),
});

export const LoginDTO = t.Object({
  username: t.String(),
  password: t.String(),
});

export type RegisterInput = typeof RegisterDTO.static;
export type LoginInput = typeof LoginDTO.static;
