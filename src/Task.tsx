interface Task {
  title: string;
  isUrgent: boolean;
  deadline: string;
}
export default function Task({ title, isUrgent, deadline }: Task) {
  return (
    <div style={{ backgroundColor: "white" }}>
      <h3>{title}</h3>
      <h4>{isUrgent ? "Urgent" : "Not urgent"}</h4>
      <p>{deadline}</p>{" "}
    </div>
  );
}
