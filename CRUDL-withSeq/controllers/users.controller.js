const giveResponse = require("../globalHandler/globalResponseFunction");
const { validateUserData } = require("../middleware/joiValidation");
const { Users } = require("../model/users.model");
const { Op } = require("sequelize");
//  adding user to database
async function addUser(req, res) {
  const { username, password } = req.body;

  const response = validateUserData({ username, password });

  if (response.error) {
    console.log(response.error.details);
    giveResponse(400, res, { error: response.error.details });
  } else {
    const newUser = { username, password };
    const checkUser = await Users.findAll({
      where: {
        username: username,
      },
    });
    if (checkUser.length > 0) {
      return giveResponse(409, res, {
        message: "User already exists!",
      });
    }
    const addedUser = await Users.create(newUser);
    return giveResponse(200, res, {
      message: "User added successfully",
      user: addedUser,
    });
  }
}

module.exports = { addUser };
