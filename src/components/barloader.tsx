import { BarLoader as BL } from "react-spinners";

export default function Barloader({ loading }: { loading: boolean }) {
  return (
    <BL
      color="#1f2937"
      height={1}
      // This library component does not properly support className attribute, so i had to inline styles
      style={{ position: "absolute", top: 0, width: "100%" }}
      loading={loading}
    />
  );
}
