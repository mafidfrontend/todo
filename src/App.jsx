import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setdata] = useState();
  const [input, setinput] = useState("");
  const [search, setsearch] = useState();
  const [hidden, sethidden] = useState(false);
  useEffect(() => {
    axios
      .get("https://json-placeholder.mock.beeceptor.com/todos")
      .then((response) => {
        response.data.map((items) => {
          return (items.completed = false);
        });
        setdata(response.data);
      });
  }, []);
  if (!data) {
    return <div>Yuklanmoqda ...</div>;
  }
  console.log(data);
  console.log(input);
  return (
    <>
      <div className="flex flex-col gap-5 max-w-5xl w-full mx-auto mt-2.5">
        <div className="flex gap-2">
          <input
            onChange={(e) => {
              setinput(e.target.value);
            }}
            type="text"
            value={input}
            placeholder="Enter Your Todo Here"
            className="ml-3.5 border border-amber-500 p-3 w-[70%]"
          />
          <input
            type="text"
            placeholder="Enter if anything you want"
            className="ml-3.5 border border-amber-500 p-3 w-[70%]"
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const newObj = {
                userId: input.length + 1,
                id: data.length + 1,
                title: input,
                completed: false,
              };
              setdata([newObj, ...data]);
              setinput("");
            }}
            className="px-10 py-4 border border-amber-300 hover:bg-blue-600 hover:text-white"
          >
            Submit
          </button>
          <button
            className="px-10 py-4 border border-amber-300 bg-gray-900 text-white hover:bg-blue-600 hover:text-white text-[12px]"
            onClick={() => {
              sethidden(hidden ? false : true);
            }}
          >
            {hidden ? "Return" : "Delete All"}
          </button>
        </div>
        {hidden
          ? ""
          : data.map((items, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <div className="flex gap-2.5">
                    <span>{items.id}</span>
                    <h2
                      style={{
                        textDecoration: items.completed ? "line-through" : "",
                        textTransform: items.completed
                          ? "uppercase"
                          : "capitalize",
                      }}
                    >
                      {items.title}
                    </h2>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        setdata(
                          data.map((todo) =>
                            todo.id === items.id
                              ? { ...todo, completed: !todo.completed }
                              : todo
                          )
                        );
                      }}
                      className="text-white px-3.5 py-2"
                      style={{
                        background: items.completed ? "Green" : "red",
                      }}
                    >
                      {items.completed ? "Completed" : "Not Completed"}
                    </button>
                    <button
                      className="text-white px-3.5 py-2 bg-gray-500"
                      onClick={() => {
                        setdata(data.filter((item) => item.id !== items.id));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
}

export default App;
