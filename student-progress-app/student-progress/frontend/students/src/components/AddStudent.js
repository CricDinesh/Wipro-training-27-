import { useState } from "react";
import { addStudent } from "../api/studentAPI";

export default function AddStudent({ refresh }) {
  const [name, setName] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return;

    await addStudent({ name, progress: 0 });

    setName("");  // clear input
    refresh();    // reload table
  };

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={handleAdd}>Add Student</button>
    </>
  );
}
