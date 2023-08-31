import request from "supertest";
import app, { emptyDB, populateDB } from "../package2/index";

describe("GET user: ", () => {
  test("User data available", async () => {
    await populateDB();
    const response = await request(app).get("/app/user");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  }, 10000);
  test("No User data available", async () => {
    await emptyDB();
    const response = await request(app).get("/app/user");

    console.log(response.body.length);

    expect(response.status).toBe(204);
    expect(response.body).toBeDefined();
  }, 10000);
});

describe("ADD user: ", () => {
  test("Adding with optional field", async () => {
    const testData = {
      name: "tester",
      emp_code: 3053,
      password: "pass",
      email: "tester@gmail.com",
      mobile_no: 9876543210,
      dob: "01-07-2001",
    };
    const response = await request(app).post("/app/user").send(testData);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.msg).toBe("User added successfully");
  });
  test("Adding without optional field", async () => {
    const testData = {
      name: "tester1",
      emp_code: 3053,
      password: "pass",
      email: "tester1@gmail.com",
      mobile_no: 9876543210,
    };
    const response = await request(app).post("/app/user").send(testData);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.msg).toBe("User added successfully");
  });
  test("Adding with invalid data", async () => {
    const testData = {
      name: "tester",
      emp_code: 3053,
      password: "pass",
      // email: "tester@gmail.com",
      // mobile_no: 9876543210,
    };
    const response = await request(app).post("/app/user").send(testData);

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Bad request");
  });
  test("User Already exists", async () => {
    const testData = {
      name: "tester",
      emp_code: 3053,
      password: "pass",
      email: "tester@gmail.com",
      mobile_no: 9876543210,
    };
    const response = await request(app).post("/app/user").send(testData);

    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("This Username has already been registered");
  });
});
