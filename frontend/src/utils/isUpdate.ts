import { LessonPropType } from '../types/lessons';

function setDataToUpdate(oldData:LessonPropType[], newData:LessonPropType[]) {
  const definedData = {
    toUpdate: [] as LessonPropType[],
    toAdd: [] as LessonPropType[],
  };

  newData.forEach((newItem:LessonPropType) => {
    const oldItem = oldData.find((item) => item.id === newItem.id);
    if (oldItem) {
      if (oldItem !== newItem) definedData.toUpdate.push(newItem);
    } else { definedData.toAdd.push(newItem); }
  });

  return definedData;
}

export default setDataToUpdate;
