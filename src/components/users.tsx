import { useOutletContext } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useUsers } from "../api";
import { HttpError, User } from "../types";

export default function Users() {
  const { users, isLoading } = useUsers((err: HttpError) => {
    if (err) toast.error(err.message);
  });
  const sessionUser = useOutletContext() as User | undefined;

  if (!sessionUser) return <></>;

  return (
    <div className="users">
      <h1>Users</h1>
      {users.map((u) => (
        <div key={u.name}>
          <img
            alt="profile-user"
            src="profile-user.png"
            width={16}
            height={16}
          />
          <span>{u.name}</span>
          <span>{u.role}</span>
        </div>
      ))}

      <BeatLoader
        loading={isLoading}
        color="#1f2937"
        style={{ marginTop: "1rem" }}
      />
    </div>
  );
}
