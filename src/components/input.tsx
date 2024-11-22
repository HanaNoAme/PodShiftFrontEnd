import validator from "validator";
import { useState } from "react";
import { Field, FormState } from "./form";

export enum Recurrence {
  Yearly = "year",
  Monthly = "month",
  Weekly = "week",
  Daily = "day",
}

interface Props {
  name: string
  display: string
  type: "text" | "number"
  field: Field
  setInputValue: (field: keyof FormState, value: string | number, isValid: boolean) => void
}

var [isUrlTouched, setIsUrlTouched] = useState(false)

function validateInput(value: string | number): boolean {
  if (typeof value === "string") return validator.isURL(value);
  if (typeof value === "number") return value > 0;
  return false;
}

export function Input(props: Props) {
  function handleUrlBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!isUrlTouched) setIsUrlTouched(true);
    setValue(e.target.value);
  }

  function handleRecurrenceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    // + 1 because enum index starts at 0
    var value = Object.keys(Recurrence).indexOf(e.target.value) + 1;
    setValue(value);
  }
  
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    var value = parseInt(e.target.value);
    setValue(value);
  }

  function setValue(value: string | number) {
    const isValid = validateInput(value);
    props.setInputValue(props.name as keyof FormState, isValid ? value : props.field.value, isValid);
  }

  return (
    <div className={props.name == "url" ? "" : "col align-self-end"}>
      <label htmlFor={props.name} className="form-label">{props.display}</label>
      {
        props.name != "recurrence" &&
        <input id={props.name} type={props.type} className="form-control" required
          {...(props.name == "url" ? { onBlur: handleUrlBlur } : { onChange: handleInputChange })} />
      }
      {
        props.name == "recurrence" &&
        <select id={props.name} className="form-control" onChange={handleRecurrenceChange} required>
          {Object.keys(Recurrence).reverse().map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      }
      {
        props.name == "url" && !props.field.isValid && isUrlTouched &&
        <div className="text-danger">
          Invalid URL
        </div>
      }
    </div>
  );
}