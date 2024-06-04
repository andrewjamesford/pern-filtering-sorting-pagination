import * as path from "node:path";
const jestOpenAPI = require("jest-openapi").default;

jest.mock("../middleware/authorizationMiddleware");
const db = require("../db");

jestOpenAPI(path.join(__dirname, "../apispec.yaml"));

describe("GIVEN that the GET /reports route exists", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	afterAll(() => {
		db.end();
	});

	test.todo("WHEN the user is not authenticated THEN return status 401");

	test.todo(
		"WHEN the user is authenticated but does not have the right permissions THEN return status 403",
	);

	test.todo("WHEN the user is authenticated THEN return status 200");
});
