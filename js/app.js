document.addEventListener("DOMContentLoaded", async () => {
  const loginBox = document.getElementById("login");
  const app = document.getElementById("app");
  const formLogin = document.getElementById("formLogin");
  const emailLogin = document.getElementById("emailLogin");
  const senhaLogin = document.getElementById("senhaLogin");
  const btnEntrar = document.getElementById("btnEntrar");
  const btnSair = document.getElementById("btnSair");
  const msgLogin = document.getElementById("msgLogin");

  async function atualizarTela() {
    const {
      data: { session },
      error
    } = await window.supabaseClient.auth.getSession();

    if (error) {
      msgLogin.textContent = "Erro ao verificar sessão.";
      return;
    }

    if (session) {
      loginBox.style.display = "none";
      app.style.display = "block";
    } else {
      loginBox.style.display = "block";
      app.style.display = "none";
    }
  }

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    msgLogin.textContent = "";
    btnEntrar.disabled = true;
    btnEntrar.textContent = "Entrando...";

    const { error } = await window.supabaseClient.auth.signInWithPassword({
      email: emailLogin.value.trim(),
      password: senhaLogin.value
    });

    if (error) {
      msgLogin.textContent = "E-mail ou senha inválidos.";
      btnEntrar.disabled = false;
      btnEntrar.textContent = "Entrar";
      return;
    }

    await atualizarTela();

    btnEntrar.disabled = false;
    btnEntrar.textContent = "Entrar";
  });

  btnSair.addEventListener("click", async () => {
    await window.supabaseClient.auth.signOut();
    await atualizarTela();
  });

  window.supabaseClient.auth.onAuthStateChange(() => {
    atualizarTela();
  });

  await atualizarTela();
});
