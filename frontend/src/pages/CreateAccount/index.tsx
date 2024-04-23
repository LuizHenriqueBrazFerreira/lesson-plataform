import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { requestPost } from '../../services/requests';
import EyeButton from '../../components/EyeButton';
import OrangeButton from '../../components/OrangeButton';
import WhiteButton from '../../components/WhiteButton';
import GreyInput from '../../components/GreyInput';
import LoginBackground from '../../components/LoginBackground';
import FormBackground from '../../components/FormBackground';

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

  const handleRegister = async (event: MouseEvent<HTMLButtonElement>) => {
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
      <FormBackground moreClasses="justify-evenly text-xs lg:text-base">
        <h1
          className="text-xl lg:text-4xl text-btn-orange mb-3 font-semibold"
        >
          Cadastre-se
        </h1>
        <GreyInput
          labelText="Nome Completo"
          value={ name }
          onChange={ (event) => setName(event.target.value) }
        />
        <GreyInput
          labelText="Email"
          type="email"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
        />
        <div>
          <GreyInput
            labelText="Senha"
            type={ showPassword ? 'text' : 'password' }
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            onFocus={ () => setShowEye(true) }
          />
          <EyeButton
            onClick={ (event) => handleShowPassword(event) }
            showEye={ showEye }
            showPassword={ showPassword }
          />
        </div>
        <GreyInput
          labelText="Confirme sua senha"
          type={ showPassword ? 'text' : 'password' }
          value={ confirmPassword }
          onChange={ (e) => setConfirmPassword(e.target.value) }
        />
        { message === 'E-mail reenviado com sucesso.'
        || message === 'Usuário criado com sucesso.'
          ? <p className="text-green-500">{ message }</p>
          : <p className="text-red-500">{ message }</p>}
        <OrangeButton
          onClick={ (event) => handleRegister(event) }
        >
          Cadastrar
        </OrangeButton>
        <p className="self-center">Já possui uma conta?</p>
        <WhiteButton
          onClick={ () => navigate('/login') }
        >
          Entrar
        </WhiteButton>
      </FormBackground>
    </LoginBackground>
  );
}

export default CreateAccount;
