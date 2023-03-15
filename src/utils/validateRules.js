/* eslint-disable no-useless-escape */
export const isRequiredField = (value) => Boolean(value.trim());
export const isEmail = (value) =>
    /^[^\@\s]+@[^@\s\d]+\.[^@\s\d]+$/g.test(value);
export const isPassword = (value) =>
    /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(value);
