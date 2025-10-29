
import { CourseManager, CourseCategory } from "./course";

const courseManager = new CourseManager();

const instructor1 = courseManager.addInstructor("John Doe", [CourseCategory.DEVELOPMENT]);
const student1 = courseManager.addStudent("Alice Smith");

const course1 = courseManager.createCourse("TypeScript Basics", CourseCategory.DEVELOPMENT, instructor1.id);
courseManager.enrollStudent(course1.id, student1.id);

courseManager.printSummary();

const allCourses = courseManager.getAllCourses();
console.log("All Courses:", allCourses);

const courseDetails = courseManager.getCourseDetails(course1.id);
console.log("Course Details:", courseDetails);
