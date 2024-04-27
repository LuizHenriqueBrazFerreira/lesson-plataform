const validatePassword = (password: string, confirmPassword: string) => {
  if (!password || !confirmPassword) {
    return 'Todos os campos devem estar preenchidos.';
  }

  if (password !== confirmPassword) {
    return 'As senhas não coincidem.';
  }

  if (password.length < 8) {
    return 'A senha deve ter pelo menos 8 caracteres.';
  }

  return null;
};

export { validatePassword };
