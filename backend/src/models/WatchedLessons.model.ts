import WatchedLessonSequelize from "../database/models/WatchedLessons";
import { IWatchedLessons, IWatchedLessonsModel } from "../interfaces/IWatchedLessons";

export default class WatchedLessonModel implements IWatchedLessonsModel {
  private _model = WatchedLessonSequelize;

  async createWatchedLesson(userId: number, moduleId: number, lessonId: number ): Promise<WatchedLessonSequelize> {
    const created = await this._model.create({ userId, moduleId, lessonId, watched: false});

    return created;
  }

  async findWatchedLessonsByUserIdAndModuleId(userId: number, moduleId: number): Promise<WatchedLessonSequelize[]> {
    const watchedLessons = await this._model.findAll({ where: { userId, moduleId, watched: true } });

    return watchedLessons;
  }

  async  updateWatchedLesson(userId: number, lessonId: number, watched = true): Promise<number> {
    const updated = await this._model.update({ watched }, { where: { userId, lessonId } });

    return updated[0];
  }

  async getWatchedLessonByLessonId(userId: number, lessonId: number): Promise<WatchedLessonSequelize | null> {
    const watchedLesson = await this._model.findOne({ where: { userId, lessonId } });

    return watchedLesson;
  }
   
}