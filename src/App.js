import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

//Using regular expression for form validation

//const nameRE=/^[a-zA-Z]{3,20}$/
const emailRE = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const phoneRE = /^[0-9]{10}/;

function App() {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    nameErr: "",
    organization: "",
    title: "",
    email: "",
    emailErr: "",
    phone: "",
    phoneErr: "",

    streetA: "",
    streetB: "",
    city: "",
    state: "",
    zip: "",
    country: "",

    countryList: [
      { value: "india", label: "India" },
      { value: "us", label: "US" },
      { value: "australia", label: "Australia" },
    ],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser((prevData) => {
        return {
          ...prevData,
          emailErr: "",
          phoneErr: "",
        };
      });
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [user.emailErr, user.phoneErr]);

  const handleChange = (e) => {
    const { name, value } = e.target; //using destructuring
    setUser((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userValidation(emailRE, user.email, "emailErr") &&
      userValidation(phoneRE, user.phone, "phoneErr")
    ) {
      alert("Form Submitted successfully");
    }

    axios
      .post("https://jsonplaceholder.typicode.com/posts", user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userValidation = (re, fieldName, err) => {
    if (!re.test(fieldName)) {
      setUser((prevData) => {
        return {
          ...prevData,
          [err]: `${fieldName} is not a valid input`,
        };
      });
      return false;
    } else {
      setUser((prevData) => {
        return {
          ...prevData,
          [err]: "",
        };
      });
      return true;
    }
  };

  return (
    <div>
      <h1>Company Information </h1>

      <form className="submission-form" onSubmit={handleSubmit}>
        <div className="address">
          <label>Full Name : </label>
          <div className="city-state">
            <span>
              <input
                type="text"
                name="fname"
                value={user.fname}
                placeholder="firstname"
                onChange={(e) => handleChange(e)}
                required
              />
            </span>
            <span>
              <input
                type="text"
                name="lname"
                value={user.lname}
                placeholder="lastname"
                onChange={(e) => handleChange(e)}
              />
            </span>
          </div>
        </div>

        <div className="address">
          <label>Organization : </label>
          <input
            type="text"
            name="organization"
            value={user.organization}
            placeholder="organization"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="address">
          <label>Title : </label>
          <input
            type="text"
            name="title"
            value={user.title}
            placeholder="title"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="address">
          <label>Email : </label>
          <input
            type="text"
            name="email"
            value={user.email}
            placeholder="email"
            required
            onChange={(e) => handleChange(e)}
            className={user.emailErr && "err"}
          />
          {user.emailErr && <h5>{user.emailErr}</h5>}
        </div>

        <div className="address">
          <label>Phone : </label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            placeholder="phone"
            required
            onChange={(e) => handleChange(e)}
            className={user.phoneErr && "err"}
          />
          {user.phoneErr && <h5>{user.phoneErr}</h5>}
        </div>

        <div className="address">
          <label for="address">Address : </label>
          <input
            type="text"
            name="streetA"
            value={user.streetA}
            placeholder="street address line 1"
            required
            onChange={(e) => handleChange(e)}
          />
          <div className="address">
            <label></label>
            <input
              type="text"
              name="streetB"
              value={user.streetB}
              placeholder="street address line 2"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="address">
            <label></label>
            <div className="city-state">
              <span>
                <input
                  type="text"
                  name="city"
                  value={user.city}
                  required
                  placeholder="city"
                  onChange={(e) => handleChange(e)}
                />
              </span>
              <span>
                <input
                  type="text"
                  name="state"
                  value={user.state}
                  placeholder="state/province"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </span>
            </div>
          </div>

          <div className="address">
            <label></label>
            <div className="city-state">
              <span>
                <input
                  type="text"
                  name="zip"
                  value={user.zip}
                  placeholder="ZipCode"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </span>
              <span>
                <select className="country" onChange={(e) => handleChange(e)}>
                  <option disabled="disabled" selected>
                    Select Country
                  </option>
                  {user.countryList.map((country) => (
                    <option
                      className="option"
                      key={country.value}
                      value={country.label}
                    >
                      {country.label}
                    </option>
                  ))}
                </select>
              </span>
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
