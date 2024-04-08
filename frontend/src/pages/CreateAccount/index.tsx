import { FormEvent, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

// const api = process.env.API_USER || 'http:localhost:3001/users';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error('As senhas não coincidem');
      return;
    }

    if (name === '') {
      console.error('O campo nome é obrigatório');
      return;
    }

    if (email === '') {
      console.error('O campo e-mail é obrigatório');
      return;
    }

    try {
      const response = await fetch('http:localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      console.log(response);
      const data = await response.json();
      console.log(data); // Aqui você pode fazer algo com a resposta, como redirecionar o usuário para a próxima página
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-bg-image-login bg-cover w-screen h-[75vh]">
      <div className="bg-bg-login w-full h-full flex justify-center items-center">
        <form
          onSubmit={ handleRegister }
          className="flex flex-col justify-evenly bg-white w-1/3 p-14 rounded-md"
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
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
            className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
          />
          <Input
            labelText="Senha"
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
            className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
          />
          <Input
            labelText="Confirme sua senha"
            value={ confirmPassword }
            onChange={ (event) => setConfirmPassword(event.target.value) }
            className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
          />
          <Button
            className="bg-btn-orange text-white w-2/3 h-10 self-center my-3 rounded-md"
          >
            Cadastrar
          </Button>
          <p className="self-center">Já possui uma conta?</p>
          <Button
            className="bg-white border-solid border-2
            border-btn-orange text-btn-orange w-2/3 h-10 self-center my-3 rounded-md"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
