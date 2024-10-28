import { useState } from 'react';

enum Recurrence {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly"
}

export function CustomForm() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [form, setForm] = useState({
    url: '',
    episodes: 1,
    recurrence: Recurrence.DAILY,
    frequence: 1
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
    setForm({ ...form, url: url });
  }

  function handleEpisodesChange(e: React.ChangeEvent<HTMLInputElement>) {
    var episodes = parseInt(e.target.value);
    console.log(`episodes: ${episodes}`);
    setForm({ ...form, episodes: episodes });
  }

  function handleRecurrenceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    var recurrence = e.target.value as Recurrence;
    console.log(`recurrence: ${recurrence}`);
    setForm({ ...form, recurrence: recurrence });
  }

  function handleFrequenceChange(e: React.ChangeEvent<HTMLInputElement>) {
    var frequence = parseInt(e.target.value);
    console.log(`frequence: ${frequence}`);
    setForm({ ...form, frequence: frequence });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(`url: ${form.url}`);
    console.log(`episodes: ${form.episodes}`);
    console.log(`recurrence: ${form.recurrence}`);
    console.log(`frequence: ${form.frequence}`);
    //TODO : Send request to server

  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <button type="reset" onClick={() => {
        if (confirm('Are you sure you want to clear all fields?')) {
          setForm({
            url: '',
            episodes: 1,
            recurrence: Recurrence.DAILY,
            frequence: 1
          });
        }
      }}>Clear all fields</button>
      <br />
      <br />
      <div>
        <label>URL</label>
        <input type="text" className="form-control" onBlur={handleUrlBlur} required />
      </div>
      <br />
      <div>
        <label>Number of Episodes</label>
        <input type="number" min="1" defaultValue={1} onChange={handleEpisodesChange} required />
      </div>
      <br />
      <div>
        <label>Recurrence</label>
        <select onChange={handleRecurrenceChange} required>
          {Object.keys(Recurrence).map(key => (
            <option key={key} value={key}>
              {Recurrence[key as keyof typeof Recurrence]}
            </option>
          ))} 
        </select>
      </div>
      <br />
      <div>
        <label>Frequence</label>
        <input type="number" min="1" defaultValue={1} onChange={handleFrequenceChange} required />
      </div>
      <br />
      <button type="submit" /*disabled={!isFormValid}*/ >Submit</button>
    </form>
  );
}