import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTodos, addTodo } from "../services/Todo.js";

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      try {
        const response = await addTodo({ name: newTodo });
        setTodos([...todos, response]);
        setNewTodo("");
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchTodos();
    }
  }, [navigate]);

  return (
    <div className="flex justify-center bg-black h-screen">
      <form onSubmit={handleAddTodo}>
        <div className="flex justify-center items-center mt-10">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border border-[#a7a7a7] rounded-md w-[400px] h-[30px] p-3 mr-3"
            placeholder="Enter Todo"
          />
          <button
            type="submit"
            className="bg-[#4678f3] text-white rounded-md w-[100px] h-[30px]"
          >
            Add
          </button>

          <div className="ml-3">
            <button
              type="button"
              onClick={handleLogout}
              className="bg-[#FF0000] text-white rounded-md w-[100px] h-[30px]"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10 flex-wrap">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="m-4 border border-[#a7a7a7] rounded-md p-4"
              >
                <h3 className="mb-2 text-xl font-bold text-white">
                  {todo.name}
                </h3>
              </div>
            ))
          ) : (
            <p className="text-white">No todos available</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Todo;
