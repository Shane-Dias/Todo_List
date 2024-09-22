import React from "react";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   console.log(todos);
  // }, [todos])

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos"); 
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

 
  useEffect(() => {
    if (todos.length > 0) { 
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };
  const handleCheckbox = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted } 
          : item
      )
    );
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete it?")) {
      setTodos(
        todos.filter( (item) => {
          if (item.id!==id) {
            return item
          }
        })
      )
    }
  };
  const handleEdit = (id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      setTodos(todos.filter((item) => item.id !== id)); 
    }
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-3 bg-blue-300 p-3 min-h-[80vh] md:w-[45%] rounded-xl">
        <div className="addtodo m-5 ">
          <h2 className="font-semibold text-2xl">Add a todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-slate-300 w-3/4 py-2 rounded-md px-2  border-none outline-none focus:outline-green-700 focus:shadow-xl"
          />
          <button
            onClick={handleAdd}
            disabled={todo.trim()==""?true:false}
            className={`bg-blue-700 rounded py-2 px-4 ml-2 text-white hover:bg-blue-900 ${todo.trim()==""?'opacity-50 cursor-not-allowed':''}`}
          >
            Add
          </button>
        </div>
        <h2 className="font-semibold text-4xl">Your Todos</h2>
        {todos.length===0 && <div className="m-4 text-purple-800">No todos currently</div>}
        
        {todos.map((item) => {
          return (
            <div
              key={item.id}
              className="todos flex mt-3 w-full flex-nowrap items-center"
            >
              <input
                className="mr-2"
                type="checkbox"
                checked={item.isCompleted}
                onChange={()=>handleCheckbox(item.id)}
              />
              <div className="text bg-indigo-500 rounded-lg px-8 py-4">
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons">
                <button
                  onClick={()=>handleEdit(item.id)}
                  disabled={todo==""?false:true}
                  className={`bg-blue-700 rounded p-2 ml-2 text-white hover:bg-blue-900 ${todo==""?"": "cursor-not-allowed"}`}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={()=>handleDelete(item.id)}
                  className=" bg-blue-700 rounded p-2 ml-2 mt-2 text-white hover:bg-blue-900"
                >
                  <MdDelete/>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
