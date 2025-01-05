interface Props {
  title: string
}

export function Podcast(props: Props) {
  
  return (
    <>
      <h2>{props.title}</h2>
    </>
  );
}