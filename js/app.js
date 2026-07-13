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
  const { data: usuario, error: usuarioError } = await window.supabaseClient
    .from("usuarios")
    .select("nome, email, matricula, perfil, status")
    .eq("id", session.user.id)
    .single();

  if (usuarioError) {
    msgLogin.textContent = "Erro ao carregar o perfil do usuário.";
    await window.supabaseClient.auth.signOut();
    loginBox.style.display = "block";
    app.style.display = "none";
    return;
  }

  if (usuario.status !== "ATIVO") {
    msgLogin.textContent = "Usuário inativo.";
    await window.supabaseClient.auth.signOut();
    loginBox.style.display = "block";
    app.style.display = "none";
    return;
  }

  window.usuarioAtual = usuario;

  document.querySelector("#app h1").textContent =
    `Central CCO V3 — ${usuario.nome}`;

  document.querySelector("#app p").textContent =
    `Perfil: ${usuario.perfil}`;

  loginBox.style.display = "none";
app.style.display = "block";

window.dashboard.iniciar();
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
