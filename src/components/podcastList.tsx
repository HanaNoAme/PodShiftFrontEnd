import { useState } from "react"; 
import { Form } from "./form";
import { PodcastModel } from "../models/podcastModel";
import { Podcast } from "./podcast";

export function PodcastList() {
  const [isVisible, setIsVisible] = useState(false)
  const storedPodcastList = localStorage.getItem("podcastList");
  var podcastList = storedPodcastList ? JSON.parse(storedPodcastList) : [];

  function toggleForm() {
    setIsVisible(!isVisible);
  }

  return (
    <>
      {!isVisible && <button className="btn btn-primary" onClick={toggleForm}>
        Add new Podcast
      </button>}
      {isVisible && <Form handleClose={toggleForm} />}
      <div>
        {podcastList.map((podcast: PodcastModel) => (
          <Podcast {...podcast} />
        ))}
      </div>
    </>
  );
}