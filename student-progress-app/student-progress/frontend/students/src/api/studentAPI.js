const BASE_URL = "http://localhost:5000/api/students";

export const getStudents = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

export const addStudent = async (student) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  });
  return await res.json();
};

export const updateStudent = async (id, student) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  });

  return await res.json();
};

export const deleteStudent = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
