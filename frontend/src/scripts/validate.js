/**
 * Check if email is a valid email.
 * @param { String } email
 * @returns { Boolean }
 */
const validateEmail = (email) => {
  const emailRE =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return email.match(emailRE) ? false : true;
};

/**
 * Check if password contains at least 1 number, 1 uppercase letter, 1 lowercase
 * 1 non alpha-numeric, is between 8 and 16 characters and without space.
 * @param { String } password
 * @returns { Boolean }
 */
const validatePassword = (password) => {
  const passwordRE =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
  return password.match(passwordRE) ? false : true;
};

/**
 * Check if two Strings are equal.
 * @param { String, String }
 * @returns { Boolean }
 */
const validatePasswordConf = (password1, password2) => {
  return password1 === password2 ? false : true;
};

/**
 * Check if a String is a valid name.
 * @param { String } name
 * @returns { Boolean }
 */
const validateName = (name) => {
  const nameRE = /^([a-zA-Z]+(\s|-|')?([a-zA-Z])*(\s)?([a-zA-Z])*)$/g;
  return name.match(nameRE) ? false : true;
};

/**
 * Check if a String's length is less than 50 caracters.
 * @param { String } description
 * @returns { Boolean }
 */
const validateDescription = (description) => {
  return description.length <= 50 ? true : false;
};

/**
 * Check if a file is smaller than 5Mo and if its type is png, jpeg or jpg.
 * @param { File } file
 * @returns { Boolean }
 */
const validateImage = (file) => {
  const authTypes = ["image/png", "image/jpg", "image/jpeg"];
  const maxSize = 5242880;

  return authTypes.find((type) => file.type === type) && file.size <= maxSize
    ? false
    : true;
};

/**
 * Check if all value of an Object are true, and if all value of another filled.
 * @param { Object } formValidators
 * @param { Object } form
 * @returns { Boolean }
 */
const validateForm = (formValidators, form) => {
  if (
    Object.values(formValidators).every((value) => value === false) &&
    Object.values(form).every((value) => value !== "")
  ) {
    return false;
  } else {
    return true;
  }
};

/**
 * Check if profile form is valid.
 * @param { Object } formValidators
 * @param { Object } form
 * @returns { Boolean }
 */
const validateProfileForm = (formValidators, form) => {
  if (
    Object.values(formValidators).every((value) => value === false) &&
    form.firstName !== "" &&
    form.lastName !== ""
  ) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  validateDescription,
  validateEmail,
  validateImage,
  validateName,
  validatePassword,
  validatePasswordConf,
  validateForm,
  validateProfileForm,
};
