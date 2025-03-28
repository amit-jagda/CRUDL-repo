const giveResponse = require("../globalHandler/globalResponseFunction");
const { validateUserData } = require("./joiValidation");
const { Users } = require("../model/users.model");
//

//
async function authenticate(req, res, next) {
  const { username, password } = req.body;

  const response = validateUserData({ username, password });
  if (response.error) {
    console.log(response.error.details);
    giveResponse(400, res, {
      message: response.error.details,
    });
  } else {
    const askedUser = await Users.findAll({
      where: {
        username: username,
        password: password,
      },
    });
    if (askedUser.length === 0) {
      return giveResponse(400, res, {
        message: "Invalid Username or password",
      });
    }
    if (askedUser.length > 0) {
      req.user = askedUser;
      next();
    }
    // giveResponse(400, res, { message: "You" });
  }
}

module.exports = authenticate;
