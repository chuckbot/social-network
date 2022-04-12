/**
 * Apply trim on all keys of a form.
 * @param { Object } form
 */
const trimAll = (form) => {
  Object.keys(form).forEach((key) => (form[key] = form[key].trim()));
};

module.exports = {
  trimAll,
};
