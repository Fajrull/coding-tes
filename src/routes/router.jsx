import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Todo from "../pages/Todo";

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
};

export default router;
