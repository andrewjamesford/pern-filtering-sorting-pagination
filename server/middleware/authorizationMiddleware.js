const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "",
  issuerBaseURL: "",
});

const checkScopes = requiredScopes("");

module.exports = {
  checkJwt,
  checkScopes,
};
