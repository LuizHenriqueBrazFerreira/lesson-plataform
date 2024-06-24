import UserCoursesModel from "../models/UserCoursesModel";
import WatchedLessonModel from "../models/WatchedLessons.model";
import ModulesProgressModel from "../models/ModulesProgressModel";
import UsersModel from "../models/UsersModel";
import CoursesModel from "../models/CoursesModel";

export class UpdateTables {
  
  constructor(private _lessonWatchedModel = new WatchedLessonModel(),
    private _userCoursesModel = new UserCoursesModel(),
    private _moduleProgress = new ModulesProgressModel(),
    private _userModel = new UsersModel(),
    private _coursesModel = new CoursesModel()) {}

  updateLessonWatched = async (lessonId: number, moduleId:number) => {
    try {
      const users = await this._userModel.getAllUsers();
      const usersIds = users.map((user) => user.id);
      await Promise.all(usersIds.map(async (id) => {
        await this._lessonWatchedModel.createWatchedLesson(id, moduleId, lessonId);
      }));
      } catch (error) {
      console.error(error);
    }
  }

  updateModuleProgress = async (moduleId: number, courseId:number) => {
    try {
      const users = await this._userModel.getAllUsers();
      const usersIds = users.map((user) => user.id);
      await Promise.all(usersIds.map(async (id:any) => {
        await this._moduleProgress.createModuleProgress(id, moduleId, courseId);
      }));
    } catch (error) {
      console.error(error);
    }
  }

  updateUserCourses = async (courseId: number) => {
    try {
      const courseTitle = await this._coursesModel.getCourseById(courseId).then((course: any) => course.title);
      const users = await this._userModel.getAllUsers();
      const usersIds = users.map((user) => user.id);
      await Promise.all(usersIds.map(async (id) => {
        await this._userCoursesModel.createUserCourse({ userId: id, courseTitle, courseId });
      }));
    } catch (error) {
      console.error(error);
    }
  }

}