import { useState, MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoginBackground from '../../components/LoginBackground';
import FormBackground from '../../components/FormBackground';
import Button from '../../components/Button';
import OrangeButton from '../../components/OrangeButton';
import WhiteButton from '../../components/WhiteButton';
import GreyInput from '../../components/GreyInput';
import { requestUpdate } from '../../services/requests';
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
      const data = await requestUpdate('/reset-password', { token, password });
      setMessage(data.message);
    } catch (error: any) {
      if (error.isAxiosError) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <LoginBackground>
      <FormBackground moreClasses="text-xs lg:text-base">
        <div>
          <h1
            className="text-xl lg:text-4xl
          text-btn-orange mb-3 font-semibold"
          >
            Crie uma nova senha
          </h1>
          <GreyInput
            labelText="Nova senha"
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
        <GreyInput
          labelText="Confirme sua senha"
          type={ showPassword ? 'text' : 'password' }
          value={ confirmPassword }
          onChange={ (e) => setConfirmPassword(e.target.value) }
        />
        {message === 'Senha alterada com sucesso.'
          ? <p className="text-green-500">{message}</p>
          : <p className="text-red-500">{message}</p>}
        <OrangeButton
          onClick={ handleResetPassword }
        >
          Cadastrar
        </OrangeButton>
        <WhiteButton
          onClick={ () => navigate('/login') }
        >
          Entrar
        </WhiteButton>
      </FormBackground>
    </LoginBackground>
  );
}

export default ResetPassword;
