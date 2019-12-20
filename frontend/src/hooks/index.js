import { useState } from "react";

export const useField = type => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  };

  const clear = () => {
    setValue("");
  };

  const inputField = {
    type: type,
    value: value,
    onChange: onChange
  };

  return {
    type,
    value,
    onChange,
    inputField,
    clear
  };
};
