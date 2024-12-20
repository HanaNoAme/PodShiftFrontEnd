import './App.css'
import { Form } from './components/form'

export default function App() {
  return (
    <>
      <h1>PodShift</h1>
      <p>Create a podcast feed that will redistribute the backlog of an existing podcast at a custom schedule</p>
      <Form></Form>
      <footer>
        <small>Website made by @<a href="https://github.com/HanaNoAme">HanaNoAme</a></small>
        <br />
        <small>API made by @<a href="https://github.com/PILIX123">PILIX</a></small>
      </footer>
    </>
  )
}