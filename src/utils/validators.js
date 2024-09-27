export const validateEmail = (value) =>
  value.includes("@") && value.includes(".com");

export const validatePassword = (value) =>
  value.trim().length <= 12 && value.trim().length >= 8;

export const validateUsername = (value) =>
  value.trim().length <= 12 && value.trim().length >= 5;

export const validateTitle = (value) => value.length >= 3 && value.length <= 20;

export const validateDescription = (value) =>
  value.length >= 10 && value.length <= 400;
