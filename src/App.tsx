import './App.css'
import { Form } from './components/form'

export default function App() {
  return (
    <>
      <h1>PodShift</h1>
      <p>Create a podcast feed that will redistribute the backlog of an existing podcast at a custom schedule</p>
      <Form></Form>
      <small>made by @<a href="https://github.com/HanaNoAme">HanaNoAme</a> </small>
    </>
  )
}