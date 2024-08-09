import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Input } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { requestPost, setToken } from '../../services/requests';
import Button from '../../components/Button';
import EyeButton from '../../components/EyeButton';
import OrangeButton from '../../components/OrangeButton';
import WhiteButton from '../../components/WhiteButton';
import LoginBackground from '../../components/LoginBackground';
import FormBackground from '../../components/FormBackground';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/courses');
    }
  }, [navigate]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const { token, user } = await requestPost('/login', { email, password });

      setToken(token);

      localStorage.setItem('token', token);

      localStorage.setItem('role', user.role);

      localStorage.setItem('userId', user.id);

      localStorage.setItem('userEmail', user.email);

      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/courses');
      }
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error);
        setIsLoading(false);
        setMessage(error.response.data.message);
      }
    }
  };

  const handleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    MySwal.fire({
      imageUrl: '/src/assets/reset-password.png',
      title: `${t('Redefinir senha')}`,
      html: (
        <p>
          {t('Insira o email cadastrado em sua conta e')}
          {' '}
          {t('enviaremos um link para redefinir sua senha.')}
        </p>
      ),
      input: 'email',
      inputValue: '',
      inputAutoTrim: true,
      showCancelButton: true,
      confirmButtonText: `${t('Enviar')}`,
      confirmButtonColor: '#e06915',
      cancelButtonText: `${t('Cancelar')}`,
    }).then((result) => {
      if (result.isConfirmed) {
        requestPost('/forgot-password', { email: result.value });
      }
    });
  };

  return (
    <LoginBackground>
      <FormBackground onSubmit={ handleLogin }>
        <h1 className="text-xl md:text-4xl text-btn-orange font-semibold">Entrar</h1>
        <Input
          crossOrigin={ undefined }
          value={ email }
          size="lg"
          type="email"
          onChange={ (e) => setEmail(e.target.value) }
          label={ t('Email') }
        />
        <Input
          value={ password }
          size="lg"
          type={ showPassword ? 'text' : 'password' }
          onChange={ (e) => setPassword(e.target.value) }
          onFocus={ () => setShowEye(true) }
          label={ t('Senha') }
          crossOrigin={ undefined }
          icon={ <EyeButton
            type="button"
            onClick={ (event) => handleShowPassword(event) }
            showEye={ showEye }
            showPassword={ showPassword }
          /> }
        />
        { message && <p className="text-red-500">{ message }</p> }
        <OrangeButton
          type="submit"
          isLoading={ isLoading }
        >
          {t('Entrar')}
        </OrangeButton>
        <Button
          type="button"
          className="self-center underline
          active:text-blue-500 hover:text-blue-700"
          onClick={ handleForgotPassword }
        >
          {t('Esqueceu sua senha?')}
        </Button>
        <p className="self-center">{t('Ainda não tem uma conta?')}</p>
        <WhiteButton
          type="button"
          onClick={ () => navigate('/create-account') }
        >
          {t('Cadastre-se')}
        </WhiteButton>
      </FormBackground>
    </LoginBackground>
  );
}

export default Login;
