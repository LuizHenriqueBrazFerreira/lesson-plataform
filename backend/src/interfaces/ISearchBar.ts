import { Course, Lesson, Module } from "../types/Data.types"
import { ServiceResponse } from "../types/Service.response"

type SearchBarResponse = {
  courses: [Course] | [],
  modules: [Module] | [],
  lessons: [Lesson] | []
} 


export interface ISearchBarService {
  search(filterData:string): Promise<any>
}