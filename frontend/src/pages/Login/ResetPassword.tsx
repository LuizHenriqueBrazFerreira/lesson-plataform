import { useState, MouseEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';
import { validatePassword } from '../../utils/validations';
import { requestUpdate } from '../../services/requests';
import LoginBackground from '../../components/LoginBackground';
import FormBackground from '../../components/FormBackground';
import OrangeButton from '../../components/OrangeButton';
import WhiteButton from '../../components/WhiteButton';
import EyeButton from '../../components/EyeButton';
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
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
      <FormBackground onSubmit={ handleResetPassword }>
        <h1
          className="text-xl md:text-4xl
          text-btn-orange mb-3 font-semibold"
        >
          {t("Crie uma nova senha")}
        </h1>
        <Input
          crossOrigin={ undefined }
          value={ password }
          size="lg"
          type={ showPassword ? 'text' : 'password' }
          onChange={ (e) => setPassword(e.target.value) }
          onFocus={ () => setShowEye(true) }
          onBlur={ () => setShowEye(false) }
          label={t("Nova senha")}
          icon={ <EyeButton
            type="button"
            onClick={ (event) => handleShowPassword(event) }
            showEye={ showEye }
            showPassword={ showPassword }
          /> }
        />
        <Input
          crossOrigin={ undefined }
          size="lg"
          label={t("Confirme sua senha")}
          type={ showPassword ? 'text' : 'password' }
          value={ confirmPassword }
          onChange={ (e) => setConfirmPassword(e.target.value) }
        />
        {message === 'Senha alterada com sucesso.'
          ? <p className="text-green-500">{message}</p>
          : <p className="text-red-500">{message}</p>}
        <OrangeButton
          type="submit"
        >
          {t("Cadastrar")}
        </OrangeButton>
        <WhiteButton
          type="button"
          onClick={ () => navigate('/login') }
        >
          {t("Entrar")}
        </WhiteButton>
      </FormBackground>
    </LoginBackground>
  );
}

export default ResetPassword;
