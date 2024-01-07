import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

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
      {/* <input
        id="completed"
        type="checkbox"
        checked={isCompleted}
        // onChange={(e) => setIsCompleted(e.target.checked)}
      /> */}
    </div>
  );
}
