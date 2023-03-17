import React, { useState } from "react";
import "../component/myForm.css";
import { useNavigate } from "react-router-dom";
const Myform = () => {
  const navigation = useNavigate();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = getAge(dob);
    const url = "https://userformserver.onrender.com";
    if (age >= 18 && isValidEmail(email)) {
      await navigation("/success", { state: { name: "raeon" }, replace: true });
      await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${name}&dob=${dob}&email=${email}&phone=${phone}`,
      })
        .then((response) => {
          const data = response.text();
          console.log(data);
        })
        .catch(function (err) {
          console.info(err + "url:" + url);
        });
    } else {
      alert("You must be at least 18 years old to submit this form.");
    }
  };

  const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const divStyles = {
    boxShadow: '0px 0px 0px 5px #808080',
    margin: '4em',
    padding: '1em',
  };
  return (
    <div>
      <center>
        <div className="container" style={divStyles}>
        <h1>Registration Form</h1>
          <form onSubmit={handleSubmit} className="my-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Enter your Name"
            />{" "}
            <br />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="form-input"
            />
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your Email"
            />
            <br />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              placeholder="Enter your Phone Number"
            />
            <br />
            <button type="submit" className="form-button">
              Submit
            </button>
          </form>
        </div>
      </center>
    </div>
  );
};

export default Myform;
