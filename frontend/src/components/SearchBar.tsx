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
import CourseContext, { SearchBarResponse } from '../context/CourseContext';
import { translatePortuguese } from '../services/translationReverse';

function SearchBar() {
  const [search, setSearch] = useState('');
  const { translateDynamicContent } = useContext(CourseContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lessonsTitles, setLessonsTitles] = useState<string[]>([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [dbResult, setDbResult] = useState<SearchBarResponse[]>([]);

  const translateSearch = async (data: SearchBarResponse[]) => {
    try {
      if (i18n.language === 'pt') {
        setLessonsTitles(data.map(({ title }) => title));
        setIsLoading(false);
        return;
      }
      const translatedLessonTitles = await Promise.all(
        data.map(({ title }) => translateDynamicContent(title)),
      );
      setLessonsTitles(translatedLessonTitles);

      setOpenMenu(true);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (search === '') {
      return;
    }

    const toPortuguese = await translatePortuguese(search, i18n.language);
    const data = await requestData(`/search?filter=${toPortuguese}`);
    console.log(data);

    setDbResult(data);
    await translateSearch(data);
  };

  const buildRoute = (index: number) => {
    const result = dbResult[index];
    return `/courses/${result.courseId}/modules/${result.moduleId}/lessons/${result.id}`;
  };

  return (
    <form className="flex h-[40px]" onSubmit={ handleSubmit }>
      <Menu placement="bottom-start" open={ openMenu } handler={ setOpenMenu }>

        {isLoading ? (
          <MenuList className="max-h-72">
            <Button variant="text" loading>Carregando</Button>
          </MenuList>)
          : (
            <MenuList className="max-h-72">
              {lessonsTitles.map((lesson, index) => (
                <MenuItem
                  key={ index }
                  onClick={ () => {
                    navigate(buildRoute(index));
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

        <Button
          color="white"
          size="sm"
          type="submit"
        >
          {t('Pesquisar')}
        </Button>

      </Menu>
    </form>
  );
}

export default SearchBar;
