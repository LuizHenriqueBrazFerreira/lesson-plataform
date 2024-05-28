import { Input, Typography } from '@material-tailwind/react';
import { useEffect, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesBackground from '../components/CoursesBackground';
import OrangeButton from '../components/OrangeButton';
import EyeButton from '../components/EyeButton';
import { requestPost, requestUpdate } from '../services/requests';
import WarnigIcon from '../components/WarningIcon';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   navigate('/login');
    // }

    const userEmail = localStorage.getItem('userEmail');

    async function fetchData() {
      try {
        const data = await requestPost('/profile', { email: userEmail });
        console.log(data);

        setName(data.name);
        setEmail(data.email);
        setOldEmail(data.email);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.error(error.response.data);
        }
      }
    }

    fetchData();
  }, []);

  const handleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleUpdateProfile = async () => {
    if (password !== confirmPassword) {
      return setMessage('As senhas não coincidem.');
    }

    setIsLoading(true);

    try {
      await requestUpdate('/profile', {
        oldEmail,
        email,
        name,
        password,
      });
      setIsLoading(false);
      setIsDisabled(true);
    } catch (error: any) {
      setIsLoading(false);
      if (error.isAxiosError) {
        setMessage(error.response.data.message);
        console.error(error.response.data);
      }
    }
  };

  return (
    <CoursesBackground>
      <div className="self-start">
        <h1
          className="text-2xl lg:text-4xl
            text-btn-orange font-bold"
        >
          Meu Perfil
        </h1>
      </div>
      <div className="flex flex-col justify-evenly grow">
        <img
          className="w-12 lg:w-20"
          src="/src/assets/profile.png"
          alt="profile icon"
        />
        <Input
          crossOrigin={ undefined }
          size="lg"
          type="text"
          label="Nome"
          value={ name }
          disabled={ isDisabled }
          onChange={ (e) => setName(e.target.value) }
        />
        <Input
          crossOrigin={ undefined }
          size="lg"
          type="email"
          label="Email"
          value={ email }
          disabled={ isDisabled }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <div>
          <Input
            crossOrigin={ undefined }
            size="lg"
            type={ showPassword ? 'text' : 'password' }
            label="Senha"
            value={ password }
            disabled={ isDisabled }
            onChange={ (e) => setPassword(e.target.value) }
            onFocus={ () => setShowEye(true) }
            onBlur={ () => setShowEye(false) }
            icon={ <EyeButton
              onClick={ (event) => handleShowPassword(event) }
              showEye={ showEye }
              showPassword={ showPassword }
            /> }
          />
          { showEye && (
            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal"
            >
              <WarnigIcon />
              A senha deve ter no mínimo 8 caracteres
            </Typography>
          )}
        </div>
        <Input
          crossOrigin={ undefined }
          size="lg"
          type={ showPassword ? 'text' : 'password' }
          label="Confirmar Senha"
          value={ confirmPassword }
          disabled={ isDisabled }
          onChange={ (e) => setConfirmPassword(e.target.value) }
          onFocus={ () => setShowEye(true) }
          icon={ <EyeButton
            onClick={ (event) => handleShowPassword(event) }
            showEye={ showEye }
            showPassword={ showPassword }
          /> }
        />
        { message === 'Perfil atualizado com sucesso!'
          ? <p className="text-green-500">{ message }</p>
          : <p className="text-red-500">{ message }</p>}
      </div>
      { isDisabled && (
        <OrangeButton
          onClick={ () => setIsDisabled(false) }
        >
          Editar
        </OrangeButton>
      )}
      { !isDisabled && (
        <OrangeButton
          isLoading={ isLoading }
          onClick={ handleUpdateProfile }
        >
          Salvar
        </OrangeButton>
      ) }
    </CoursesBackground>
  );
}

export default Profile;
