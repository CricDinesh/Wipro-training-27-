const apiUrl = "http://localhost:3000/courses";

// Load all courses
async function loadCourses() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  const list = document.getElementById("courseList");
  list.innerHTML = "";
  data.forEach(course => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${course.name}
      <span>
        <span class="edit" onclick="editCourse('${course._id}', '${course.name}')">✏️</span>
        <span class="delete" onclick="deleteCourse('${course._id}')">🗑️</span>
      </span>
    `;
    list.appendChild(li);
  });
}

// Add a new course
async function addCourse() {
  const name = document.getElementById("courseName").value;
  if (!name) return alert("Please enter a course name!");
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  document.getElementById("courseName").value = "";
  loadCourses();
}

// Edit course
async function editCourse(id, oldName) {
  const newName = prompt("Enter new course name:", oldName);
  if (!newName) return;
  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName }),
  });
  loadCourses();
}

// Delete course
async function deleteCourse(id) {
  if (!confirm("Are you sure you want to delete this course?")) return;
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  loadCourses();
}

// Load initial data
loadCourses();
