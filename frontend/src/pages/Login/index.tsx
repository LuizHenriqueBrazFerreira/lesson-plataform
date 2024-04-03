import Button from '../../components/Button';
import Input from '../../components/Input';

function Login() {
  return (
    <>
      <div>
        <h1>Login</h1>
        <form>
          <Input labelText="E-mail" />
          <Input labelText="Senha" />
          <Button>Entrar</Button>
          <a href=''>Esqueceu sua senha?</a>
          <p>Ainda não tem uma conta?</p>
          <Button>Cadastre-se</Button>
        </form>
      </div>
    </>
  );
}

export default Login;