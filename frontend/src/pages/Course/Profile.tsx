import { Input, Typography } from '@material-tailwind/react';
import { useEffect, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CoursesBackground from '../../components/CoursesBackground';
import OrangeButton from '../../components/OrangeButton';
import EyeButton from '../../components/EyeButton';
import { requestPost, requestUpdate, setToken } from '../../services/requests';
import WarnigIcon from '../../components/WarningIcon';
import { UserType, initialUserState } from '../../types/userTypes';

function Profile() {
  const [user, setUser] = useState<UserType>(initialUserState);
  const [oldEmail, setOldEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    setToken(token);

    const userEmail = localStorage.getItem('userEmail');

    async function fetchData() {
      try {
        const data = await requestPost('/profile', { email: userEmail });

        setUser({
          name: data.name,
          email: data.email,
          password: '',
          confirmPassword: '',
          country: data.country,
          organization: data.organization,
        });

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

  const handleChange = (event: any) => {
    event.preventDefault();

    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateProfile = async () => {
    if (user.password !== user.confirmPassword) {
      return setMessage('As senhas não coincidem.');
    }

    setIsLoading(true);

    try {
      const data = await requestUpdate('/profile', {
        oldEmail,
        email: user.email,
        name: user.name,
        password: user.password,
      });

      localStorage.setItem('userEmail', user.email);

      setUser({
        ...user,
        password: '',
        confirmPassword: '',
      });

      setIsLoading(false);

      setIsDisabled(true);

      setMessage(data.message);

      setOldEmail(user.email);

      setTimeout(() => {
        setMessage('');
      }, 5000);
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
      <h1
        className="text-2xl md:text-4xl
            text-btn-orange font-bold"
      >
        {t('Meu Perfil')}
      </h1>
      <div className="flex flex-col justify-evenly grow">
        <img
          className="w-12 md:w-20"
          src="/assets/profile.png"
          alt="profile icon"
        />
        <Input
          crossOrigin={ undefined }
          name="name"
          size="lg"
          type="text"
          label={ t('Nome') }
          value={ user.name }
          disabled={ isDisabled }
          onChange={ handleChange }
        />
        <Input
          crossOrigin={ undefined }
          name="email"
          size="lg"
          type="email"
          label={ t('Email') }
          value={ user.email }
          disabled={ isDisabled }
          onChange={ handleChange }
        />
        <Input
          crossOrigin={ undefined }
          name="country"
          size="lg"
          type="text"
          label={ t('Pais') }
          value={ user.country }
          disabled={ isDisabled }
          onChange={ handleChange }
        />
        <Input
          crossOrigin={ undefined }
          name="organization"
          size="lg"
          type="text"
          label={ t('Organizacao opcional') }
          value={ user.organization }
          disabled={ isDisabled }
          onChange={ handleChange }
        />
        <div>
          <Input
            crossOrigin={ undefined }
            name="password"
            size="lg"
            type={ showPassword ? 'text' : 'password' }
            label={ t('Senha') }
            value={ user.password }
            disabled={ isDisabled }
            onChange={ handleChange }
            onFocus={ () => setShowEye(true) }
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
              {t('MinDigitos')}
            </Typography>
          )}
        </div>
        <Input
          crossOrigin={ undefined }
          name="confirmPassword"
          size="lg"
          type={ showPassword ? 'text' : 'password' }
          label={ t('Confirme sua senha') }
          value={ user.confirmPassword }
          disabled={ isDisabled }
          onChange={ handleChange }
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
          {t('Editar')}
        </OrangeButton>
      )}
      { !isDisabled && (
        <OrangeButton
          isLoading={ isLoading }
          onClick={ handleUpdateProfile }
        >
          {t('Salvar')}
        </OrangeButton>
      ) }
    </CoursesBackground>
  );
}

export default Profile;
