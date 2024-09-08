import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Typography } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useTranslation } from 'react-i18next';
import { requestPost } from '../../services/requests';
import EyeButton from '../../components/EyeButton';
import OrangeButton from '../../components/OrangeButton';
import WhiteButton from '../../components/WhiteButton';
import WarnigIcon from '../../components/WarningIcon';
import LoginBackground from '../../components/LoginBackground';
import FormBackground from '../../components/FormBackground';
import { UserType, initialUserState } from '../../types/userTypes';

function CreateAccount() {
  const [user, setUser] = useState<UserType>(initialUserState);
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'EduActiva - Cadastro';
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/courses');
    }
  }, [navigate]);

  const handleChange = (event: any) => {
    event.preventDefault();

    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleResendEmail = async () => {
    try {
      const data = await requestPost('/resend-email', { email: user.email });

      setMessage(data.message);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      return setMessage('As senhas não coincidem');
    }

    try {
      setIsLoading(true);

      const data = await requestPost('/create-account', { name: user.name,
        email: user.email,
        password: user.password,
        country: user.country,
        organization: user.organization,
        role: 'STUDENT' });

      setMessage(data.message);
      if (data.message === 'Usuário criado com sucesso.') {
        MySwal.fire({
          imageUrl: '/src/assets/email.png',
          title: 'Clique no link em seu e-mail!',
          html:
  <p>
    Clique no link que enviamos para
    <strong>
      {' '}
      {user.email}
    </strong>
    {' '}
    para verificar sua conta. Se não receber um email dentro de 15 minutos,
    cheque sua caixa de spam ou tente
    {' '}
    <button
      className="underline hover:text-blue-500 active:text-black"
      onClick={ handleResendEmail }
    >
      reenviar o email.
    </button>
  </p>,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEnterKey: false,
          showCloseButton: true,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      if (error.isAxiosError) {
        setIsLoading(false);
        setMessage(error.response.data.message);
      } else {
        console.log('Erro desconhecido:', error);
      }
    }
  };

  const handleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <LoginBackground>
      <FormBackground onSubmit={ handleRegister }>
        <h1
          className="text-xl md:text-4xl text-btn-orange mb-3 font-semibold"
        >
          {t('Cadastre-se')}
        </h1>
        <Input
          crossOrigin={ undefined }
          name="name"
          value={ user.name }
          size="lg"
          type="text"
          onChange={ handleChange }
          label={ t('Nome Completo') }
        />
        <Input
          crossOrigin={ undefined }
          name="email"
          value={ user.email }
          size="lg"
          type="email"
          onChange={ handleChange }
          label={ t('Email') }
        />
        <Input
          crossOrigin={ undefined }
          name="country"
          value={ user.country }
          size="lg"
          type="text"
          onChange={ handleChange }
          label={ t('Pais') }
        />
        <Input
          crossOrigin={ undefined }
          name="organization"
          value={ user.organization }
          size="lg"
          type="text"
          onChange={ handleChange }
          label={ t('Organizacao opcional') }
        />
        <div>
          <Input
            crossOrigin={ undefined }
            name="password"
            value={ user.password }
            size="lg"
            type={ showPassword ? 'text' : 'password' }
            onChange={ handleChange }
            onFocus={ () => setShowEye(true) }
            label={ t('Senha') }
            icon={ <EyeButton
              type="button"
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
          value={ user.confirmPassword }
          size="lg"
          type={ showPassword ? 'text' : 'password' }
          onChange={ handleChange }
          label={ t('Confirme sua senha') }
        />
        { message === 'E-mail reenviado com sucesso.'
        || message === 'Usuário criado com sucesso.'
          ? <p className="text-green-500">{ message }</p>
          : <p className="text-red-500">{ message }</p>}
        <OrangeButton
          type="submit"
          isLoading={ isLoading }
        >
          {t('Cadastrar')}
        </OrangeButton>
        <p className="self-center">{t('Ja possui conta?')}</p>
        <WhiteButton
          type="button"
          onClick={ () => navigate('/login') }
        >
          {t('Entrar')}
        </WhiteButton>
      </FormBackground>
    </LoginBackground>
  );
}

export default CreateAccount;
