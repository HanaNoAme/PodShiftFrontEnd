import { useState } from 'react';

enum Recurrence {
  YEARLY = "Yearly",
  MONTHLY = "Monthly",
  WEEKLY = "Weekly",
  DAILY = "Daily"
}

export function Form() {
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [form, setForm] = useState({
    url: '',
    episodes: 1,
    recurrence: Recurrence.DAILY,
    frequence: 1
  });

  function handleChange(e: React.ChangeEvent<any>) {
    console.log('Event : ', e.target);
    console.log('Form : ', form);
    setIsFormEmpty(false);
  };

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    // /^(https?:\/\/)(www.)([a-z0-9.-]+)?(\.[a-z]{2,})(\/[a-z0-9.-]*)*\/?(feed|rss|rss\.xml|index\.xml|index\.rss|feed\.rss|feed\.xml)?\/?$/gm
    setForm({ ...form, url: e.target.value });
  }

  function handleEpisodesChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, episodes: parseInt(e.target.value) });
  }

  function handleRecurrenceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm({ ...form, recurrence: parseInt(e.target.value) });
  }

  function handleFrequenceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, frequence: parseInt(e.target.value) });
  }

  function onSubmit() {
    //TODO : Send request to server

  }

  return (
    <form onChange={handleChange} onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      <input type="reset" value="Clear all fields" onClick={() => {
        alert('Are you sure you want to clear all fields?');
      }} disabled={isFormEmpty} />
      <br />
      <br />
      <label>URL : <input type="text" value={form.url} onChange={handleUrlChange}
        pattern="^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$" />
      </label>
      <br />
      <br />
      <label>Number of Episodes : <input type="number" min="1" value={form.episodes} defaultValue={1} onChange={handleEpisodesChange} />
      </label>
      <br />
      <br />
      <label>Recurrence : <select onChange={handleRecurrenceChange}>
          {Object.keys(Recurrence).map(key => (
            <option key={key} value={key}>
              {Recurrence[key as keyof typeof Recurrence]}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
      <label>Frequence : <input type="number" min="1" defaultValue={1} onChange={handleFrequenceChange} />
      </label>
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}
