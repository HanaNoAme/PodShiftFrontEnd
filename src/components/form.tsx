import { useState } from "react";
import { Input } from "./input";

export interface Field {
  value: string | number
  isValid: boolean
}

interface Response {
  custom_url: string
  UUID: string
  title: string
  frequence: number
  interval: number
  amount: number
  url: string
  detail: string
}

interface FormState {
  url: Field
  episodes: Field
  frequence: Field
  recurrence: Field
}

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

export enum Recurrence {
  Yearly = "year",
  Monthly = "month",
  Weekly = "week",
  Daily = "day",
    }

export function Form() {
  const [form, setForm] = useState(initialForm)
  const isFormValid = Object.values(form).every((field) => field.isValid);

  function handleClear() {
    if (!confirm("Are you sure you want to clear all fields?")) return;
    setForm(initialForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isFormValid) {
      alert("Form is invalid. Please check your inputs.");
      return;
    }

    try {
      const response = await fetch('http://www.podshift.net:8080/PodShift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(
          Object.entries(form).map(([key, value]) => [key, value.value])
        ))
      });

      const data: Response = await response.json();
      if (response.ok) {
        alert('Success!');
      } else {
        throw new Error(data.detail);
      }
    } catch (error: any) {
      alert('Error creating feed: ' + error.message);
    }
  }

  return (
    <>
      <form className="text-start translate-middle-x start-50 position-relative w-75 my-5" onSubmit={handleSubmit} noValidate>
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
    </>
  );
}
