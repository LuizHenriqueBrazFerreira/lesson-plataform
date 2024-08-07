import { useContext, useState } from 'react';
import { Button,
  Input,
  MenuList,
  MenuItem,
  Menu,
  MenuHandler } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { requestData } from '../services/requests';
import CourseContext from '../context/CourseContext';

function SearchBar() {
  const [search, setSearch] = useState('');
  const { searchBar, changeSearchBar } = useContext(CourseContext);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const { courses, modules, lessons } = searchBar;

  console.log(searchBar);

  const handleClick = async () => {
    if (search === '') setOpenMenu(!openMenu);
    const data = await requestData(`/search?filter=${search}`);
    changeSearchBar(data);
    setOpenMenu(!openMenu);
    console.log('chamou o handleClick');
  };

  return (
    <div className="Flex inline-flex h-[40px]">
      <Menu placement="bottom-start" open={ openMenu }>
        <div className="flex flex-col">
          <Input
            crossOrigin={ false }
            label="Faça sua busca"
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
          />
          <MenuHandler>
            <Input
              crossOrigin={ false }
              className="opacity-0"
            />
          </MenuHandler>
        </div>

        <Button color="white" size="sm" onClick={ handleClick }>Pesquisar</Button>

        <MenuList className="max-h-72">
          {courses.map((course, index) => (
            <MenuItem
              key={ index }
              onClick={ () => navigate(`/courses/${course.id}/modules`) }
            >
              {course.title}
            </MenuItem>
          ))}
          {modules.map(({ courseId, id, title }, index) => (
            <MenuItem
              key={ index }
              onClick={ () => navigate(`/courses/${courseId}/modules/${id}/lessons`) }
            >
              {title}
            </MenuItem>
          ))}

          {lessons.map(({ moduleId, title, courseId, id }, index) => (
            <MenuItem
              key={ index }
              onClick={ () => {
                navigate(`/courses/${courseId}/modules/${moduleId}/lessons/lesson/${id}`);
              } }
            >
              {title}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}

export default SearchBar;
