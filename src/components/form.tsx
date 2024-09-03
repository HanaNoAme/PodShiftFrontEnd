import { useState } from 'react';

enum Recurrence {
  YEARLY = "Yearly",
  MONTHLY = "Monthly",
  WEEKLY = "Weekly",
  DAILY = "Daily"
}

export function Form() {
  const [form, setForm] = useState({
    url: '',
    episodes: 1,
    recurrence: Recurrence.DAILY,
    frequence: 1
  });

  function handleUrlBlur(e: React.ChangeEvent<HTMLInputElement>) {
    var url = e.target.value;
    console.log(`URL: ${url}`);
    if (url.match("^[a-zA-Z ]*$") != null) setForm({ ...form, url: url });
    else console.log("");
  }

  function handleEpisodesBlur(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, episodes: parseInt(e.target.value) });
  }

  function handleRecurrenceBlur(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm({ ...form, recurrence: parseInt(e.target.value) });
  }

  function handleFrequenceBlur(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, frequence: parseInt(e.target.value) });
  }

  function onSubmit() {
    //TODO : Send request to server

  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      {}
      <input type="reset" value="Clear all fields" onClick={() => {
        alert('Are you sure you want to clear all fields?');
      }} />
      <br />
      <br />
      <label>URL : <input type="text" onBlur={handleUrlBlur} />
      </label>
      <br />
      <br />
      <label>Number of Episodes : <input type="number" min="1" defaultValue={1} onBlur={handleEpisodesBlur} />
      </label>
      <br />
      <br />
      <label>Recurrence : <select onBlur={handleRecurrenceBlur}>
          {Object.keys(Recurrence).map(key => (
            <option key={key} value={key}>
              {Recurrence[key as keyof typeof Recurrence]}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
      <label>Frequence : <input type="number" min="1" defaultValue={1} onBlur={handleFrequenceBlur} />
      </label>
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}
