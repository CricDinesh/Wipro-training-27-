
// SkillTrack - Student Skills Management API

const express = require("express");
const app = express();

// Built-in middleware to parse JSON bodies
app.use(express.json());

// -------------------------------------------------------------
// In-memory database (temporary storage for students)
// In real projects this would be replaced by MongoDB / MySQL.
// -------------------------------------------------------------
let students = [
    {
        id: 1,
        name: "Arun Kumar",
        skills: ["JavaScript", "Node.js"],
        course: "Full Stack Development"
    }
];

// -------------------------------------------------------------
// Middleware: Logs every incoming request (Method + URL)
// Helps developers understand API usage.
// -------------------------------------------------------------
const loggerMiddleware = (req, res, next) => {
    console.log(`[LOG] ${req.method} ${req.url}`);
    next(); // move to next step
};

app.use(loggerMiddleware);

// -------------------------------------------------------------
// Middleware: Validate Student ID in params
// Used in GET / PUT / DELETE routes
// -------------------------------------------------------------
const validateStudentId = (req, res, next) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    // attach student to request for easier access in route
    req.student = student;
    next();
};

// -------------------------------------------------------------
// Middleware: Validate request body for creating a student
// Ensures required fields are present: name, skills, course
// -------------------------------------------------------------
const validateStudentBody = (req, res, next) => {
    const { name, skills, course } = req.body;

    if (!name || !skills || !Array.isArray(skills) || !course) {
        return res.status(400).json({
            message: "Invalid request. Required: name, skills(array), course"
        });
    }

    next();
};

// -------------------------------------------------------------
// US-01: GET /students
// Fetch all student records
// - Returns full list OR empty array
// -------------------------------------------------------------
app.get("/students", (req, res) => {
    res.json(students);
});

// -------------------------------------------------------------
// US-02: GET /students/:id
// Fetch a single student by ID
// Uses validateStudentId middleware
// -------------------------------------------------------------
app.get("/students/:id", validateStudentId, (req, res) => {
    res.json(req.student);
});

// -------------------------------------------------------------
// US-03: POST /students
// Create a new student
// - Auto-generates ID
// - Middleware validates body
// -------------------------------------------------------------
app.post("/students", validateStudentBody, (req, res) => {
    const { name, skills, course } = req.body;

    // auto-generate ID (simple incremental logic)
    const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name,
        skills,
        course
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// -------------------------------------------------------------
// US-04: PUT /students/:id
// Update student details
// - Only updates provided fields
// -------------------------------------------------------------
app.put("/students/:id", validateStudentId, (req, res) => {
    const { name, skills, course } = req.body;

    // update only fields provided
    if (name) req.student.name = name;
    if (skills) req.student.skills = skills;
    if (course) req.student.course = course;

    res.json(req.student);
});

// -------------------------------------------------------------
// US-05: DELETE /students/:id
// Delete a student by ID
// -------------------------------------------------------------
app.delete("/students/:id", validateStudentId, (req, res) => {
    const id = req.student.id;
    students = students.filter(s => s.id !== id);

    res.json({ message: "Student deleted successfully" });
});

// -------------------------------------------------------------
// Start the server on port 3000
// Link appears in console for easy access
// -------------------------------------------------------------
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
