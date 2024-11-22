import { useState } from "react";
import { Input, Recurrence } from "./input";
import { Result } from './result';

export interface Field {
  value: string | number
  isValid: boolean
}

export interface FormState {
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

    console.log(form);

    try {
      const response = await fetch('http://www.podshift.net:8080/PodShift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('Schedule created successfully!');
      } else {
        throw new Error('Failed to create schedule');
      }
    } catch (error: any) {
      alert('Error creating schedule: ' + error.message);
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
            setForm((prev) => ({ ...prev, url: { value, isValid } }))
          }
        ></Input>
        <br />
        <div className="text-start row">
          <Input
            name="episodes"
            display="Number of Episodes"
            type="number"
            field={form.episodes}
            setInputValue={(value) =>
              setForm((prev) => ({ ...prev, episodes: value }))}
          ></Input>
          <div className="col">
            <label htmlFor="episodes" className="form-label">Number of Episodes</label>
            <input id="episodes" type="number" className="form-control" min="1" defaultValue={1} onChange={handleEpisodesChange} required />
          </div>
          <div className="col align-self-end">
            <label htmlFor="frequence" className="form-label">Frequence</label>
            <input id="frequence" type="number" className="form-control" min="1" defaultValue={1} onChange={handleFrequenceChange} required />
          </div>
          <div className="col align-self-end">
            <label htmlFor="recurrence" className="form-label">Recurrence</label>
            <select id="recurrence" className="form-control" onChange={handleRecurrenceChange} required>
              {Object.keys(Recurrence).reverse().map(key => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <p>{form.episodes} episode{form.episodes > 1 ? "s" : ""} every {form.frequence > 1 ? `${form.frequence} ` : ""}{Object.values(Recurrence)[form.recurrence]}{form.frequence > 1 ? "s" : ""}</p>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary" disabled={!isFormValid} >
            Submit
          </button>
          <button type="reset" className="btn btn-secondary" onClick={handleClear}>
            Reset all fields
          </button>
        </div>
      </form>
      <Result></Result>
    </>
  );
}
