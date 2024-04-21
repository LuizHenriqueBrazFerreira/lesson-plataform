import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { requestPost, setToken } from '../../services/requests';
import LoginBackground from '../../components/LoginBackground';

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

  const login = async (event: MouseEvent<HTMLButtonElement>) => {
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
      console.log(error);

      setMessage(error.response.data.message);
    }
  };

  const handleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    MySwal.fire({
      title: 'Redefinir senha',
      html: (
        <div>
          <p>
            Insira o email cadastrado em sua conta e
            {' '}
            enviaremos um link para redefinir sua senha.
          </p>
          <Input
            labelText=""
            type="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
          />
        </div>
      ),
      width: '30%',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        requestPost('/forgot-password', { email });
      }
    });
  };

  return (
    <LoginBackground>
      <form
        className="flex flex-col justify-evenly bg-white h-[90%]
        w-1/3 p-14 rounded-md"
      >
        <h1 className="text-4xl text-btn-orange font-semibold">Entrar</h1>
        <Input
          labelText="Email"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3 text-xl"
        />
        <div>
          <Input
            labelText="Senha"
            type={ showPassword ? 'text' : 'password' }
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3 text-xl"
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
        <Button
          onClick={ (event) => login(event) }
          type="submit"
          className="bg-btn-orange text-white
          w-2/3 h-10 self-center rounded-md font-semibold"
        >
          Entrar
        </Button>
        <Button
          className="self-center underline"
          onClick={ handleForgotPassword }
        >
          Esqueceu sua senha?
        </Button>
        <p className="self-center">Ainda não tem uma conta?</p>
        <Button
          onClick={ () => navigate('/create-account') }
          className="bg-white border-solid border-2
            border-btn-orange text-btn-orange
            w-2/3 h-10 self-center rounded-md font-semibold"
        >
          Cadastre-se
        </Button>
      </form>
    </LoginBackground>
  );
}

export default Login;
