import { useId, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteTodo, editTodo } from "../api";
import { HttpError, User } from "../types";

interface TodoType {
  id: number;
  createdBy: string;
  title: string;
  description: string;
}

export default function Todo({
  todo,
  onDelete: handleDeleteProp,
  onEdit: handleSaveChangesProp,
}: {
  todo: TodoType;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, body: { title: string; description: string }) => void;
}) {
  const uniqueId = useId();
  const user = useOutletContext() as User;
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [savingChanges, setSavingChanges] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await deleteTodo(todo.id.toString());

      handleDeleteProp(todo.id);
    } catch (err) {
      if (err instanceof HttpError && err.status === 401)
        return navigate("/login");
      if (err instanceof Error) toast.error(err.message);
    }

    setDeleting(false);
  };

  const handleSaveChanges = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.currentTarget.form === null) return;

    const formData = new FormData(e.currentTarget.form);
    const body = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };

    if (body.title === todo.title && body.description === todo.description) {
      setEditing(false);
      return;
    }

    try {
      setSavingChanges(true);
      await editTodo(id.toString(), body);
      handleSaveChangesProp(id, body);
      setEditing(false);
    } catch (err) {
      if (err instanceof HttpError && err.status === 401)
        return navigate("/login");
      if (err instanceof Error) toast.error(err.message);
    }

    setSavingChanges(false);
  };

  // For some reason, todo.createdBy corresponds to user.role instead of user.name
  const authorized = user.role === "admin" || todo.createdBy === user.role;

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
            <button
              type="button"
              className="native-button"
              form={uniqueId}
              onClick={(e) => handleSaveChanges(todo.id, e)}
            >
              <img alt="save-icon" height={16} width={16} src="diskette.png" />
            </button>
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
