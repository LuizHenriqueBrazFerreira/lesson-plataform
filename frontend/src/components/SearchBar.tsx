import { useContext, useState } from 'react';
import { Button,
  Input,
  MenuList,
  MenuItem,
  Menu,
  MenuHandler } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { requestData } from '../services/requests';
import CourseContext from '../context/CourseContext';
import { translatePortuguese } from '../services/translationReverse';
// import { Courses, Module, Lesson } from '../types/courseType';

function SearchBar() {
  const [search, setSearch] = useState('');
  const { searchBar, changeSearchBar,
    translateDynamicContent } = useContext(CourseContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coursesTitles, setCoursesTitles] = useState<string[]>([]);
  const [modulesTitles, setModulesTitles] = useState<string[]>([]);
  const [lessonsTitles, setLessonsTitles] = useState<string[]>([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { courses, modules, lessons } = searchBar;

  async function translateSearch() {
    setIsLoading(true);
    setOpenMenu(!openMenu);

    try {
      const translatedCourseTitles = await Promise.all(
        searchBar.courses.map(({ title }) => translateDynamicContent(title ?? title)),
      );
      setCoursesTitles(translatedCourseTitles);

      const translatedModuleTitles = await Promise.all(
        searchBar.modules.map(({ title }) => translateDynamicContent(title ?? title)),
      );
      setModulesTitles(translatedModuleTitles);

      const translatedLessonTitles = await Promise.all(
        searchBar.lessons.map(({ title }) => translateDynamicContent(title ?? title)),
      );
      setLessonsTitles(translatedLessonTitles);

      setIsLoading(false);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    }
  }

  const handleClick = async () => {
    if (search === '') {
      return;
    }

    const toPortuguese = await translatePortuguese(search, i18n.language);
    const data = await requestData(`/search?filter=${toPortuguese}`);
    changeSearchBar(data);
    await translateSearch();
    // setOpenMenu(!openMenu);
  };

  return (
    <div className="Flex inline-flex h-[40px]">
      <Menu placement="bottom-start" open={ openMenu }>

        {isLoading ? <MenuList className="max-h-72"><Button variant="text" loading>Carregando</Button></MenuList>
          : (
            <MenuList className="max-h-72">
              {coursesTitles.map((course, index) => (
                <MenuItem
                  key={ index }
                  onClick={ () => navigate(`/courses/${courses[index].id}/modules`) }
                >
                  {course}
                </MenuItem>
              ))}
              {modulesTitles.map((module, index) => (
                <MenuItem
                  key={ index }
                  onClick={
                () => navigate(`/courses/${modules[index].courseId}/modules/${modules[index].id}/lessons`)
              }
                >
                  {module}
                </MenuItem>
              ))}

              {lessonsTitles.map((lesson, index) => (
                <MenuItem
                  key={ index }
                  onClick={ () => {
                    navigate(`/courses/${lessons[index].courseId}/modules/${lessons[index].moduleId}/lessons/${lessons[index].id}`);
                  } }
                >
                  {lesson}
                </MenuItem>
              ))}
            </MenuList>)}
        <div className="flex flex-col">
          <Input
            crossOrigin={ undefined }
            label={ t('Faça sua busca') }
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
          />
          <MenuHandler>
            <Input
              crossOrigin={ undefined }
              className="opacity-0"
            />
          </MenuHandler>
        </div>

        <Button color="white" size="sm" onClick={ handleClick }>{t('Pesquisar')}</Button>

      </Menu>
    </div>
  );
}

export default SearchBar;
