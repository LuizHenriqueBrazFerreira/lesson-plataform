import { IUserCoursesService, IUserCourses } from '../interfaces/IUsers';
import UserCoursesModel from '../models/UserCoursesModel';

class UserCoursesService implements IUserCoursesService {
  #userCoursesModel = new UserCoursesModel()

  async createUserCourse({ userId, courseTitle, courseId, progress = 0, bookmarked = false, subscribed = false }: IUserCourses) {
    try {
      const userCourse = await this.#userCoursesModel.createUserCourse({ userId, courseTitle, courseId, progress, bookmarked, subscribed });

      return {status: 'CREATED', data: userCourse}
    }
    catch (error) {
      return {status: 'INTERNAL_SERVER_ERROR', data: {message: 'Falha ao criar o curso para o usuário'}}
    }
  }

  async findCoursesByUserId(userId: number) {
    try {
      const userCourses = await this.#userCoursesModel.findCoursesByUserId(userId);

      return {status: 'SUCCESSFUL', data: userCourses}
    }
    catch (error) {
      return {status: 'INTERNAL_SERVER_ERROR', data: {message: 'Falha ao buscar os cursos do usuário'}}
    }
  }

  async updateUserCourse(key: string, value: string, userId: number, courseId: number) {
    if (key === 'subscribed' && userId === 1) return { status: 'SUCCESSFUL', data: {message: 'Não é necessário inscrever o admin' }}

    try{
      const affectedCount = await this.#userCoursesModel.updateUserCourse(key, value, userId, courseId);

      return { status: 'SUCCESSFUL', data: affectedCount }
    }
    catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: {message: 'Falha ao atualizar o curso do usuário' }}
    }
  }

  async getAllSubscribedUsers() {
    try {
      const subscribedUsers = await this.#userCoursesModel.getAllSubscribedUsers();

      return { status: 'SUCCESSFUL', data: subscribedUsers }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: {message: 'Falha ao buscar os usuários inscritos' }}
    }
  }

  async getSubscribedUsersByCourse(courseTitle: string) {
    try {
      const subscribedUsers = await this.#userCoursesModel.getSubscribedUsersByCourse(courseTitle);

      return { status: 'SUCCESSFUL', data: subscribedUsers }
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: {message: 'Falha ao buscar os usuários inscritos no curso' }}
    }
  }
}

export default UserCoursesService;