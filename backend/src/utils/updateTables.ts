import UserCoursesModel from "../models/UserCoursesModel";
import WatchedLessonModel from "../models/WatchedLessons.model";
import ModulesProgressModel from "../models/ModulesProgressModel";
import UsersModel from "../models/UsersModel";
import CoursesModel from "../models/CoursesModel";

export class UpdateTables {
  #lessonWatchedModel = new WatchedLessonModel()
  #userCoursesModel = new UserCoursesModel()
  #moduleProgress = new ModulesProgressModel()
  #userModel = new UsersModel()
  #coursesModel = new CoursesModel()

  updateLessonWatched = async (lessonId: number, moduleId:number) => {
    try {
      const users = await this.#userModel.getAllUsers();
      const usersIds = users.map((user) => user.id);
      await Promise.all(usersIds.map(async (id) => {
        await this.#lessonWatchedModel.createWatchedLesson(id, moduleId, lessonId);
      }));
      } catch (error) {
      console.error(error);
    }
  }

  updateModuleProgress = async (moduleId: number, courseId:number) => {
    try {
      const users = await this.#userModel.getAllUsers();
      const usersIds = users.map((user) => user.id);
      await Promise.all(usersIds.map(async (id:any) => {
        await this.#moduleProgress.createModuleProgress(id, courseId, moduleId);
      }));
    } catch (error) {
      console.error(error);
    }
  }

  updateUserCourses = async (courseId: number) => {
    try {
      const courseTitle = await this.#coursesModel.getCourseById(courseId).then((course: any) => course.title);
      const users = await this.#userModel.getAllUsers();
      const usersIds = users.map((user) => user.id);
      await Promise.all(usersIds.map(async (id) => {
        await this.#userCoursesModel.createUserCourse({ userId: id, courseTitle, courseId });
      }));
    } catch (error) {
      console.error(error);
    }
  }
}