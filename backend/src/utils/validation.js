import validator from "validator";

const validateProfileEditData = async (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "email",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );

  if (!isEditAllowed) {
    return {
      success: false,
      errors: "Invalid Fields",
    };
  }

  const { firstName, lastName, email, photoUrl, gender, age, about, skills } =
    req.body;

  if (email && !validator.isEmail(email)) {
    return {
      success: false,
      errors: "Invalid email format",
    };
  }

  if (age && !validator.isNumeric(age)) {
    return {
      success: false,
      errors: "Age must be a number",
    };
  }

  if (gender && !["male", "female", "others"].includes(gender)) {
    return {
      success: false,
      errors: "Gender must be one of male, female, or others",
    };
  }

  if (photoUrl && !validator.isURL(photoUrl)) {
    return {
      errors: "Invalid photo URL format",
      success: false,
    };
  }

  if (
    skills &&
    (!Array.isArray(skills) ||
      skills.some((skill) => typeof skill !== "string"))
  ) {
    return {
      errors: "Skills must be an array of strings",
      success: false,
    };
  }

  return {success:true , message:'Validation passed.'}
};

export { validateProfileEditData };
