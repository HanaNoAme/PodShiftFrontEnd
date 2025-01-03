import validator from "validator";
import { useState } from "react";
import { Field } from "../interfaces/field";
import { Recurrence } from "../classes/recurrence";

interface Props {
  name: string
  display: string
  type: "text" | "number" | "select"
  field: Field
  setInputValue: (value: string | number, isValid: boolean) => void
}

export function Input(props: Props) {
  var [isUrlTouched, setIsUrlTouched] = useState(false)

  function handleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (props.name == "url" && !isUrlTouched) setIsUrlTouched(true);
    setValue(e.target.value);
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    var value = Object.keys(Recurrence).indexOf(e.target.value);
    setValue(value);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    var value = parseInt(e.target.value);
    setValue(value);
  }

  function setValue(value: string | number) {
    const isValid = validateInput(value);
    props.setInputValue(isValid ? value : props.field.value, isValid);
  }

  function validateInput(value: string | number): boolean {
    if (typeof value === "string" && props.name == "url") return validator.isURL(value);
    if (typeof value === "number") {
      if (props.name == "recurrence") value += 1; // Recurrence index starts at 0
      return value > 0;
    }
    return false;
  }

  const renderInput = () => {
    if (props.type == "select") {
      return (
        <select id={props.name} className="form-control" onChange={handleSelectChange} required>
          {Object.keys(Recurrence).reverse().map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input id={props.name} type={props.type} className="form-control"
        {...(props.type == "text" ? { onBlur: handleInputBlur } : { onChange: handleInputChange })} min="1" defaultValue={props.type == "text" ? "" : 1} required />
    );
  };

  return (
    <div className={props.type == "text" ? "" : "col align-self-end"}>
      <label htmlFor={props.name} className="form-label">{props.display}</label>
      {renderInput()}
      {!props.field.isValid && isUrlTouched &&
        <div className="text-danger">Invalid URL</div>
      }
    </div>
  );
}