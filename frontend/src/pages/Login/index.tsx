import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { requestLogin, setToken } from '../../services/requests';
import LoginBackground from '../../components/LoginBackground';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const login = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const data = await requestLogin('/login', { email, password });

      const { token, role } = data;

      console.log(data);

      setToken(token);

      localStorage.setItem('token', token);

      localStorage.setItem('role', role);

      if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
    setMessage('');
  }, [navigate]);

  return (
    <LoginBackground>
      <form
        className="flex flex-col justify-evenly bg-white h-[90%] w-1/3 p-14 rounded-md"
      >
        <h1 className="text-4xl text-btn-orange">Entrar</h1>
        <Input
          labelText="E-mail"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
        />
        <div>
          <Input
            labelText="Senha"
            type={ showPassword ? 'text' : 'password' }
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
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
          className="bg-btn-orange text-white w-2/3 h-10 self-center rounded-md"
        >
          Entrar
        </Button>
        <a href="a" className="self-center underline">Esqueceu sua senha?</a>
        <p className="self-center">Ainda não tem uma conta?</p>
        <Button
          onClick={ () => navigate('/create-account') }
          className="bg-white border-solid border-2
            border-btn-orange text-btn-orange w-2/3 h-10 self-center rounded-md"
        >
          Cadastre-se
        </Button>
      </form>
    </LoginBackground>
  );
}

export default Login;
