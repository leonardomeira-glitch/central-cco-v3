document.addEventListener("DOMContentLoaded", async () => {

    console.log("Central CCO V3 iniciada.");

    const { data: sessionData } = await window.supabaseClient.auth.getSession();

    console.log("Sessão:", sessionData);

    const { data, error } = await window.supabaseClient
        .from("usuarios")
        .select("*");

    console.log("Usuários:", data);

    if (error) {
        console.error(error);
    }

});
