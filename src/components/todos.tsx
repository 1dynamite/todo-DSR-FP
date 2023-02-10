import { useEffect, useState } from "react";
import { BeatLoader, ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { addTodo, deleteTodo, getTodos } from "../api";
import Todo from "./todo";

interface TodoType {
  id: number;
  title: string;
  description: string;
  createdBy: string;
}

export default function Todos() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [addTodoLoading, setAddTodoLoading] = useState(false);
  const [getTodosLoading, setGetTodosLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        setGetTodosLoading(true);
        const todos = await getTodos(signal);
        setTodos(todos);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (err instanceof Error) toast.error(err.message);
      }
      setGetTodosLoading(false);
    })();

    return () => controller.abort();
  }, []);

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget) return;

    const formData = new FormData(e.currentTarget);
    const body = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };

    try {
      setAddTodoLoading(true);
      const todo = await addTodo(body);
      setTodos([...todos, todo]);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }

    setAddTodoLoading(false);
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id.toString());
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  };

  const handleEditTodo = (
    id: number,
    body: { title: string; description: string }
  ) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, ...body } : t)));
  };

  return (
    <div className="todos-container">
      <form className="add-todo-form" onSubmit={handleAddTodo}>
        <ul>
          <li>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </li>
          <li>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" required />
          </li>
          <li>
            <button type="submit">
              Add
              <ClipLoader
                size={15}
                color="#1f2937"
                className="clip-loader-add-todo"
                loading={addTodoLoading}
              />
            </button>
          </li>
        </ul>
      </form>

      <div>
        <div className="todos">
          {todos.map((t) => (
            <Todo
              key={t.id}
              todo={t}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          ))}

          <BeatLoader
            loading={getTodosLoading}
            color="#1f2937"
            style={{ margin: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
