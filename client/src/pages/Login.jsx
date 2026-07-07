import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { login } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
       //console.log("LOGIN RESPONSE:", response);

      setUser(response.data);
          //console.log("USER SET");

      navigate("/dashboard");
       
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
        w-96
        p-6
        border
        rounded
        shadow"
      >
        <h1
          className="
          text-2xl
          mb-4"
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="
          border
          p-2
          w-full
          mb-2"
          {...register("email", {
            required: "Email required",
          })}
        />

        <p>{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          className="
          border
          p-2
          w-full
          mb-2"
          {...register("password", {
            required: "Password required",
          })}
        />

        <p>{errors.password?.message}</p>

        <button
          type="submit"
          className="
          w-full
          p-2
          border"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
