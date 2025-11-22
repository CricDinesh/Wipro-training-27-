import EditStudent from "./EditStudent";
import { deleteStudent } from "../api/studentAPI";

export default function StudentList({ students, refresh }) {

  const handleDelete = async (id) => {
    await deleteStudent(id);   // wait for delete operation
    refresh();                 // reload students
  };

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Progress</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => (
          <tr key={s._id}>
            <td>{s.name}</td>
            <td>{s.progress}%</td>

            <td>
              <EditStudent student={s} refresh={refresh} />
            </td>

            <td>
              <button 
                onClick={() => handleDelete(s._id)}
                style={{ background: "red", color: "white" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
