export const createUserValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be string!",
    },
    isLength: {
      option: {
        min: 5,
        max: 32,
      },
      errorMessage: "Username must contain min 5 and max 32 character",
    },
  },

  displayName: {
    notEmpty: true,
  },
};
