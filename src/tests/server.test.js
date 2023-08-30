const request = require("supertest");
const app = require("../server");

describe("Ruta inicial",() => {
  test("Should respond with a 200 status code", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
  });

  test("Should respond with a 404 status code", async () => {
    const response = await request(app).get("/asdasd").send();
    expect(response.statusCode).toBe(404);
  });
});
