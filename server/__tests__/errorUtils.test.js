import { AppError, getStatus } from "./../utils/appError";

describe("getStatus", () => {
  test("should return 'fail' when status code is between 400 and 500", () => {
    expect(getStatus(400)).toBe("fail");
    expect(getStatus(499)).toBe("fail");
  });

  test("should return 'error' when status codes 500 and above", () => {
    expect(getStatus(500)).toBe("error");
    expect(getStatus(501)).toBe("error");
  });

  test("should return 'error' when status codes below 400", () => {
    expect(getStatus(399)).toBe("error");
    expect(getStatus(200)).toBe("error");
  });
});

describe("AppError", () => {
  test("should set a message, statusCode and status correctly", () => {
    const error = new AppError("Something went wrong", 404);
    expect(error.message).toBe("Something went wrong");
    expect(error.statusCode).toBe(404);
    expect(error.status).toBe("fail");
    expect(error.isOperational).toBe(true);
  });

  test('should set status to "error" for status codes 500 and above', () => {
    const error = new AppError("Server error", 500);
    expect(error.statusCode).toBe(500);
    expect(error.status).toBe("error");
  });

  test("should capture stack trace", () => {
    const error = new AppError("Test error", 400);
    expect(error.stack).toBeDefined();
    expect(error.stack).toContain("Test error");
  });
});
