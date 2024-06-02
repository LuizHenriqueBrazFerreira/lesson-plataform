function calculateModuleCompletion(module: Module): number {
  const totalLessons = module.lessons.length;
  const watchedLessons = module.lessons.filter(lesson => lesson.watched).length;
  return (watchedLessons / totalLessons) * 100;
}

function calculateCourseCompletion(course: Course): number {
  const totalModules = course.modules.length;
  const moduleCompletionPercentages = course.modules.map(calculateModuleCompletion);
  const totalCompletionPercentage = moduleCompletionPercentages.reduce((acc, percentage) => acc + percentage, 0);
  return totalCompletionPercentage / totalModules;
}

function markLessonAsWatched(course: Course, moduleId: number, lessonId: number): void {
  const module = course.modules.find(mod => mod.id === moduleId);
  if (module) {
    const lesson = module.lessons.find(les => les.id === lessonId);
    if (lesson) {
      lesson.watched = true;
      console.log(Aula ${lessonId} do Módulo ${moduleId} marcada como assistida.);
    }
  }
}

function markModuleAsCompleted(course: Course, moduleId: number): void {
  const module = course.modules.find(mod => mod.id === moduleId);
  if (module) {
    module.lessons.forEach(lesson => lesson.watched = true);
    console.log(Módulo ${moduleId} marcado como concluído.);
  }
}

function updateProgress(course: Course): void {
  course.modules.forEach(module => {
    const moduleCompletion = calculateModuleCompletion(module);
    console.log(Módulo ${module.id} concluído: ${moduleCompletion}%);
  });
  const courseCompletion = calculateCourseCompletion(course);
  console.log(Curso concluído: ${courseCompletion}%);
}