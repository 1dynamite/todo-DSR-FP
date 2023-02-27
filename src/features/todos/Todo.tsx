import { useId, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Button from "../../components/Button";
import { SerializedFormData, Todo as TodoType } from "../../types";
import { selectSession } from "../session/sessionSlice";
import { deleteTodoAsync, editTodoAsync } from "./todosSlice";

export default function Todo({ todo }: { todo: TodoType }) {
  const session = useAppSelector(selectSession);
  const uniqueId = useId();
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [savingChanges, setSavingChanges] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    setDeleting(true);
    await dispatch(deleteTodoAsync(todo.id));
    setDeleting(false);
  };

  const handleSaveChanges = async (data: SerializedFormData) => {
    const todoData = data as { title: string; description: string };

    if (
      todoData.title === todo.title &&
      todoData.description === todo.description
    ) {
      setEditing(false);
      return;
    }

    setSavingChanges(true);
    await dispatch(editTodoAsync({ id: todo.id, data: todoData }));
    setEditing(false);
    setSavingChanges(false);
  };

  const authorized =
    session?.role === "admin" || todo.createdBy === session?.role;

  return (
    <div style={{ opacity: deleting || savingChanges ? "0.6" : "1" }}>
      <div>{todo.createdBy}</div>
      <form id={uniqueId}>
        <input
          type="text"
          name="title"
          defaultValue={todo.title}
          className="edit-todo-input"
          readOnly={!editing}
        />
        <input
          type="text"
          name="description"
          defaultValue={todo.description}
          className="edit-todo-input"
          readOnly={!editing}
        />
      </form>
      {authorized && (
        <div>
          {editing ? (
            <Button
              className="native-button"
              form={uniqueId}
              onClick={handleSaveChanges}
            >
              <img alt="save-icon" height={16} width={16} src="diskette.png" />
            </Button>
          ) : (
            <img
              alt="edit-icon"
              height={16}
              width={16}
              src="pencil.png"
              onClick={() => setEditing(true)}
            />
          )}
          <img
            alt="delete-icon"
            height={16}
            width={16}
            src="x.png"
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
}
