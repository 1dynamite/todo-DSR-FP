export default function Error() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "3rem",
        gap: "1rem",
      }}
    >
      <span style={{ fontSize: "2rem" }}>:(</span>
      <div>Ooops, sorry. I don't know how to handle this error.</div>
    </div>
  );
}
