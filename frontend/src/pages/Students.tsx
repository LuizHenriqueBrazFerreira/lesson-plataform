import { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';
import OrangeButton from '../components/OrangeButton';
import WhiteButton from '../components/WhiteButton';
import CoursesBackground from '../components/CoursesBackground';
import { requestData, requestUpdate,
  requestDelete, setToken } from '../services/requests';
import { UserType } from '../types/userTypes';
import EyeButton from '../components/EyeButton';

function Students() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [students, setStudents] = useState<UserType[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== 'ADMIN') {
      return navigate('/login');
    }
    setToken(token);

    async function fetchStudents() {
      try {
        const data = await requestData('/students');
        const newStudents = data.map((student: UserType) => {
          return {
            ...student,
            password: '',
            isDisabled: true,
          };
        });
        setStudents(newStudents);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error);
        }
      }
    }
    fetchStudents();
  }, []);

  const handleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleIsDisabled = (student: UserType, index: number) => {
    setStudents((prevStudents) => {
      const newStudents = [...prevStudents];
      newStudents[index] = {
        ...student,
        isDisabled: !student.isDisabled,
      };
      return newStudents;
    });
  };

  const handleChange = (event: any, index: number) => {
    setStudents((prevStudents) => {
      const newStudents = [...prevStudents];
      newStudents[index] = {
        ...newStudents[index],
        [event.target.name]: event.target.value,
      };
      return newStudents;
    });
  };

  return (
    <CoursesBackground>
      <div className="self-start">
        <h1
          className="text-xl lg:text-4xl
            text-btn-orange font-bold mb-10"
        >
          Administrar Estudantes
        </h1>
      </div>
      {students.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {students.map((student: UserType, index) => (
            <div
              key={ student.id }
              className="flex flex-col gap-4 w-96 p-4 bg-white rounded-lg shadow-md"
            >
              <Input
                crossOrigin={ undefined }
                size="lg"
                type="text"
                name="name"
                label="Nome"
                value={ student.name }
                disabled={ student.isDisabled }
                onChange={ (event) => handleChange(event, index) }
              />
              <Input
                crossOrigin={ undefined }
                size="lg"
                type="email"
                label="Email"
                name="email"
                value={ student.email }
                disabled={ student.isDisabled }
                onChange={ (event) => handleChange(event, index) }
              />
              <Input
                crossOrigin={ undefined }
                size="lg"
                type="text"
                label="País"
                name="country"
                value={ student.country }
                disabled={ student.isDisabled }
                onChange={ (event) => handleChange(event, index) }
              />
              <Input
                crossOrigin={ undefined }
                size="lg"
                type="text"
                label="Organização"
                name="organization"
                value={ student.organization }
                disabled={ student.isDisabled }
                onChange={ (event) => handleChange(event, index) }
              />
              <Input
                crossOrigin={ undefined }
                size="lg"
                type={ showPassword ? 'text' : 'password' }
                label="Senha"
                name="password"
                value={ student.password }
                disabled={ student.isDisabled }
                onChange={ (event) => handleChange(event, index) }
                onFocus={ () => setShowEye(true) }
                icon={ <EyeButton
                  onClick={ (event) => handleShowPassword(event) }
                  showEye={ showEye }
                  showPassword={ showPassword }
                /> }
              />
              <div className="flex justify-between gap-2">
                {student.isDisabled ? (
                  <OrangeButton onClick={ () => handleIsDisabled(student, index) }>
                    Editar
                  </OrangeButton>
                ) : (
                  <OrangeButton>
                    Salvar
                  </OrangeButton>
                )}
                <WhiteButton>
                  Excluir
                </WhiteButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-xl lg:text-2xl text-btn-orange font-bold">
          Nenhum estudante encontrado
        </h2>
      )}
    </CoursesBackground>
  );
}

export default Students;
