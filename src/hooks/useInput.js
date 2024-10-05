import { useEffect, useReducer, useCallback, useState } from "react";

const initialState = {
  value: "",
  blur: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "input":
      return { ...state, value: action.payload };

    case "blur":
      return { ...state, blur: true };

    case "reset":
      return { ...state, value: "", blur: false };

    case "defaultValue":
      return { ...state, value: action.payload };

    default:
      throw new Error("Unknown action type");
  }
};

export function useInput(validateInput, defaultValue) {
  const [{ value, blur }, dispatch] = useReducer(reducer, initialState);
  // const inputIsValid = validateInput(value);
  const [inputIsValid, setInputIsValid] = useState(false);
  // const inputHasError = !inputIsValid && blur;
  const [inputHasError, setInputHasError] = useState(false);

  useEffect(() => {
    const validation = validateInput(value);

    if (validation === true) {
      setInputIsValid(true);
    } else {
      setInputIsValid(false);
    }
  }, [value, validateInput]);

  useEffect(() => {
    if (!inputIsValid && blur) {
      setInputHasError(true);
    } else {
      setInputHasError(false);
    }
  }, [blur, inputIsValid]);

  const handleInputChange = useCallback((e) => {
    dispatch({
      type: "input",
      payload: e.target.value,
    });
  }, []);

  const handleInputBlur = () => {
    dispatch({
      type: "blur",
    });
  };

  const reset = () => {
    dispatch({
      type: "reset",
    });
  };

  useEffect(() => {
    if (defaultValue) {
      dispatch({
        type: "defaultValue",
        payload: defaultValue,
      });
    }
  }, [defaultValue]);

  return {
    value,
    inputIsValid,
    inputHasError,
    handleInputChange,
    handleInputBlur,
    reset,
  };
}
