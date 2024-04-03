import Button from '../../components/Button';
import Input from '../../components/Input';

function CreateAccount() {
  return (
    <>
      <div>
        <h1>Cadastre-se</h1>
        <form>
          <Input labelText="Nome Completo" />
          <Input labelText="E-mail" />
          <Input labelText="Senha" />
          <Input labelText="Confirme sua senha" />
          <Button>Cadastrar</Button>
          <p>Já possui uma conta?</p>
          <Button>Entrar</Button>
        </form>
      </div>
    </>
  );
}

export default CreateAccount;