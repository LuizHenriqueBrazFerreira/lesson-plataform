import { FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LoginBackground from '../../components/LoginBackground';

const apiUser = import.meta.env.VITE_REACT_API_USER || 'http://localhost:3001/create-account';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem');
      return;
    }

    try {
      const response = await axios.post(apiUser, { name,
        email,
        password,
        role: 'STUDENT' });

      const { data } = response;

      setMessage(data.message);
      // navigate('/');
    } catch (error: any) {
      // Verifique se o erro é um AxiosError
      if (error.isAxiosError) {
        setMessage(error.response.data.message);
      } else {
        // Caso contrário, logue o erro como está
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
      <form
        onSubmit={ handleRegister }
        className="flex flex-col justify-evenly bg-white w-1/3 p-14 rounded-md h-[90%]"
      >
        <h1 className="text-4xl text-btn-orange mb-3">Cadastre-se</h1>
        <Input
          labelText="Nome Completo"
          value={ name }
          onChange={ (event) => setName(event.target.value) }
          className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
        />
        <Input
          labelText="E-mail"
          type="email"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
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
            className="w-[3rem] absolute z-[100]
            translate-x-[-3.5rem] translate-y-[0.5rem]"
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
        <Input
          labelText="Confirme sua senha"
          type={ showPassword ? 'text' : 'password' }
          value={ confirmPassword }
          onChange={ (e) => setConfirmPassword(e.target.value) }
          className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
          onFocus={ () => setShowEye(true) }
        />
        { message && message === 'Usuário criado com sucesso.' ? (
          <p className="text-green-500">{ message }</p>) : (
            <p className="text-red-500">{ message }</p>
        )}
        <Button
          className="bg-btn-orange text-white w-2/3 h-10 self-center my-3 rounded-md"
        >
          Cadastrar
        </Button>
        <p className="self-center">Já possui uma conta?</p>
        <Button
          onClick={ () => navigate('/login') }
          className="bg-white border-solid border-2
            border-btn-orange text-btn-orange w-2/3 h-10 self-center my-3 rounded-md"
        >
          Entrar
        </Button>
      </form>
    </LoginBackground>
  );
}

export default CreateAccount;
