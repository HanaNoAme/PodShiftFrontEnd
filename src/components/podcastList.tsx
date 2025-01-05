import { useState } from "react"; 
import { Form } from "./form";

export function PodcastList() {
  const [isVisible, setIsVisible] = useState(false)

  function toggleForm() {
    setIsVisible(!isVisible);
  }

  return (
    <>
      <div>
        {!isVisible && <button type="button" onClick={toggleForm}>
          Open
        </button>}
        {isVisible && <Form handleClose={toggleForm} />}
      </div> 
    </>
  );
}