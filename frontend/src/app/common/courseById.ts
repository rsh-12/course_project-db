import {Course} from "./course";
import {Instructor} from "./instructor";

export class CourseById {
    course!: Course;
    instructors!: Instructor[];
    totalStudents?: number;
}