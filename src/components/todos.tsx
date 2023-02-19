import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BeatLoader, ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { addTodo, useTodos } from "../api";
import { HttpError, User } from "../types";
import Todo from "./todo";

export default function Todos() {
  const navigate = useNavigate();

  const { todos, isLoadingTodos, mutate } = useTodos((err: HttpError) => {
    if (err && err.status === 401) return navigate("/login");
    if (err) toast.error(err.message);
  });

  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const user = useOutletContext() as User | undefined;
  if (!user) return <></>;

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget) return;

    const formData = new FormData(e.currentTarget);
    const body = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };

    try {
      setIsAddingTodo(true);
      const todo = await addTodo(body);

      mutate([...todos, todo], { revalidate: false });
    } catch (err) {
      if (err instanceof HttpError && err.status === 401)
        return navigate("/login");
      if (err instanceof Error) toast.error(err.message);
    }

    setIsAddingTodo(false);
  };

  const handleDeleteTodo = async (id: number) => {
    mutate(
      todos.filter((t) => t.id !== id),
      { revalidate: false }
    );
  };

  const handleEditTodo = (
    id: number,
    data: { title: string; description: string }
  ) => {
    mutate(
      todos.map((t) => (t.id === id ? { ...t, ...data } : t)),
      { revalidate: false }
    );
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
                loading={isAddingTodo}
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
            loading={isLoadingTodos}
            color="#1f2937"
            style={{ margin: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
