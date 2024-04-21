import { FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LoginBackground from '../../components/LoginBackground';
import { requestPost } from '../../services/requests';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [message, setMessage] = useState('');

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const handleResendEmail = async () => {
    try {
      const data = await requestPost('/resend-email', { email });

      setMessage(data.message);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return setMessage('As senhas não coincidem');
    }

    try {
      const data = await requestPost('/create-account', { name,
        email,
        password,
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
      {email}
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
          width: '40%',
        });
      }
    } catch (error: any) {
      if (error.isAxiosError) {
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
      <form
        onSubmit={ handleRegister }
        className="flex flex-col justify-evenly bg-white w-1/3 p-14 rounded-md h-[90%]"
      >
        <h1 className="text-4xl text-btn-orange mb-3 font-semibold">Cadastre-se</h1>
        <Input
          labelText="Nome Completo"
          value={ name }
          onChange={ (event) => setName(event.target.value) }
          className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
        />
        <Input
          labelText="Email"
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
        <Input
          labelText="Confirme sua senha"
          type={ showPassword ? 'text' : 'password' }
          value={ confirmPassword }
          onChange={ (e) => setConfirmPassword(e.target.value) }
          className="bg-neutral-200 rounded-md w-full h-10 p-2 my-3"
        />
        { message === 'E-mail reenviado com sucesso.'
        || message === 'Usuário criado com sucesso.'
          ? <p className="text-green-500">{ message }</p>
          : <p className="text-red-500">{ message }</p>}
        <Button
          className="bg-btn-orange text-white
          w-2/3 h-10 self-center my-3 rounded-md font-semibold"
        >
          Cadastrar
        </Button>
        <p className="self-center">Já possui uma conta?</p>
        <Button
          onClick={ () => navigate('/login') }
          className="bg-white border-solid border-2
            border-btn-orange text-btn-orange
            w-2/3 h-10 self-center my-3 rounded-md font-semibold"
        >
          Entrar
        </Button>
      </form>
    </LoginBackground>
  );
}

export default CreateAccount;
