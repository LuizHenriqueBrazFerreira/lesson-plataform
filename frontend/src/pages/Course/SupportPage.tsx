import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Input, Textarea } from '@material-tailwind/react';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import CoursesBackground from '../../components/CoursesBackground';
import OrangeButton from '../../components/OrangeButton';
import { SupportFormType } from '../../types/supportType';
import { requestPost } from '../../services/requests';

const INITIAL_FORM = {
  name: '',
  email: '',
  contact: '',
  topic: '',
  content: '',
};

function SupportPage() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<SupportFormType>(INITIAL_FORM);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `EduActiva - ${t("Suporte")}`;
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm(INITIAL_FORM);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ensinofsmsss@gmail.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleEmailToSupport = async (data: SupportFormType) => {
    try {
      const dataDB = await requestPost('/support', data);
      if (dataDB.message === 'E-mail enviado com sucesso.') {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'E-mail enviado com sucesso.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao enviar e-mail.',
      });
    }
  };

  return (
    <CoursesBackground>
      <h1
        className="text-xl md:text-4xl
            text-btn-orange font-bold mb-10"
      >
        {t('Suporte')}
      </h1>
      <form
        onSubmit={ (event) => handleSubmit(event) }
        className="flex flex-col gap-4 self-center md:w-1/2 md:h-1/2"
      >
        <h2
          className="text-xl md:text-2xl
            text-btn-orange font-semibold"
        >
          {t('Envie sua mensagem')}
        </h2>
        <div className="flex gap-3 font-semibold">
          <p>{t('ou clique aqui para copiar o email:')}</p>
          <button
            type="button"
            className={ `${copied ? 'text-black' : 'text-btn-orange'} 
              hover:underline flex gap-1` }
            onClick={ handleCopyEmail }
          >
            { copied ? <CheckIcon className="w-5 h-5" />
              : <ClipboardIcon className="w-5 h-5" />}
            { copied ? `${t('Copiado!')}` : `${t('Copiar')}`}
          </button>
        </div>
        <Input
          crossOrigin={ undefined }
          size="lg"
          type="text"
          name="name"
          value={ form.name }
          label={ t('Nome') }
          onChange={ (event) => handleChange(event) }
        />

        <Input
          crossOrigin={ undefined }
          size="lg"
          type="text"
          name="email"
          value={ form.email }
          id="email"
          label={ t('Email') }
          onChange={ (event) => handleChange(event) }

        />

        <Input
          crossOrigin={ undefined }
          size="lg"
          type="text"
          name="contact"
          value={ form.contact }
          id="cellphone"
          label={ t('Celular (opcional)') }
          onChange={ (event) => handleChange(event) }

        />

        <Input
          crossOrigin={ undefined }
          size="lg"
          type="text"
          name="topic"
          value={ form.topic }
          id="topic"
          label={ t('Assunto') }
          onChange={ (event) => handleChange(event) }

        />

        <Textarea
          size="lg"
          name="content"
          value={ form.content }
          id="subtopic"
          label={ t('Conteúdo') }
          onChange={ (event) => handleChange(event) }

        />

        <OrangeButton onClick={ () => handleEmailToSupport(form) }>
          {t('Enviar')}
        </OrangeButton>
      </form>
    </CoursesBackground>
  );
}

export default SupportPage;
