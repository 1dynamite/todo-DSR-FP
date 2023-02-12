import { Outlet } from "react-router-dom";
import { ProvideAuth } from "../auth";

export default function Root() {
  return (
    <div className="app">
      <ProvideAuth>
        <Outlet />
      </ProvideAuth>
    </div>
  );
}
