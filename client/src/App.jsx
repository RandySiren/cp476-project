import React from 'react'
import axios from 'axios'

const App = () => {
  const handleSubmit = async () => {
    console.log('clicked')
    try {
      await axios.get('http://localhost:8080/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={handleSubmit}>Hello</button>
    </div>
  )
}

export default App
