async function login(email, senha) {
  const { data, error } = await window.supabaseClient.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) {
    alert(error.message);
    return null;
  }

  return data.user;
}

async function logout() {
  await window.supabaseClient.auth.signOut();
  location.reload();
}

async function usuarioLogado() {
  const {
    data: { user }
  } = await window.supabaseClient.auth.getUser();

  return user;
}
