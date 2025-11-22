import { useState } from "react";
import { updateStudent } from "../api/studentAPI";

export default function EditStudent({ student, refresh }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(student.name);
  const [progress, setProgress] = useState(student.progress);

  const handleUpdate = async () => {
    await updateStudent(student._id, { name, progress: Number(progress) });
    setOpen(false);
    refresh();
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Edit</button>

      {open && (
        <div style={{ border: "1px solid black", padding: 10 }}>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />

          <input 
            type="number"
            value={progress} 
            onChange={(e) => setProgress(e.target.value)}
          />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </div>
      )}
    </>
  );
}
