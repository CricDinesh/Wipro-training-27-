
-- 1. Create Database
CREATE DATABASE IF NOT EXISTS TechNovaDB;
USE TechNovaDB;

-- 2. Create Department Table
CREATE TABLE Department (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(100) NOT NULL UNIQUE,
    Location VARCHAR(100)
);

-- 3. Create Employee Table
CREATE TABLE Employee (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(100) NOT NULL,
    Gender ENUM('M', 'F', 'Other'),
    DOB DATE,
    HireDate DATE,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

-- 4. Create Project Table
CREATE TABLE Project (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(100) NOT NULL,
    DeptID INT,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

-- 5. Create Performance Table
CREATE TABLE Performance (
    EmpID INT,
    ProjectID INT,
    Rating DECIMAL(3,2),
    ReviewDate DATE,
    PRIMARY KEY (EmpID, ProjectID),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID),
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);

-- 6. Create Reward Table
CREATE TABLE Reward (
    EmpID INT,
    RewardMonth VARCHAR(20),
    RewardAmount DECIMAL(10,2),
    PRIMARY KEY (EmpID, RewardMonth),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);

-- 7. Create Indexes for Optimization
CREATE INDEX idx_EmpName ON Employee(EmpName);
CREATE INDEX idx_DeptID ON Employee(DeptID);

-- Insert Data into Department
INSERT INTO Department VALUES
(101, 'IT', 'Bangalore'),
(102, 'HR', 'Delhi'),
(103, 'Finance', 'Mumbai'),
(104, 'Sales', 'Chennai'),
(105, 'Operations', 'Hyderabad');

-- Insert Data into Employee
INSERT INTO Employee VALUES
(1, 'Asha', 'F', '1990-07-12', '2018-06-10', 101),
(2, 'Raj', 'M', '1988-04-09', '2020-03-22', 102),
(3, 'Neha', 'F', '1995-01-15', '2021-08-05', 101),
(4, 'Karan', 'M', '1992-11-30', '2019-10-12', 103),
(5, 'Priya', 'F', '1993-02-20', '2022-01-15', 104);

-- Insert Data into Project
INSERT INTO Project VALUES
(201, 'Payroll Automation', 103, '2021-01-10', '2021-12-20'),
(202, 'Employee Portal', 101, '2020-04-01', '2021-03-15'),
(203, 'Recruitment System', 102, '2021-07-05', '2022-06-30'),
(204, 'Sales Tracker', 104, '2022-02-10', '2023-01-15'),
(205, 'Inventory Dashboard', 105, '2023-03-01', '2023-12-15');

-- Insert Data into Performance
INSERT INTO Performance VALUES
(1, 202, 4.5, '2023-01-10'),
(2, 203, 4.2, '2023-02-14'),
(3, 202, 4.7, '2023-03-22'),
(4, 201, 3.8, '2023-04-18'),
(5, 204, 4.6, '2023-05-25');

-- Insert Data into Reward
INSERT INTO Reward VALUES
(1, '2023-01', 2500.00),
(2, '2023-02', 1800.00),
(3, '2023-03', 3000.00),
(4, '2023-04', 900.00),
(5, '2023-05', 2700.00);

-- Update Example: Change an Employee’s Department
UPDATE Employee
SET DeptID = 105
WHERE EmpID = 4;

-- Delete Example: Remove rewards less than 1000
DELETE FROM Reward
WHERE RewardAmount < 1000;

-- 1. Employees who joined after 2019-01-01
SELECT EmpName, HireDate
FROM Employee
WHERE HireDate > '2019-01-01';

-- 2. Average performance rating of employees in each department
SELECT d.DeptName, AVG(p.Rating) AS AvgRating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
GROUP BY d.DeptName;

-- 3. List employees with their age
SELECT EmpName, TIMESTAMPDIFF(YEAR, DOB, CURDATE()) AS Age
FROM Employee;

-- 4. Total rewards given in the current year
SELECT YEAR(CURDATE()) AS CurrentYear, SUM(RewardAmount) AS TotalRewards
FROM Reward
WHERE RewardMonth LIKE CONCAT(YEAR(CURDATE()), '%');

-- 5. Employees who have received rewards greater than 2000
SELECT e.EmpName, r.RewardAmount
FROM Employee e
JOIN Reward r ON e.EmpID = r.EmpID
WHERE r.RewardAmount > 2000;

-- 1. Employee Name, Department Name, Project Name, and Rating
SELECT e.EmpName, d.DeptName, p.ProjectName, perf.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance perf ON e.EmpID = perf.EmpID
JOIN Project p ON perf.ProjectID = p.ProjectID;

-- 2. Highest-rated employee in each department
SELECT d.DeptName, e.EmpName, MAX(perf.Rating) AS TopRating
FROM Performance perf
JOIN Employee e ON perf.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
GROUP BY d.DeptName;

-- 3. Employees who have not received any rewards
SELECT EmpName
FROM Employee
WHERE EmpID NOT IN (SELECT EmpID FROM Reward);


-- Begin Transaction
START TRANSACTION;

INSERT INTO Employee VALUES (6, 'Suresh', 'M', '1994-09-10', '2023-10-20', 101);
INSERT INTO Performance VALUES (6, 202, 4.4, '2024-01-10');
INSERT INTO Reward VALUES (6, '2024-02', 2200.00);

-- If everything is successful, commit the transaction
COMMIT;

-- (If any insert fails, ROLLBACK should be used)
-- ROLLBACK;

-- Analyze Query Performance
EXPLAIN SELECT e.EmpName, d.DeptName, p.ProjectName, perf.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance perf ON e.EmpID = perf.EmpID
JOIN Project p ON perf.ProjectID = p.ProjectID;

-- After adding indexes, rerun EXPLAIN to observe performance improvement.

