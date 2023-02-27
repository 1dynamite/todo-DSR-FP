import { ReactNode } from "react";
import { SerializedFormData } from "../types";

export default function Form(props: {
  className: string;
  onSubmit: (data: SerializedFormData) => void;
  children: ReactNode;
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget) return;

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    props.onSubmit(data);
  };

  return (
    <form className={props.className} onSubmit={handleSubmit}>
      {props.children}
    </form>
  );
}
