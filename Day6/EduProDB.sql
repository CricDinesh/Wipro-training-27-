
CREATE DATABASE EduProDB;
USE EduProDB;

CREATE TABLE Department (
    DeptID INT AUTO_INCREMENT PRIMARY KEY,
    DeptName VARCHAR(100) NOT NULL
);

CREATE TABLE Student (
    StudentID VARCHAR(10) PRIMARY KEY,
    StudentName VARCHAR(100) NOT NULL
);

CREATE TABLE Course (
    CourseID INT AUTO_INCREMENT PRIMARY KEY,
    CourseName VARCHAR(100) NOT NULL,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Instructor (
    InstructorID INT AUTO_INCREMENT PRIMARY KEY,
    InstructorName VARCHAR(100) NOT NULL,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Enrollment (
    EnrollmentID INT AUTO_INCREMENT PRIMARY KEY,
    StudentID VARCHAR(10),
    CourseID INT,
    InstructorID INT,
    Grade CHAR(2),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID),
    FOREIGN KEY (InstructorID) REFERENCES Instructor(InstructorID)
);

INSERT INTO Department (DeptName) VALUES 
('Computer Science'),
('Information Technology');

INSERT INTO Student (StudentID, StudentName) VALUES
('S101', 'Asha Gupta'),
('S102', 'Raj Verma'),
('S103', 'Sneha Iyer'),
('S104', 'Karan Patel'),
('S105', 'Meera Nair');

INSERT INTO Course (CourseName, DeptID) VALUES
('Database Systems', 1),
('Data Structures', 1),
('Web Development', 2),
('Operating Systems', 1),
('Cloud Computing', 2);

INSERT INTO Instructor (InstructorName, DeptID) VALUES
('Dr. Mehta', 1),
('Dr. Sharma', 1),
('Prof. Nair', 2);

INSERT INTO Enrollment (StudentID, CourseID, InstructorID, Grade) VALUES
('S101', 1, 1, 'A'),
('S102', 2, 2, 'B'),
('S101', 2, 2, 'A'),
('S103', 3, 3, 'A'),
('S104', 4, 1, NULL),
('S105', 5, 3, NULL);

SELECT 
    s.StudentName,
    c.CourseName,
    i.InstructorName,
    e.Grade
FROM Enrollment e
INNER JOIN Student s ON e.StudentID = s.StudentID
INNER JOIN Course c ON e.CourseID = c.CourseID
INNER JOIN Instructor i ON e.InstructorID = i.InstructorID;

SELECT 
    c.CourseName,
    d.DeptName
FROM Course c
INNER JOIN Department d ON c.DeptID = d.DeptID;

SELECT 
    s.StudentName,
    c.CourseName,
    e.Grade
FROM Student s
LEFT JOIN Enrollment e ON s.StudentID = e.StudentID
LEFT JOIN Course c ON e.CourseID = c.CourseID;

SELECT 
    i.InstructorName,
    c.CourseName
FROM Enrollment e
RIGHT JOIN Instructor i ON e.InstructorID = i.InstructorID
LEFT JOIN Course c ON e.CourseID = c.CourseID
WHERE e.StudentID IS NULL;

SHOW TABLES;
SELECT * FROM Department;
SELECT * FROM Student;
SELECT * FROM Course;
SELECT * FROM Instructor;
SELECT * FROM Enrollment;