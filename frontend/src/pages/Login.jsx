import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "../services/axiosInstance"; // Assuming axios instance is configured

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/auth/login", values); // Assuming an endpoint to handle login
      const { token } = response.data;
      login(token); // Store JWT and redirect based on role
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          {errorMessage && <div>{errorMessage}</div>}

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
