import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Success from "./component/success"
import MyForm from "./component/Myform"
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<MyForm />} />
      <Route exact path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
