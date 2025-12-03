import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { auth } from "./auth";
import { notes } from "./notes";

const app = new Elysia()
  .use(swagger())
  .use(auth)
  .use(notes)
  .get("/", () => "Hello Notes")
  .listen(3000);

console.log(
  `Notes API is running at ${app.server?.hostname}:${app.server?.port} 🚀`
);
