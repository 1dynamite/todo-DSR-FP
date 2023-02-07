import { BeatLoader } from "react-spinners";

export default function Fallback() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "5rem",
        alignItems: "center",
      }}
    >
      <BeatLoader color="#1f2937" />
      <span
        style={{
          marginTop: "1rem",
          fontSize: "1.5rem",
        }}
      >
        Authenticating. Almost done...
      </span>
    </div>
  );
}
