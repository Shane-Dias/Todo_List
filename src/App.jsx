import React from "react";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log(todos);
  }, [todos])
  
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
    setTodos(
      todos.filter( (item) => {
        if (item.id!==id) {
          return item
        }
      })
    )
    let t=todos.filter( (item) => {
      if (item.id===id) {
        return item
      }
    })
    setTodo(t[0].todo)
    
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-3 bg-blue-300 p-3 min-h-[80vh] rounded-xl">
        <div className="addtodo m-5 ">
          <h2 className="font-semibold text-2xl">Add a todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-slate-300 w-1/2"
          />
          <button
            onClick={handleAdd}
            disabled={todo.trim()==""?true:false}
            className={`bg-blue-700 rounded px-2 ml-2 text-white hover:bg-blue-900 ${todo.trim()==""?'opacity-50 cursor-not-allowed':''}`}
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
              className="todos flex mt-3 w-3/4 flex-nowrap items-center"
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
                  className="bg-blue-700 rounded px-2 ml-2 text-white hover:bg-blue-900"
                >
                  Edit
                </button>
                <button
                  onClick={()=>handleDelete(item.id)}
                  className="bg-blue-700 rounded px-2 ml-2 mt-2 text-white hover:bg-blue-900"
                >
                  Delete
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
