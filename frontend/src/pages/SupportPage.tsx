import { useState } from 'react';
import Swal from 'sweetalert2';
import { Input, Textarea } from '@material-tailwind/react';
import CoursesBackground from '../components/CoursesBackground';
import OrangeButton from '../components/OrangeButton';
import { SupportFormType } from '../types/supportType';
import { requestPost } from '../services/requests';

function SupportPage() {
  const INITIAL_FORM = {
    name: '',
    email: '',
    contact: '',
    topic: '',
    content: '',
  };

  const [form, setForm] = useState<SupportFormType>(INITIAL_FORM);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm(INITIAL_FORM);
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
      <form
        onSubmit={ (event) => handleSubmit(event) }
        className="flex flex-col gap-4 align-center justify-center
        lg:w-1/3 lg:h-1/2 self-center text-center bg-white p-4 rounded-md shadow-md"
      >
        <Input
          crossOrigin={ false }
          type="text"
          name="name"
          value={ form.name }
          label="Nome"
          onChange={ (event) => handleChange(event) }
        />

        <Input
          crossOrigin={ false }
          type="text"
          name="email"
          value={ form.email }
          id="email"
          label="Email"
          onChange={ (event) => handleChange(event) }

        />

        <Input
          crossOrigin={ false }
          type="text"
          name="contact"
          value={ form.contact }
          id="cellphone"
          label="Celular (opcional)"
          onChange={ (event) => handleChange(event) }

        />

        <Input
          crossOrigin={ false }
          type="text"
          name="topic"
          value={ form.topic }
          id="topic"
          label="Assunto"
          onChange={ (event) => handleChange(event) }

        />

        <Textarea
          name="content"
          value={ form.content }
          id="subtopic"
          label="Conteúdo"
          onChange={ (event) => handleChange(event) }

        />

        <OrangeButton onClick={ () => handleEmailToSupport(form) }>
          Enviar
        </OrangeButton>
      </form>
    </CoursesBackground>
  );
}

export default SupportPage;
