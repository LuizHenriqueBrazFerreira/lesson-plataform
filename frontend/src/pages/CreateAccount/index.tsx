import Button from '../../components/Button';
import Input from '../../components/Input';

function CreateAccount() {
  return (
    <>
      <div className='flex flex-col bg-red-600 w-screen h-[60vh] justify-center items-center'>
      <form className='flex flex-col bg-white h-4/5 w-1/4 p-14 rounded-xl'>
        <h1 className='text-btn-orange'>Cadastre-se</h1>
          <Input labelText="Nome Completo" />
          <Input labelText="E-mail" />
          <Input labelText="Senha" />
          <Input labelText="Confirme sua senha" />
          <Button className='bg-btn-orange text-white'>Cadastrar</Button>
          <p>Já possui uma conta?</p>
          <Button className='bg-white border-solid border-2 border-btn-orange text-btn-orange'>Entrar</Button>
        </form>
      </div>
    </>
  );
}

export default CreateAccount;