import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '../../components/Button';
import OrangeButton from '../../components/OrangeButton';
import WhiteButton from '../../components/WhiteButton';
import GreyInput from '../../components/GreyInput';
import { requestPost, setToken } from '../../services/requests';
import LoginBackground from '../../components/LoginBackground';
import FormBackground from '../../components/FormBackground';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [message, setMessage] = useState('');

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const { token, role } = await requestPost('/login', { email, password });

      setToken(token);

      localStorage.setItem('token', token);

      localStorage.setItem('role', role);

      if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/courses');
      }
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error.response);
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
      title: 'Redefinir senha',
      html: (
        <p>
          Insira o email cadastrado em sua conta e
          {' '}
          enviaremos um link para redefinir sua senha.
        </p>
      ),
      input: 'email',
      inputValue: '',
      inputAutoTrim: true,
      width: '30%',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      confirmButtonColor: '#e06915',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        requestPost('/forgot-password', { email: result.value });
      }
    });
  };

  return (
    <LoginBackground>
      <FormBackground moreClasses="justify-evenly text-xs lg:text-base">
        <h1 className="text-xl lg:text-4xl text-btn-orange font-semibold">Entrar</h1>
        <GreyInput
          labelText="Email"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <div>
          <GreyInput
            labelText="Senha"
            type={ showPassword ? 'text' : 'password' }
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            onFocus={ () => setShowEye(true) }
          />
          <Button
            className="w-[2rem] absolute z-[100]
            translate-x-[-2.5rem] translate-y-[1rem]"
            onClick={ (e) => handleShowPassword(e) }
          >
            {showEye ? (
              <img
                className="opacity-30"
                src={ showPassword ? '/src/assets/eye.svg' : '/src/assets/eye-slash.svg' }
                alt="show password"
              />
            ) : ''}
          </Button>
        </div>
        { message && <p className="text-red-500">{ message }</p> }
        <OrangeButton
          onClick={ (event) => handleLogin(event) }
          type="submit"
        >
          Entrar
        </OrangeButton>
        <Button
          className="self-center underline"
          onClick={ handleForgotPassword }
        >
          Esqueceu sua senha?
        </Button>
        <p className="self-center">Ainda não tem uma conta?</p>
        <WhiteButton
          onClick={ () => navigate('/create-account') }
        >
          Cadastre-se
        </WhiteButton>
      </FormBackground>
    </LoginBackground>
  );
}

export default Login;
