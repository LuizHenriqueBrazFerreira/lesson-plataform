import { MouseEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { requestLogin, setToken } from '../../services/requests';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const data = await requestLogin('/login', { email, password });

      const { token } = data;

      setToken(token);

      localStorage.setItem('token', token);

      setIsLogged(true);
    } catch (error) {
      console.log(error);

      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);

  if (isLogged) return <Navigate to="/" />;

  return (
    <div className="bg-bg-image-login bg-cover w-screen h-[75vh]">
      <div className="bg-bg-login w-full h-full flex justify-center items-center">
        <form
          className="flex flex-col justify-evenly bg-white h-[90%] w-1/3 p-14 rounded-md"
        >
          <h1 className="text-4xl text-btn-orange">Entrar</h1>
          <Input
            labelText="E-mail"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
          />
          <Input
            labelText="Senha"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
          />
          {
            (failedTryLogin)
              ? (
                <p>
                  {
                    `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                  }
                </p>
              )
              : null
          }
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
            className="bg-white border-solid border-2
            border-btn-orange text-btn-orange w-2/3 h-10 self-center rounded-md"
          >
            Cadastre-se
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
