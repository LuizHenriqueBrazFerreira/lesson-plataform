import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoginBackground from '../../components/LoginBackground';
import { requestUpdate } from '../../services/requests';

function ConfirmEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const data = await requestUpdate('/confirm', { token });

        setMessage(data.message);
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } catch (error: any) {
        if (error.isAxiosError) {
          console.log(error.response);
        }
      }
    };
    confirmEmail();
  }, [token, navigate]);

  return (
    <LoginBackground>
      <div className="bg-white h-[90%] w-2/3 p-14 rounded-lg text-center">
        <h1 className="text-4xl">Obrigado por confirmar seu email!</h1>
        {message && <p>{message}</p>}
      </div>
    </LoginBackground>
  );
}

export default ConfirmEmail;
