import sql from "../db";
import { RegisterInput, LoginInput } from "./model";

export class AuthService {
  async register(data: RegisterInput) {
    const hashedPassword = await Bun.password.hash(data.password);

    try {
      const [user] = await sql`
        INSERT INTO users (username, password)
        VALUES (${data.username}, ${hashedPassword})
        RETURNING id, username, created_at
      `;
      return user;
    } catch (error: any) {
      if (error.code === '23505') { // Unique violation
        throw new Error("Username already exists");
      }
      throw error;
    }
  }

  async login(data: LoginInput) {
    const [user] = await sql`
      SELECT * FROM users WHERE username = ${data.username}
    `;

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await Bun.password.verify(data.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return {
      id: user.id,
      username: user.username,
    };
  }
}
