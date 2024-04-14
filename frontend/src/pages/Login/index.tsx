import { FormEvent, useState } from 'react';
import axios from 'axios';
import Button from '../../components/Button';
import Input from '../../components/Input';

const apiUser = import.meta.env.VITE_REACT_API_LOGIN || 'http://localhost:3001/login';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(apiUser, { email, password });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-bg-image-login bg-cover w-screen h-[75vh]">
      <div className="bg-bg-login w-full h-full flex justify-center items-center">
        <form
          onSubmit={ handleLogin }
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
          <Button
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
