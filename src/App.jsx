import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [editTodo, setEditTodo] = useState();

  useEffect(() => {
    axios.get("https://json-placeholder.mock.beeceptor.com/todos").then((response) => {
      setData(response.data.map((item) => ({ ...item, completed: false })));
    });
  }, []);

  const submitTodo = () => {
    if (editTodo) {
      setData(
        data.map((todo) => (todo.id === editTodo.id ? { ...todo, title: todoTitle } : todo))
      );
      setEditTodo();
    } else {
      const newTodo = { id: data.length + 1, title: todoTitle, completed: false };
      setData([...data, newTodo]);
    }
    setTodoTitle("");
    setModalOpen(false);
  };

  const todoEditt = (todo) => {
    setEditTodo(todo);
    setTodoTitle(todo.title);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-5 max-w-5xl w-full mx-auto mt-2.5">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search Todos..."
            className="ml-3.5 border border-amber-500 p-3 w-[70%]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="px-10 py-4 border border-amber-300 hover:bg-blue-600 hover:text-white"
          >
            Add Todo
          </button>
        </div>
        {data
          .filter((todo) => todo.title.toLowerCase().includes(search))
          .map((item) => (
            <div key={item.id} className="flex justify-between">
              <div className="flex gap-2.5">
                <span>{item.id}</span>
                <h2
                  style={{
                    textDecoration: item.completed ? "line-through" : "",
                    textTransform: item.completed ? "uppercase" : "capitalize",
                  }}
                >
                  {item.title}
                </h2>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setData(data.map((todo) => todo.id === item.id ? { ...todo, completed: !todo.completed } : todo))}
                  className="text-white px-3.5 py-2"
                  style={{ background: item.completed ? "green" : "red" }}
                >
                  {item.completed ? "Completed" : "Not Completed"}
                </button>
                <button
                  className="text-white px-3.5 py-2 bg-gray-500"
                  onClick={() => todoEditt(item)}
                >
                  Edit
                </button>
                <button
                  className="text-white px-3.5 py-2 bg-gray-700"
                  onClick={() => setData(data.filter((todo) => todo.id !== item.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-3">{editTodo ? "Edit Todo" : "Add New Todo"}</h2>
            <input
              type="text"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              className="border p-2 w-full mb-3"
              placeholder="Enter todo title"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="px-5 py-2 bg-gray-400 text-white">Cancel</button>
              <button onClick={submitTodo} className="px-5 py-2 bg-blue-600 text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;