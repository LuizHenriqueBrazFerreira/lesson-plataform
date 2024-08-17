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
        const filteredLessons = lessons.map((lesson) => {
          const content = JSON.parse(lesson.content).blocks
            .filter((block:any) => block.type === 'header' || block.type === 'paragraph')
            .filter((block:any) => block.data.text.toLowerCase().includes(filterData.toLowerCase()))
            return content;
        }) as any;

        const searchResult = {
          courses: courses.filter((course) => course.title.toLowerCase().includes(filterData.toLowerCase())),
          modules: modules.filter((module) => module.title.toLowerCase().includes(filterData.toLowerCase())),
          lessons: lessons.map((lesson) => ({...lesson.dataValues, content: filteredLessons})) 
            || lessons.filter((lesson) => lesson.title.toLowerCase().includes(filterData.toLowerCase()))
        };

        const modifiedLessons = await Promise.all(searchResult.lessons.map(async (lesson) => {
          const {dataValues} = await this._modulesModel.getModuleById(lesson.moduleId) as any;
          return { courseId: dataValues.courseId, ...lesson };
        })) as any;
        
        searchResult.lessons = modifiedLessons;
        return {status: 'SUCCESSFUL', data: searchResult};
      }
      
      // const searchResult = {
      //   courses,
      //   modules,
      //   lessons
      // }
      // const modifiedLessons = await Promise.all(searchResult.lessons.map(async (lesson) => {
        
      //   const {dataValues} = await this._modulesModel.getModuleById(lesson.moduleId) as any;
        
      //   return { courseId: dataValues.courseId, ...lesson.dataValues };
      // })) as any;
      
      // searchResult.lessons = modifiedLessons;
      return {status: 'BAD_REQUEST', data: {message: 'Digite algo para pesquisar'}};

    } catch (error:any) {
      return {status: 'INTERNAL_SERVER_ERROR', data: {message: error.message}};
      
    }

  }
}
