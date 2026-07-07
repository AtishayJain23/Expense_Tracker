import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { register as registerApi } from "../api/auth.api";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerApi(data);

      alert("Registration successful");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        justify-center
        items-center
      "
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-96
          p-6
          border
          rounded
          shadow
        "
      >
        <h1
          className="
            text-2xl
            mb-4
          "
        >
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="
            border
            p-2
            w-full
            mb-2
          "
          {...register("name", {
            required: "Name required",
          })}
        />

        <p className="mb-2">{errors.name?.message}</p>

        <input
          type="email"
          placeholder="Email"
          className="
            border
            p-2
            w-full
            mb-2
          "
          {...register("email", {
            required: "Email required",
          })}
        />

        <p className="mb-2">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          className="
            border
            p-2
            w-full
            mb-2
          "
          {...register("password", {
            required: "Password required",
          })}
        />

        <p className="mb-4">{errors.password?.message}</p>

        <button
          type="submit"
          className="
            w-full
            p-2
            border
          "
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
