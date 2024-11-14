import { useState } from "react";
import validator from "validator";
import { Result } from './result'

interface FormState {
  url: string;
  episodes: number;
  frequence: number;
  recurrence: number;
}

interface FormValidation {
  url: boolean;
  episodes: boolean;
  frequence: boolean;
  recurrence: boolean;
}

enum Recurrence {
  Yearly = "year",
  Monthly = "month",
  Weekly = "week",
  Daily = "day",
}

export function Form() {
  const INITIAL_FORM_STATE: FormState = {
    url: "",
    episodes: 1,
    frequence: 1,
    recurrence: 3
  };
  const INITIAL_VALIDATION_STATE: FormValidation = {
    url: false,
    episodes: true,
    frequence: true,
    recurrence: true
  };
  const [form, setForm] = useState(INITIAL_FORM_STATE)
  const [isInputValid, setIsInputValid] = useState(INITIAL_VALIDATION_STATE);
  const [hasSelectedUrlField, setHasSelectedUrlField] = useState(false);
  const isFormValid = Object.values(isInputValid).every(Boolean);

  function handleUrlBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!hasSelectedUrlField) setHasSelectedUrlField(true);
    var url = e.target.value;

    if (validateInput(url)) {
      setForm({ ...form, url: url });
      setIsInputValid({ ...isInputValid, url: true });
    } else
      setIsInputValid({ ...isInputValid, url: false });
  }

  function handleEpisodesChange(e: React.ChangeEvent<HTMLInputElement>) {
    var episodes = parseInt(e.target.value);

    if (validateInput(episodes)) {
      setForm({ ...form, episodes: episodes });
      setIsInputValid({ ...isInputValid, episodes: true });
    } else
      setIsInputValid({ ...isInputValid, episodes: false });
  }

  function handleFrequenceChange(e: React.ChangeEvent<HTMLInputElement>) {
    var frequence = parseInt(e.target.value);

    if (validateInput(frequence)) {
      setForm({ ...form, frequence: frequence });
      setIsInputValid({ ...isInputValid, frequence: true });
    } else
      setIsInputValid({ ...isInputValid, frequence: false });
  }

  function handleRecurrenceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    var recurrence = Object.keys(Recurrence).indexOf(e.target.value);

    if (validateInput(recurrence + 1)) { // because index starts at 0
      setForm({ ...form, recurrence: recurrence });
      setIsInputValid({ ...isInputValid, recurrence: true });
    } else
      setIsInputValid({ ...isInputValid, recurrence: false });
  }

  function validateInput(value: string | number): boolean {
    if (typeof value === "string") return validator.isURL(value);
    if (typeof value === "number") return value > 0;
    return false;
  }

  function handleClear() {
    if (!confirm("Are you sure you want to clear all fields?")) return;
    setForm(INITIAL_FORM_STATE);
    setIsInputValid(INITIAL_VALIDATION_STATE);
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
        <div>
          <label htmlFor="url" className="form-label">URL</label>
          <input id="url" type="text" className="form-control" onBlur={handleUrlBlur} required />
          {!isInputValid.url && hasSelectedUrlField &&
            <div className="text-danger">
              Invalid URL
            </div>
          }
        </div>
        <br />
        <div className="text-start row">
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
