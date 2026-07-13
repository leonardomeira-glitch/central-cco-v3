document.addEventListener("DOMContentLoaded", async () => {
  const loginBox = document.getElementById("login");
  const app = document.getElementById("app");
  const formLogin = document.getElementById("formLogin");
  const emailLogin = document.getElementById("emailLogin");
  const senhaLogin = document.getElementById("senhaLogin");
  const btnEntrar = document.getElementById("btnEntrar");
  const msgLogin = document.getElementById("msgLogin");

  async function atualizarTela() {
    const {
      data: { session },
      error
    } = await window.supabaseClient.auth.getSession();

    if (error) {
      console.error(error);
      msgLogin.textContent = "Erro ao verificar sessão.";
      return;
    }

    if (!session) {
      loginBox.style.display = "block";
      app.style.display = "none";
      return;
    }

    const { data: usuario, error: usuarioError } =
      await window.supabaseClient
        .from("usuarios")
        .select("nome, email, matricula, perfil, status")
        .eq("id", session.user.id)
        .single();

    if (usuarioError || !usuario) {
      console.error(usuarioError);
      await window.supabaseClient.auth.signOut();

      msgLogin.textContent = "Erro ao carregar o perfil do usuário.";
      loginBox.style.display = "block";
      app.style.display = "none";
      return;
    }

    if (usuario.status !== "ATIVO") {
      await window.supabaseClient.auth.signOut();

      msgLogin.textContent = "Usuário inativo.";
      loginBox.style.display = "block";
      app.style.display = "none";
      return;
    }

    window.usuarioAtual = usuario;

    loginBox.style.display = "none";
    app.style.display = "block";

    if (
      window.dashboard &&
      typeof window.dashboard.iniciar === "function"
    ) {
      window.dashboard.iniciar();
    } else {
      console.error("Dashboard não foi carregado.");
    }
  }

  if (formLogin) {
    formLogin.addEventListener("submit", async (event) => {
      event.preventDefault();

      msgLogin.textContent = "";
      btnEntrar.disabled = true;
      btnEntrar.textContent = "Entrando...";

      const { error } =
        await window.supabaseClient.auth.signInWithPassword({
          email: emailLogin.value.trim(),
          password: senhaLogin.value
        });

      if (error) {
        msgLogin.textContent = "E-mail ou senha inválidos.";
        btnEntrar.disabled = false;
        btnEntrar.textContent = "Entrar";
        return;
      }

      btnEntrar.disabled = false;
      btnEntrar.textContent = "Entrar";

      await atualizarTela();
    });
  }

  window.supabaseClient.auth.onAuthStateChange(() => {
    atualizarTela();
  });

  await atualizarTela();
});
