import { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import { UserType } from '../../types/userTypes';
import { requestData, requestUpdate,
  requestDelete, setToken } from '../../services/requests';
import OrangeButton from '../../components/OrangeButton';
import WhiteButton from '../../components/WhiteButton';
import CoursesBackground from '../../components/CoursesBackground';
import EyeButton from '../../components/EyeButton';

function Students() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [oldEmail, setOldEmail] = useState<string[]>([]);
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
        const studentsOldEmail = data.map((student: UserType) => student.email);
        setOldEmail(studentsOldEmail);
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

  const handleUpdateProfile = async (index:number) => {
    const student = students[index];
    const oldEmailStudent = oldEmail[index];

    const data = { oldEmail: oldEmailStudent, ...student };

    try {
      await requestUpdate('/profile', data);
      handleIsDisabled(students[index], index);
      Swal.fire({
        icon: 'success',
        title: 'Usuário atualizado com sucesso',
        showConfirmButton: true,
        confirmButtonColor: '#e06915',
      });
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
      }
    }
  };

  const handleDeleteStudent = async (index:number) => {
    const student = students[index];

    try {
      if (index === 0) {
        return await Swal.fire({
          icon: 'error',
          title: 'Não é possível excluir o ADMIN',
          showConfirmButton: true,
          confirmButtonColor: '#e06915',
        });
      }

      setStudents((prevStudents) => {
        const newStudents = [...prevStudents];
        newStudents.splice(index, 1);
        return newStudents;
      });
      await requestDelete(`/profile/${student.id}`);
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error(error);
      }
    }
  };

  return (
    <CoursesBackground>
      <h1
        className="text-xl md:text-4xl
      text-btn-orange font-bold mb-10"
      >
        Administrar Usuários
      </h1>
      {students.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {students.map((student: UserType, index) => (
            <div
              key={ student.id }
              className="flex flex-col gap-4 md:w-96 p-4 bg-white rounded-lg shadow-md"
            >
              {index === 0 ? (
                <h2 className="text-center text-xl md:text-2xl text-btn-orange font-bold">
                  Administrador
                </h2>
              ) : (
                <h2 className="text-center text-xl md:text-2xl text-btn-orange font-bold">
                  Estudante
                </h2>
              )}
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
                  <OrangeButton onClick={ () => handleUpdateProfile(index) }>
                    Salvar
                  </OrangeButton>
                )}
                <WhiteButton onClick={ () => handleDeleteStudent(index) }>
                  Excluir
                </WhiteButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-xl md:text-2xl text-btn-orange font-bold">
          Nenhum usuário encontrado
        </h2>
      )}
    </CoursesBackground>
  );
}

export default Students;
