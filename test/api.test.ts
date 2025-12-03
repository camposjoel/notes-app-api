import { describe, expect, it, beforeAll } from "bun:test";

const BASE_URL = "http://localhost:3000";
let token = "";
let userId = 0;
let noteId = 0;

const testUser = {
  username: `testuser_${Date.now()}`,
  password: "password123",
};

describe("Notes API", () => {
  it("should register a new user", async () => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testUser),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toHaveProperty("id");
    expect(data.username).toBe(testUser.username);
    userId = data.id;
  });

  it("should login", async () => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testUser),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toHaveProperty("token");
    token = data.token;
  });

  it("should create a note", async () => {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "Test Note",
        content: "This is a test note",
      }),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.title).toBe("Test Note");
    noteId = data.id;
  });

  it("should get all notes", async () => {
    const response = await fetch(`${BASE_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it("should get a single note", async () => {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.id).toBe(noteId);
  });

  it("should update a note", async () => {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "Updated Note",
      }),
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.title).toBe("Updated Note");
  });

  it("should delete a note", async () => {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
