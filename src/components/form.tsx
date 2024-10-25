import { useState, useEffect } from 'react';

enum Recurrence {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly"
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

  function onSubmit() {
    console.log(`url: ${form.url}`);
    console.log(`episodes: ${form.episodes}`);
    console.log(`recurrence: ${form.recurrence}`);
    console.log(`frequence: ${form.frequence}`);
    //TODO : validate url

    //TODO : Send request to server

  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      <input type="reset" value="Clear all fields" onClick={() => {
        if (confirm('Are you sure you want to clear all fields?'))
          setForm({
            url: '',
            episodes: 1,
            recurrence: Recurrence.DAILY,
            frequence: 1
          });
      }} />
      <br />
      <br />
      <label>URL : <input type="text" onBlur={handleUrlBlur} />
      </label>
      <br />
      <br />
      <label>Number of Episodes : <input type="number" min="1" defaultValue={1}
        onChange={handleEpisodesChange} />
      </label>
      <br />
      <br />
      <label>Recurrence : <select onChange={handleRecurrenceChange}>
          {Object.keys(Recurrence).map(key => (
            <option key={key} value={key}>
              { Recurrence[key as keyof typeof Recurrence] }
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
      <label>Frequence : <input type="number" min="1" defaultValue={1}
        onChange={handleFrequenceChange} />
      </label>
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}
