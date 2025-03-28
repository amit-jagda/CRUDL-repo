const Joi = require("joi");

function validateInputData(book, edit = false) {
  if (!edit) {
    // schema for adding data
    const JoiSchema = Joi.object({
      username: Joi.string().alphanum().min(4).max(30).required().messages({
        "string.alphanum": "Username must only contain alphanumeric characters",
        "string.min": "Username must be at least {#limit} characters long",
        "string.max": "Username must be at most {#limit} characters long",
        "string.empty": "Username is required",
      }),
      password: Joi.string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
          )
        )
        .messages({
          "string.min": "Password must be at least {#limit} characters long",
          "string.empty": "Password is required",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }),
      name: Joi.string().min(5).max(100).required(),

      author: Joi.string().min(4).max(50).required(),

      publishyear: Joi.number().min(1).max(2026).required(),

      status: Joi.string().valid("available").valid("not available").optional(),
    }).options({ abortEarly: false });
    return JoiSchema.validate(book);
  }

  // schema for updating data
  const JoiSchema2 = Joi.object({
    username: Joi.string().alphanum().min(4).max(30).required().messages({
      "string.alphanum": "Username must only contain alphanumeric characters",
      "string.min": "Username must be at least {#limit} characters long",
      "string.max": "Username must be at most {#limit} characters long",
      "string.empty": "Username is required",
    }),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        )
      )
      .messages({
        "string.min": "Password must be at least {#limit} characters long",
        "string.empty": "Password is required",
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    name: Joi.string().min(5).max(100).optional(),

    author: Joi.string().min(4).max(50).optional(),

    publishyear: Joi.number().min(1).max(2026).optional(),

    status: Joi.string().valid("available").valid("not available").optional(),
  }).options({ abortEarly: false });

  return JoiSchema2.validate(book);
}

function validateUserData(user) {
  const userSchema = Joi.object({
    username: Joi.string().alphanum().min(4).max(30).required().messages({
      "string.alphanum": "Username must only contain alphanumeric characters",
      "string.min": "Username must be at least {#limit} characters long",
      "string.max": "Username must be at most {#limit} characters long",
      "string.empty": "Username is required",
    }),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        )
      )
      .messages({
        "string.min": "Password must be at least {#limit} characters long",
        "string.empty": "Password is required",
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
  });
  return userSchema.validate(user);
}

module.exports = { validateInputData, validateUserData };
