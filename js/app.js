document.addEventListener("DOMContentLoaded", async () => {
  console.log("Central CCO V3 iniciada.");

  const { data, error } = await window.supabaseClient.auth.getSession();

  if (error) {
    console.error("Erro ao verificar sessão:", error);
    return;
  }

  if (!data.session) {
    console.log("Usuário ainda não está logado.");
    return;
  }

  const { data: usuario, error: usuarioError } = await window.supabaseClient
    .from("usuarios")
    .select("id, email, nome, matricula, perfil, status")
    .eq("id", data.session.user.id)
    .single();

  if (usuarioError) {
    console.error("Erro ao carregar usuário:", usuarioError);
    return;
  }

  console.log("Usuário conectado:", usuario);
});
