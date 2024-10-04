import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

enum Recurrence {
  YEARLY = "Yearly",
  MONTHLY = "Monthly",
  WEEKLY = "Weekly",
  DAILY = "Daily"
}

export function CustomForm() {
  const [form, setForm] = useState({
    url: '',
    episodes: 1,
    recurrence: Recurrence.DAILY,
    frequence: 1
  });

  function handleUrlBlur(e: React.ChangeEvent<HTMLInputElement>) {
    var url = e.target.value;
    console.log(`URL: ${url}`);
    if (url.match("^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$") != null) setForm({ ...form, url: url });
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
    <Form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      {}
      <input type="reset" value="Clear all fields" onClick={() => {
        alert('Are you sure you want to clear all fields?');
      }} />
      <br />
      <br />
      <Form.Group>
        <label>URL : <Form.Control type="text" onChange={handleUrlBlur} />
        </label>
        <br />
        <br />
        <Form.Label>Number of Episodes : <input type="number" min="1" defaultValue={1} onBlur={handleEpisodesBlur} />
        </Form.Label>
        <br />
        <br />
        <Form.Label>Recurrence : <select onBlur={handleRecurrenceBlur}>
            {Object.keys(Recurrence).map(key => (
              <option key={key} value={key}>
                {Recurrence[key as keyof typeof Recurrence]}
              </option>
            ))}
          </select>
        </Form.Label>
        <br />
        <br />
        <Form.Label>Frequence : <input type="number" min="1" defaultValue={1} onBlur={handleFrequenceBlur} />
        </Form.Label>
        <br />
        <br />
        <Button type="submit">
        </Button>
      </Form.Group>
    </Form>
  );
}