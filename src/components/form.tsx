import { useState } from "react";
import { Input } from "./input";
import { FormState } from "../interfaces/formState";
import { Recurrence } from "../classes/recurrence";
import { Response } from "../interfaces/response";
import { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const apiUrl = "http://www.podshift.net:8080/PodShift";
const initialForm: FormState = {
  url: {
    value: "",
    isValid: false,
  },
  episodes: {
    value: 1,
    isValid: true,
  },
  frequence: {
    value: 1,
    isValid: true,
  },
  recurrence: {
    value: 3,
    isValid: true,
  },
};

export function Form({ }: { handleClose: () => void }) {
  const [form, setForm] = useState(initialForm)
  const isFormValid = Object.values(form).every((field) => field.isValid);
  const modalStyles: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)",
  };
  const formStyles: CSSProperties = {
    top: "auto",
    left: "50%",
    width: "80%",
    height: "auto",
  };

  function handleClear() {
    if (!confirm("Are you sure you want to clear all fields?")) return;
    setForm(initialForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(form);

    if (!isFormValid) {
      alert("Form is invalid. Please check your inputs.");
      return;
    }

    //TODO: Add loading state

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(
          Object.entries(form).map(([key, value]) => [key, value.value])
        ))
      });

      const data: Response = await response.json();
      if (response.ok) {
        alert("Success!");
      } else {
        throw new Error(data.detail);
      }
    } catch (error: any) {
      alert("Error creating feed: " + error.message);
    }
  }

  return (
    <div style={modalStyles}>
      <form className={"position-fixed text-start translate-middle-x start-50 position-relative w-75 my-5 p-5 bg-white"} onSubmit={handleSubmit} noValidate style={formStyles}>
        <button type="button" className="btn btn-secondary float-end mb-3">
          <FontAwesomeIcon icon={faX} />
        </button>
        <Input
          name="url"
          display="URL"
          type="text"
          field={form.url}
          setInputValue={(value, isValid) => 
            setForm((prev) => ({ ...prev, url: { value, isValid } }))} />
        <br />
        <div className="text-start row">
          <Input
            name="episodes"
            display="Number of Episodes"
            type="number"
            field={form.episodes}
            setInputValue={(value, isValid) =>
              setForm((prev) => ({ ...prev, episodes: { value, isValid } }))} />
          <Input
            name="frequence"
            display="Frequence"
            type="number"
            field={form.frequence}
            setInputValue={(value, isValid) =>
              setForm((prev) => ({ ...prev, frequence: { value, isValid } }))} />
          <Input
            name="recurrence"
            display="Recurrence"
            type="select"
            field={form.recurrence}
            setInputValue={(value, isValid) =>
              setForm((prev) => ({ ...prev, recurrence: { value, isValid } }))} />
        </div>
        <br />
        <p>{form.episodes.value} episode{Number(form.episodes.value) > 1 ? "s" : ""} every {Number(form.frequence.value) > 1 ? `${form.frequence.value} ` : ""}{Object.values(Recurrence)[Number(form.recurrence.value)]}{Number(form.frequence.value) > 1 ? "s" : ""}</p>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary" disabled={!isFormValid} >
            Submit
          </button>
          <button type="reset" className="btn btn-secondary" onClick={handleClear}>
            Reset all fields
          </button>
        </div>
      </form>
    </div>
  );
}
