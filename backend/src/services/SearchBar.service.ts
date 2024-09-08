import { ISearchBarService } from "../interfaces/ISearchBar";
import CoursesModel from "../models/CoursesModel";
import LessonsModel from "../models/LessonsModel";
import ModulesModel from "../models/ModulesModel";

export class SearchBarService implements ISearchBarService {
  constructor(private _courseModel = new CoursesModel(), 
    private _modulesModel = new ModulesModel(), 
    private _lessonsModel = new LessonsModel()) {}


  async search(filterData:string) {
    try {
      const courses = await this._courseModel.getCourses();
      const modules = await this._modulesModel.getModules();
      const lessons = await this._lessonsModel.getLessons();

      if (filterData !== '')  {
        const result = [];
        const filteredLessons = lessons.map((lesson) => {
          const content = JSON.parse(lesson.content).blocks
            .filter((block:any) => block.type === 'header' || block.type === 'paragraph')
            .filter((block:any) => block.data.text.toLowerCase().includes(filterData.toLowerCase()))
            return content;
        }) as any;

        const searchResult =  filteredLessons.map((lesson:any, index:number) => ({...lessons[index].dataValues}));

        const modifiedLessons = await Promise.all(searchResult.map(async (lesson:any) => {
          const {dataValues} = await this._modulesModel.getModuleById(lesson.moduleId) as any;
          return { courseId: dataValues.courseId, ...lesson };
        })) as any;
        

        const filteredCourses = modifiedLessons.map((lesson: any) => ({
          id: lesson.id,
          title: lesson.title,
          moduleId: lesson.moduleId,
          courseId: lesson.courseId,
        }))
            

        result.push(...filteredCourses);
        return {status: 'SUCCESSFUL', data: result};
      }
      
      return {status: 'BAD_REQUEST', data: {message: 'Digite algo para pesquisar'}};

    } catch (error:any) {
      return {status: 'INTERNAL_SERVER_ERROR', data: {message: error.message}};
      
    }

  }
}
