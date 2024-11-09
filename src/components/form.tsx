import { useState, useEffect } from 'react';

enum Recurrence {
  Yearly = "year",
  Monthly = "month",
  Weekly = "week",
  Daily = "day",
}

export function CustomForm() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [form, setForm] = useState({
    url: "",
    episodes: 1,
    frequence: 1,
    recurrence: 3,
  });

  // function validateForm) {
  //   if (!form.url) {
  //     setIsFormValid(false);
  //     console.log("Missing URL");
  //     return;
  //   }
  //   if (form.url.match("https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256} [a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)") != null) {
  //     setIsFormValid(true);
  //     console.log("Good URL");
  //   } else {
  //     console.log("Bad URL");
  //     setIsFormValid(false);
  //     return;
  //   }

  //   if (!form.episodes || !form.frequence)
  //     setIsFormValid(false);
  // }

  function handleUrlBlur(e: React.FocusEvent<HTMLInputElement>) {
    var url = e.target.value;
    console.log(`URL: ${url}`);
    if (url.match("^[a-zA-Z ]*$") != null) {
      setForm({ ...form, url: url })
    }
    else {
      //TODO: validation error
    }
  }

  function handleEpisodesChange(e: React.ChangeEvent<HTMLInputElement>) {
    var episodes = parseInt(e.target.value);
    console.log(`episodes: ${episodes}`);
    setForm({ ...form, episodes: episodes });
  }

  function handleFrequenceChange(e: React.ChangeEvent<HTMLInputElement>) {
    var frequence = parseInt(e.target.value);
    console.log(`frequence: ${frequence}`);
    setForm({ ...form, frequence: frequence });
  }

  function handleRecurrenceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    var index = Object.keys(Recurrence).indexOf(e.target.value);
    console.log(`recurrence: ${index}`);
    setForm({ ...form, recurrence: index });
  }

  function handleClear() { 
    if (confirm("Are you sure you want to clear all fields?")) {
      setForm({
        url: "",
        episodes: 1,
        frequence: 1,
        recurrence: 3,
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(`url: ${form.url}`);
    console.log(`episodes: ${form.episodes}`);
    console.log(`frequence: ${form.frequence}`);
    console.log(`recurrence: ${form.recurrence}`);
    //TODO : Send request to server

  }

  return (
    <form className="text-start translate-middle-x start-50 position-relative w-75 my-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="form-label">URL</label>
        <input type="text" className="form-control" onBlur={handleUrlBlur} required />
      </div>
      <br />
      <div className="text-start row">
        <div className="col">
          <label className="form-label">Number of Episodes</label>
          <input type="number" className="form-control" min="1" defaultValue={1}
            onChange={handleEpisodesChange} required />
        </div>
        <div className="col align-self-end">
          <label className="form-label">Frequence</label>
          <input type="number" className="form-control" min="1" defaultValue={1}
            onChange={handleFrequenceChange} required />
        </div>
        <div className="col align-self-end">
          <label className="form-label">Recurrence</label>
          <select className="form-control" onChange={handleRecurrenceChange} required>
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
        <button type="submit" className="btn btn-primary" /*disabled={!isFormValid}*/ >
          Submit
        </button>
        <button type="reset" className="btn btn-secondary" onClick={handleClear}>
          Reset all fields
        </button>
      </div>
    </form>
  );
}