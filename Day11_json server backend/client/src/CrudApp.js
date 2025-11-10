import React, { useEffect, useState } from "react";

function CrudApp() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");

  const apiUrl = "http://localhost:300/courses";

  // READ - Fetch all courses
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // CREATE - Add new course (with numeric ID)
  const addCourse = () => {
    if (!title || !level || !duration) {
      alert("Please fill all fields");
      return;
    }

    // Find the highest existing ID and increment it
    const nextId =
      courses.length > 0
        ? Math.max(...courses.map((c) => parseInt(c.id))) + 1
        : 1;

    const newCourse = {
      id: nextId.toString(),
      title,
      level,
      duration: parseInt(duration),
    };

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    })
      .then((res) => res.json())
      .then((data) => setCourses([...courses, data]));

    setTitle("");
    setLevel("");
    setDuration("");
  };

  // UPDATE - Edit course title
  const updateCourse = (id) => {
    const newTitle = prompt("Enter new course title:");
    if (!newTitle) return;

    const courseToUpdate = courses.find((c) => c.id === id);
    const updatedCourse = { ...courseToUpdate, title: newTitle };

    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCourse),
    })
      .then((res) => res.json())
      .then(() => {
        setCourses(courses.map((c) => (c.id === id ? updatedCourse : c)));
      });
  };

  // DELETE - Remove course
  const deleteCourse = (id) => {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
      .then(() => setCourses(courses.filter((c) => c.id !== id)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React CRUD with JSON Server (Courses)</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <input
          type="number"
          placeholder="Duration (hours)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={addCourse} style={{ marginLeft: "10px" }}>
          Add Course
        </button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Level</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>{course.level}</td>
              <td>{course.duration}</td>
              <td>
                <button onClick={() => updateCourse(course.id)}>Edit</button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrudApp;
