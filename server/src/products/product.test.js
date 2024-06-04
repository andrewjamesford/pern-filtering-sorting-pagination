import * as path from "node:path";
const jestOpenAPI = require("jest-openapi").default;

jestOpenAPI(path.join(__dirname, "../apispec.yaml"));
const db = require("../db");

describe("GIVEN that the GET /products route exist", () => {
	afterAll(() => {
		db.end();
	});
	test.todo(
		"WHEN there are products THEN return status 200 and an array of products",
	);

	test.todo(
		"WHEN there are no products THEN return status 200 and an empty array",
	);
});

describe("WHEN the client sends a request for a specific number of products", () => {
	test.todo(
		"WHEN the limit query parameter is valid as per the API spec THEN return status 200 and an array of products",
	);

	test.todo(
		"WHEN the limit query parameter is not valid as per the API spec THEN return status 400 and an appropriate error message",
	);
});

describe("WHEN the client sends a request for a specific page of products", () => {
	test.todo(
		"WHEN the page query parameter is valid as per the API spec THEN return 200 status code and an array of products",
	);

	test.todo(
		"WHEN the page query parameter is not valid as per the API spec THEN return status 400 and an appropriate error message",
	);
});
