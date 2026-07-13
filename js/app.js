document.addEventListener("DOMContentLoaded", async () => {
    console.log("Central CCO V3 iniciada.");

    const { data, error } = await window.supabaseClient.auth.getSession();

    if (error) {
        console.error(error);
        return;
    }

    console.log("Sessão:", data.session);
});
