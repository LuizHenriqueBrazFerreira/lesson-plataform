import WatchedLessonSequelize from "../database/models/WatchedLessons";
import { IWatchedLessons, IWatchedLessonsModel } from "../interfaces/IWatchedLessons";

export default class WatchedLessonModel implements IWatchedLessonsModel {
  private _model = WatchedLessonSequelize;

   async findWatchedLessonsByUserIdAndModuleId(userId: number, moduleId: number, watched = true): Promise<WatchedLessonSequelize[]> {
    const watchedLessons = await this._model.findAll({ where: { userId, moduleId, watched } });

    return watchedLessons;
  }

  async  updateWatchedLesson(userId: number, lessonId: number, watched = true): Promise<number> {
    const updated = await this._model.update({ watched }, { where: { userId, lessonId } });

    return updated[0];
  }
   
}