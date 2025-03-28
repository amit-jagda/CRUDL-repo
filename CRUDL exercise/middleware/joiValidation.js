const Joi = require("joi");

function validateInputData(book, edit = false) {
  if (!edit) {
    // schema for post / put
    const bookSchema = Joi.object({
      name: Joi.string().min(5).max(100).required().messages({
        "string.min":
          "name is required and cannot be empty or only whitespace.",
        "string.empty":
          "name is required and cannot be empty or only whitespace.",
        "any.required":
          "name is required and cannot be empty or only whitespace.",
      }),

      author: Joi.string().min(4).max(50).required().messages({
        "string.min":
          "Author is required and cannot be empty or only whitespace.",
        "string.empty":
          "Author is required and cannot be empty or only whitespace.",
        "any.required":
          "Author is required and cannot be empty or only whitespace.",
      }),

      publishyear: Joi.number().min(1).max(2026).required(),

      role: Joi.string().valid("admin").valid("subscriber").required(),

      status: Joi.string().valid("available").valid("not available").optional(),
    }).options({ abortEarly: false });
    return bookSchema.validate(book);
  }

  // schema for patch
  const bookSchema2 = Joi.object({
    name: Joi.string().min(5).max(100).optional(),

    author: Joi.string().min(4).max(50).optional(),

    publishyear: Joi.number().min(1).max(2026).optional(),

    role: Joi.string().valid("admin").valid("subscriber").required(),

    status: Joi.string().valid("available").valid("not available").optional(),
  })
    .min(2)
    .options({ abortEarly: false });

  return bookSchema2.validate(book);
}

module.exports = validateInputData;
