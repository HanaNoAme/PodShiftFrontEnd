import { useState, CSSProperties } from "react";
import { Input } from "./input";
import { Recurrence } from "../models/recurrence";
import { FormState } from "../models/formState";
import { Response } from "../models/response";
import { PodcastModel } from "../models/podcastModel";

const apiUrl = "http://www.podshift.net:8080/PodShift";
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

interface Props {
  handleClose: () => void
}

export function Form(props: Props) {
  const [form, setForm] = useState(initialForm)
  const isFormValid = Object.values(form).every((field) => field.isValid);

  const modalStyles: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)",
  };
  const formStyles: CSSProperties = {
    position: "fixed",
    transform: "translateX(-50%)",
    backgroundColor: "white",
    padding: "40px",
    top: "20%",
    left: "50%",
    width: "80%",
    height: "auto",
    borderRadius: "10px",
  };

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

    //TODO: Add loading state

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(
          Object.entries(form).map(([key, value]) => [key, value.value])
        ))
      });

      const data: Response = await response.json();

      if (response.ok) {
        const storedPodcastList = localStorage.getItem("podcastList");
        var podcastList = storedPodcastList ? JSON.parse(storedPodcastList) : [];

        const podcast: PodcastModel = {
          UUID: data.UUID,
          title: data.title,
          frequence: data.frequence,
          interval: data.interval,
          amount: data.amount,
          url: data.url
        };
        console.log(podcast);
        podcastList.push(podcast);
        localStorage.setItem("podcastList", JSON.stringify(podcastList));

        alert("Success!");

        //close modal

      }
      else throw new Error(data.detail);
    } catch (error: any) {
      alert("Error creating feed: " + error.message);
    }
  }

  return (
    <div style={modalStyles}>
      <form onSubmit={handleSubmit} noValidate style={formStyles}>
        <button type="button" className="btn btn-secondary position-absolute top-0 end-0 m-4" onClick={props.handleClose}>
          Cancel
        </button>
        <div className="text-start row">
          <Input
            name="url"
            display="URL"
            type="text"
            field={form.url}
            setInputValue={(value, isValid) => 
              setForm((prev) => ({ ...prev, url: { value, isValid } }))} />
        </div>
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
    </div>
  );
}
