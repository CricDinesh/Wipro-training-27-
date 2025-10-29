export class Person {
    constructor(name, age, institute) {
        this.name = name;
        this.age = age;
        this.institute = institute;
        this.id = ++Person.counter;
    }
    greet() {
        return `Hello, my name is ${this.name}, I study at ${this.institute}.`;
    }
    showId() {
        return this.id;
    }
    getAge() {
        return this.age;
    }
}
Person.counter = 0;
export class Student extends Person {
    constructor(name, age, institute, skills) {
        super(name, age, institute);
        this.skills = skills;
    }
    getStudentDetails() {
        return `${this.greet()} I have the following skills: ${this.skills.join(", ")}.`;
    }
    addSkill(skill) {
        this.skills.push(skill);
    }
    display() {
        console.log(`My age is ${this.getAge()} years and my skills are: ${this.skills.join(", ")}.`);
    }
    greet() {
        return `Hello, my name is ${this.name}, I am ${this.getAge()} years old and I study at ${this.institute}.`;
    }
}
