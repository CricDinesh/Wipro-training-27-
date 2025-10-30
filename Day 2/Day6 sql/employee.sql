CREATE DATABASE employee;
USE employee;

CREATE TABLE Employees (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    HireDate DATE,
    Salary DECIMAL(10,2)
);

INSERT INTO Employees (FirstName, LastName, Email, HireDate, Salary) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-01-15', 60000.00),
('Jane', 'Smith', 'jane.smith@example.com', '2023-02-20', 65000.00),
('Alice', 'Johnson', 'alice.johnson@example.com', '2023-03-10', 70000.00);

 