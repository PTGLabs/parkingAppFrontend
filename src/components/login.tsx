import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginProps {
  // onSubmit: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginFunction = async (newObj: any) => {
    try {
      const response = await axios
        .post(`http://192.168.1.106:3006/api/auth/signin`, newObj)
        .then(async (res: any) => {
          console.log("user", res.data.message);

          localStorage.setItem("user", JSON.stringify(res.data.message));
          navigate("/view-parking", { replace: true });
        });
    } catch (err: any) {
      console.log(
        `Err in login function: `,
        err.response.data.errors[0].message
      );
      alert(err.response.data.errors[0].message);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("working");
    e.preventDefault();

    const obj = {
      email: email,
      password: password,
    };

    LoginFunction(obj);
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h1>Parking App</h1>
        <h2>Login</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
