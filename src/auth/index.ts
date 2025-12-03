import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { AuthService } from "./service";
import { RegisterDTO, LoginDTO } from "./model";

export const auth = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "secret",
    })
  )
  .decorate("authService", new AuthService())
  .post(
    "/register",
    async ({ body, authService }) => {
      return authService.register(body);
    },
    {
      body: RegisterDTO,
    }
  )
  .post(
    "/login",
    async ({ body, authService, jwt, set }) => {
      const user = await authService.login(body);
      const token = await jwt.sign({
        id: user.id,
        username: user.username,
      });

      set.status = 200;
      return {
        token,
        user,
      };
    },
    {
      body: LoginDTO,
    }
  );
