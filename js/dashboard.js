window.dashboard = {

    iniciar() {

        const app = document.getElementById("app");

        app.innerHTML = `

        <header class="topo">

            <h2>Central de Acessos CCO</h2>

            <div>

                <strong>${window.usuarioAtual.nome}</strong><br>

                ${window.usuarioAtual.perfil}

            </div>

        </header>

        <main id="conteudo">

            <h3>Bem-vindo</h3>

            <p>Sistema iniciado com sucesso.</p>

        </main>

        <footer>

            <button id="btnSairSistema">
                Sair
            </button>

        </footer>

        `;

        document
            .getElementById("btnSairSistema")
            .onclick = logout;

    }

};
