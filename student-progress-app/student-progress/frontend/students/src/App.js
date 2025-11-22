import { useEffect, useState } from "react";
import { getStudents, addStudent } from "./api/studentAPI";
import StudentList from "./components/StudentList";

export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [progress, setProgress] = useState("");

  const loadData = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async () => {
    await addStudent({ name, progress: Number(progress) });
    setName("");
    setProgress("");
    loadData();
  };

  return (
    <div>
      <h2>Add Student</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Progress"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>

      <hr />

      <StudentList students={students} refresh={loadData} />
    </div>
  );
}
