import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSession } from "../session/sessionSlice";
import { fetchUsersAsync, selectUsers, selectUsersStatus } from "./usersSlice";

export default function Users() {
  const session = useAppSelector(selectSession);
  const users = useAppSelector(selectUsers);
  const isLoadingUsers = useAppSelector(selectUsersStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(fetchUsersAsync());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  if (session?.role !== "admin") return <Navigate to="/todos" />;

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
        loading={isLoadingUsers}
        color="#1f2937"
        style={{ marginTop: "1rem" }}
      />
    </div>
  );
}
