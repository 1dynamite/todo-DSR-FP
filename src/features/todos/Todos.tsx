import { useEffect, useState } from "react";
import { BeatLoader, ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Form from "../../components/Form";
import { SerializedFormData } from "../../types";
import Todo from "./Todo";
import {
  addTodoAsync,
  fetchTodosAsync,
  selectTodos,
  selectTodosStatus,
} from "./todosSlice";

export default function Todos() {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const isLoadingTodos = useAppSelector(selectTodosStatus);
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  useEffect(() => {
    const promise = dispatch(fetchTodosAsync());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const handleAddTodo = async (data: SerializedFormData) => {
    const todoData = data as { title: string; description: string };

    setIsAddingTodo(true);
    await dispatch(addTodoAsync(todoData));
    setIsAddingTodo(false);
  };

  return (
    <div className="todos-container">
      <Form className="add-todo-form" onSubmit={handleAddTodo}>
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
      </Form>

      <div>
        <div className="todos">
          {todos.map((t) => (
            <Todo key={t.id} todo={t} />
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
