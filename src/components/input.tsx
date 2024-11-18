import { useState } from "react";
import validator from "validator";
import { FormState } from "./form";

export enum Recurrence {
  Yearly = "year",
  Monthly = "month",
  Weekly = "week",
  Daily = "day",
}

interface Input {
  isValid: boolean,
  isTouched: boolean,
}

const INITIAL_INPUT_STATE: Input = {
  isValid: false,
  isTouched: false,
}

interface Props {
  name: string,
  display: string,
  type: "text" | "number",
  value: string | number,
  col: boolean,
  setInputValue: (field: keyof FormState, value: string | number) => void,
}

export function Input(props: Props) {
  const [input, setInput] = useState(INITIAL_INPUT_STATE)

  function handleUrlBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!input.isTouched) setInput({ ...input, isTouched: true });
    setValue(e.target.value);
  }
  
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    var value = 0;

    if (name == "recurrence") value = Object.keys(Recurrence).indexOf(e.target.value) + 1;
    // + 1 because index starts at 0
    else value = parseInt(e.target.value);

    setValue(value);
  }

  function validateInput(value: string | number): boolean {
    if (typeof value === "string") return validator.isURL(value);
    if (typeof value === "number") return value > 0;
    return false;
  }

  function setValue(value: string | number) {
    setInput({ ...input, isValid: validateInput(value) });
    if (input.isValid) props.setInputValue(props.name as keyof FormState, value);
  }

  return (
    <div>
      <label htmlFor={props.name} className="form-label">{props.display}</label>
      { 
        props.name != "recurrence" &&
        <input id={props.name} type={props.type} className="form-control" required
          {...(props.name == "url" ? { onBlur: handleUrlBlur } : { onChange: handleInputChange })} />
      }
      {
        props.name == "recurrence" && 
        <select id={props.name} className="form-control" onChange={handleInputChange} required>
          {Object.keys(Recurrence).reverse().map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      }
      {
        props.name == "url" && !input.isValid && input.isTouched &&
        <div className="text-danger">
          Invalid URL
        </div>
      }
    </div>
  );
}