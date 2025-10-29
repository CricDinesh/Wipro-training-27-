
export enum CourseCategory {
  DEVELOPMENT = "Development",
  DESIGN = "Design",
  MARKETING = "Marketing",
  BUSINESS = "Business"
}

interface Student {
  id: number;
  name: string;
}

interface Instructor {
  id: number;
  name: string;
  expertise: CourseCategory[];
}

interface Course {
  id: number;
  title: string;
  category: CourseCategory;
  instructorId: number;
  students: number[];
}

export class CourseManager {
  private courses: Course[] = [];
  private students: Student[] = [];
  private instructors: Instructor[] = [];
  private courseIdCounter = 1;
  private studentIdCounter = 1;
  private instructorIdCounter = 1;

  addInstructor(name: string, expertise: CourseCategory[]): Instructor {
    const instructor: Instructor = {
      id: this.instructorIdCounter++,
      name,
      expertise
    };
    this.instructors.push(instructor);
    return instructor;
  }

  addStudent(name: string): Student {
    const student: Student = {
      id: this.studentIdCounter++,
      name
    };
    this.students.push(student);
    return student;
  }

  createCourse(title: string, category: CourseCategory, instructorId: number): Course {
    const course: Course = {
      id: this.courseIdCounter++,
      title,
      category,
      instructorId,
      students: []
    };
    this.courses.push(course);
    return course;
  }

  enrollStudent(courseId: number, studentId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      course.students.push(studentId);
    }
  }

  getAllCourses(): Course[] {
    return this.courses;
  }

  getCourseDetails(courseId: number): Course | undefined {
    return this.courses.find(c => c.id === courseId);
  }

  printSummary(): void {
    console.log("\n--- COURSE SUMMARY ---");
    this.courses.forEach(course => {
      const instructor = this.instructors.find(i => i.id === course.instructorId);
      const studentNames = course.students
        .map(id => this.students.find(s => s.id === id)?.name)
        .join(", ");
      console.log(`Course: ${course.title}`);
      console.log(`Instructor: ${instructor?.name}`);
      console.log(`Students: ${studentNames || "None"}\n`);
    });
  }
}
