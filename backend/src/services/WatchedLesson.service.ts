import WatchedLessonModel from "../models/WatchedLessons.model";
import { IWatchedLessons, IWatchedLessonsService } from "../interfaces/IWatchedLessons";
import { ServiceResponse } from "../types/Service.response";
import WatchedLessonSequelize from "../database/models/WatchedLessons";

export default class WatchedLessonService implements IWatchedLessonsService {
  constructor(private _model = new WatchedLessonModel()) {};

  async requestWatchedLessonsByUserIdAndModuleId(userId: number, moduleId: number) {

      const watchedLessons = await this._model.findWatchedLessonsByUserIdAndModuleId(userId, moduleId);
      
      if (watchedLessons) return { status: 'SUCCESSFUL', data:  watchedLessons  };

      return { status: 'NOT_FOUND', data: { message: 'Aula não encontrada.' } };
  }

  async updateWatchedLesson(userId: number, lessonId: number, watched:boolean) {
    const updatedWatchedLesson = await this._model.updateWatchedLesson(userId, lessonId, watched);

    if (updatedWatchedLesson) return { status: 'SUCCESSFUL', data: updatedWatchedLesson };

    return { status: 'NOT_FOUND', data: { message: 'Aula não encontrada.' } };
  }

  async getWatchedLessonByLessonId(userId: number, lessonId: number) {
    const watchedLesson = await this._model.getWatchedLessonByLessonId(userId, lessonId);

    if (watchedLesson) return { status: 'SUCCESSFUL', data: watchedLesson };

    return { status: 'NOT_FOUND', data: { message: 'Aula não encontrada.' } };
  }
}