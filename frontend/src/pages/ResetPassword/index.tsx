import { useState, MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoginBackground from '../../components/LoginBackground';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { requestPost } from '../../services/requests';
import { validatePassword } from '../../utils/validations';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [message, setMessage] = useState('');

  const { token } = useParams();
  const navigate = useNavigate();

  const handleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const passwordError = validatePassword(password, confirmPassword);

    if (passwordError) {
      return setMessage(passwordError);
    }

    try {
      const data = await requestPost('/reset-password', { token, password });
      setMessage(data.message);
    } catch (error: any) {
      if (error.isAxiosError) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <LoginBackground>
      <form
        className="flex flex-col bg-white h-[90%] w-1/3 p-14 rounded-md"
      >
        <div>
          <h1
            className="text-4xl
          text-btn-orange mb-3 font-semibold"
          >
            Crie uma nova senha
          </h1>
          <Input
            labelText="Nova senha"
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
        {message === 'Senha alterada com sucesso.'
          ? <p className="text-green-500">{message}</p>
          : <p className="text-red-500">{message}</p>}
        <Button
          className="bg-btn-orange text-white w-2/3
          h-10 self-center my-3 rounded-md font-semibold"
          onClick={ handleResetPassword }
        >
          Cadastrar nova senha
        </Button>
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

export default ResetPassword;
