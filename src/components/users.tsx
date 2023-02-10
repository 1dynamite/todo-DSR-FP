import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getUsers } from "../api";

interface UserType {
  name: string;
  role: string;
}

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        setUsersLoading(true);
        const users = await getUsers(signal);
        setUsers(users);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (err instanceof Error) toast.error(err.message);
      }
      setUsersLoading(false);
    })();

    return () => controller.abort();
  }, []);

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
        loading={usersLoading}
        color="#1f2937"
        style={{ marginTop: "1rem" }}
      />
    </div>
  );
}
