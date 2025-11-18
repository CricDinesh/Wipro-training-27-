// controllers/studentsController.js

let students = [
  { id: 1, name: "Dinesh", skill: "React" },
  { id: 2, name: "Kumar", skill: "Node.js" },
];

// GET all students
exports.getStudents = (req, res) => {
  res.json(students);
};

// GET student by ID
exports.getStudentById = (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
};

// CREATE student
exports.createStudent = (req, res) => {
  const newStudent = {
    id: students.length + 1,
    ...req.body,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
};

// UPDATE student
exports.updateStudent = (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  Object.assign(student, req.body);
  res.json(student);
};

// DELETE student
exports.deleteStudent = (req, res) => {
  students = students.filter(s => s.id != req.params.id);

  res.json({ message: "Student deleted" });
};
