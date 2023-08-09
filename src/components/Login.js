import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9090/bonds/user/login",
        {
          email,
          password,
        }
      );
      if (response.data === "invalid") {
        setError("Invalid email or password");
        alert("Invalid Credentials! Please try again");
      } else {
        const userRole = response.data.role;
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <section class="vh-100">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div class="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  class="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={email}
                  onChange={handleEmailChange} // Use separate change handler
                />
                <label class="form-label" for="form3Example3">
                  Email address
                </label>
              </div>
              <div class="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  class="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange} // Use separate change handler
                />
                <label class="form-label" for="form3Example4">
                  Password
                </label>
              </div>
              {/* ... rest of the form ... */}
              <button
                type="submit"
                class="btn btn-primary btn-lg"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}