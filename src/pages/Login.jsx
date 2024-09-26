import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Login } from "../services/Auth";
import { useForm } from "react-hook-form";

const LoginComponent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await Login(data);

    if (response.statusCode === 2110 && response.data.token) {
      localStorage.setItem("token", response.data.token);

      Swal.fire({
        title: "Login Successful",
        text: response.message || "Login berhasil.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/todo");
      });
    } else {
      Swal.fire({
        title: "Login Failed",
        text: response.message || "Login gagal. Silakan coba lagi.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h1 className="font-bold text-center mb-5 text-3xl">Login</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-[350px] w-[500px] bg-[#f8f8f8] p-10 border border-[#a7a7a7] rounded-lg"
      >
        <label htmlFor="username" className="text-[#a7a7a7] font-bold my-3">
          Username
        </label>
        <input
          type="username"
          {...register("username", {
            required: "username is required",
          })}
          className="border border-[#a7a7a7] rounded-md w-[400px] h-[30px] p-3"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        <label htmlFor="password" className="text-[#a7a7a7] font-bold my-3">
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="border border-[#a7a7a7] rounded-md w-[400px] h-[30px] p-3"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="flex justify-center items-center mt-8 bg-[#4678f3] text-white rounded-full w-[300px] h-[30px] self-center py-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
