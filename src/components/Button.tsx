import { ReactNode } from "react";
import { SerializedFormData } from "../types";

export default function Button(props: {
  className: string;
  form: string;
  onClick: (data: SerializedFormData) => void;
  children: ReactNode;
}) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.form === null) return;

    const formData = new FormData(e.currentTarget.form);

    const data = Object.fromEntries(formData.entries());

    props.onClick(data);
  };

  return (
    <button
      type="button"
      className={props.className}
      form={props.form}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}
