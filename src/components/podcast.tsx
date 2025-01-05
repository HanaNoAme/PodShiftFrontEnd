import { PodcastModel } from "../models/podcastModel";

export function Podcast(podcast: PodcastModel) {
  function handleEdit() {}

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="class-title">{podcast.url}</h2>
        <button className="float-end  btn btn-secondary" onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
}