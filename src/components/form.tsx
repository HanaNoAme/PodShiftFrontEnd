import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

enum Recurrence {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly"
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
    <Form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      {}
      <input type="reset" value="Clear all fields" onClick={() => {
        if (confirm('Are you sure you want to clear all fields?')) {
          setForm({
            url: '',
            episodes: 1,
            recurrence: Recurrence.DAILY,
            frequence: 1
          });
        }
      }} />
      <br />
      <br />
      <Form.Group>
        <label>URL : <Form.Control type="text" onChange={handleUrlBlur} />
        </label>
        <br />
        <br />
        <Form.Label>Number of Episodes : <input type="number" min="1" defaultValue={1} onChange={handleEpisodesChange} />
        </Form.Label>
        <br />
        <br />
        <Form.Label>Recurrence : <select onChange={handleRecurrenceChange}>
            {Object.keys(Recurrence).map(key => (
              <option key={key} value={key}>
                {Recurrence[key as keyof typeof Recurrence]}
              </option>
            ))}
          </select>
        </Form.Label>
        <br />
        <br />
        <Form.Label>Frequence : <input type="number" min="1" defaultValue={1} onChange={handleFrequenceChange} />
        </Form.Label>
        <br />
        <br />
        <Button type="submit" value="Submit">
        </Button>
      </Form.Group>
    </Form>
  );
}
