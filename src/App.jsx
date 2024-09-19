import React from "react";
import Navbar from "./components/Navbar";
import { useState,useEffect } from "react";

const App = () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const handleAdd=()=>{
    setTodos([...todos,{todo, isCompleted:false}])
    setTodo("")
    console.log(todos)
  }
  const handleEdit=()=>{

  }
  const handleDelete=()=>{

  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-3 bg-blue-300 p-3 min-h-[80vh] rounded-xl">
        <div className="addtodo m-5">
          <h2 className="font-semibold">Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="bg-slate-300 w-1/2" />
          <button onClick={handleAdd} className="bg-blue-700 rounded px-2 ml-2 text-white hover:bg-blue-900">
            Add
          </button>
        </div>
        <h2 className="font-semibold">Your Todos</h2>
        { todos.map((item) => {
           
        return <div key={todo} className="todos flex mt-3 w-1/4 flex-nowrap items-center">
          <div className="text bg-indigo-500 rounded-lg px-8 py-4 ">
            {item.todo}
          </div>
          <div className="buttons">
            <button onClick={handleEdit} className="bg-blue-700 rounded px-2 ml-2 text-white hover:bg-blue-900">
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-blue-700 rounded px-2 ml-2 mt-2 text-white hover:bg-blue-900"
            >
              Delete
            </button>
          </div>
        </div>
        })}
      </div>
    </div>
  );
};

export default App;

