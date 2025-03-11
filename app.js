function inicializarApp() {
    const listaNomes = [];
    const quantidadeLimite = 50;
    let tipoSorteioAtivo = '';
    let currentIndex = 0; // Índice do QR code atual
    let qrCodes = []; // Array para armazenar QR codes gerados

    console.log(`Limite da lista: ${quantidadeLimite}`);

    function selecionaAmigoSecreto() {
        tipoSorteioAtivo = 'amigoSecreto';
        atualizarEstadoBotoes();
    }

    function selecionaSorteador() {
        tipoSorteioAtivo = 'sorteador';
        atualizarEstadoBotoes();
    }

    function atualizarEstadoBotoes() {
        const amigoInput = document.querySelector("#amigo");
        const [amigoSecretoButton, sorteadorButton] = document.querySelectorAll(".button-ativarAmigoSecretoEsorteador");

        // Habilita/desabilita inputs e botões
        amigoInput.disabled = tipoSorteioAtivo === '';

        // Atualiza as classes para indicar qual botão está ativo
        amigoSecretoButton.classList.toggle('active', tipoSorteioAtivo === 'amigoSecreto');
        sorteadorButton.classList.toggle('active', tipoSorteioAtivo === 'sorteador');
    }

    function verificarTipoSorteio() {
        if (tipoSorteioAtivo === '') {
            alert("Selecione um tipo de sorteio antes de continuar.");
            return false; // Retorna falso se nenhum tipo de sorteio estiver selecionado
        }
        return true; // Retorna verdadeiro se um tipo de sorteio estiver selecionado
    }

    function adicionarAmigo() {
        if (!verificarTipoSorteio()) return;
        const nomeAmigo = document.querySelector("#amigo").value.trim();

        if (nomeAmigo === "") {
            alert("Digite um nome para adicionar.");
            return;
        } else if (listaNomes.includes(nomeAmigo)) {
            alert("Este nome já foi adicionado.");
            return;
        } else if (listaNomes.length >= quantidadeLimite) {
            alert(`Limite de ${quantidadeLimite} amigos atingido. Não é possível adicionar mais.`);
            return;
        }

        listaNomes.push(nomeAmigo);
        atualizarLista();
        document.getElementById("amigo").value = "";
        console.log(`Nomes na lista: ${listaNomes}`);
    }

    function atualizarLista() {
        const lista = document.getElementById("listaAmigos");
        lista.innerHTML = "";

        listaNomes.forEach((nome, index) => {
            const li = document.createElement("li");
            li.textContent = nome;

            const removeIcon = document.createElement("span");
            removeIcon.textContent = "✖";
            removeIcon.style.cursor = "pointer";
            removeIcon.style.marginLeft = "10px";
            removeIcon.onclick = () => removerAmigo(index);

            li.appendChild(removeIcon);
            lista.appendChild(li);
        });
    }

    function removerAmigo(index) {
        listaNomes.splice(index, 1);
        atualizarLista();
        console.log(`Nome removido. Lista atualizada: ${listaNomes}`);
    }

    function sortearAmigo() {
        if (!verificarTipoSorteio()) return;

        if (tipoSorteioAtivo === 'sorteador') {
            if (listaNomes.length === 0) {
                alert("Adicione nomes antes de sortear.");
                return;
            }

            const indiceSorteado = Math.floor(Math.random() * listaNomes.length);
            const resultadoSorteio = listaNomes.splice(indiceSorteado, 1)[0];

            atualizarLista();
            document.getElementById("resultado").textContent = `${resultadoSorteio}!`;
            console.log(`Nome sorteado: ${resultadoSorteio}!`);

            ocultarElementos();
            return resultadoSorteio;
        } else if (tipoSorteioAtivo === 'amigoSecreto') {
            if (listaNomes.length === 0) {
                alert("Adicione nomes antes de sortear.");
                return;
            }
            gerarQRCodes();
            document.querySelector(".button-sortear-amigo").disabled = true; // Desabilita o botão "Sortear amigo"
            ocultarElementos();
        }
    }

    function gerarQRCodes() {
        qrCodes = [];
        document.getElementById("qrCode").innerHTML = '';

        const amigosRestantes = [...listaNomes];
        const baseUrl = "https://luizadaso.github.io/Projeto-Challenge-Amigo-Secreto/";

        listaNomes.forEach(nome => {
            const indiceAleatorio = Math.floor(Math.random() * amigosRestantes.length);
            const amigoAleatorio = amigosRestantes.splice(indiceAleatorio, 1)[0];
            const encodedName = btoa(amigoAleatorio); // Codifica o nome em base64
            const link = `${baseUrl}?amigo=${encodedName}`;

            qrCodes.push(link);
        });

        currentIndex = 0;
        showQR(currentIndex);

        document.getElementById("resultado").style.display = "none";
        document.getElementById("prevButton").style.display = "inline";
        document.getElementById("nextButton").style.display = "inline";
        document.getElementById("listaAmigos").style.display = "none";
        document.getElementById("amigo").value = "";
    }

    function showQR(index) {
        const qrCodeDisplay = document.getElementById("qrCode");
        const qrNameDisplay = document.getElementById("qrName");
        qrCodeDisplay.innerHTML = '';
        qrNameDisplay.innerHTML = `<strong style="color: purple;">${listaNomes[index]}</strong>, escaneie e descubra seu Amigo Secreto:`; // Mensagem personalizada com nome em negrito e roxo

        $(qrCodeDisplay).qrcode(qrCodes[index]);

        document.getElementById("prevButton").disabled = index === 0;
        document.getElementById("nextButton").disabled = index === qrCodes.length - 1;
    }

    function showPreviousQR() {
        if (currentIndex > 0) {
            currentIndex--;
            showQR(currentIndex);
        }
    }

    function showNextQR() {
        if (currentIndex < qrCodes.length - 1) {
            currentIndex++;
            showQR(currentIndex);
        }
    }

    function reiniciarLista() {
        location.reload(); // Recarrega a página
    }

    function verificarTipoSorteioAoClicar() {
        if (tipoSorteioAtivo === '') {
            alert("Selecione um tipo de sorteio antes de continuar.");
            return false; // Impede a interação com o campo
        }
        return true; // Permite a interação com o campo
    }

    function ocultarElementos() {
        document.querySelector(".section-title").style.display = "none";
        document.querySelectorAll(".button-ativarAmigoSecretoEsorteador").forEach(button => button.style.display = "none");
        document.querySelector(".button-add").style.display = "none";
        document.querySelector("#amigo").style.display = "none";
    }

    window.selecionaAmigoSecreto = selecionaAmigoSecreto;
    window.selecionaSorteador = selecionaSorteador;
    window.adicionarAmigo = adicionarAmigo;
    window.sortearAmigo = sortearAmigo;
    window.showPreviousQR = showPreviousQR;
    window.showNextQR = showNextQR;
    window.reiniciarLista = reiniciarLista;
    window.verificarTipoSorteioAoClicar = verificarTipoSorteioAoClicar;

    window.onload = function() {
        const urlParams = new URLSearchParams(window.location.search);
        const amigo = urlParams.get('amigo');

        if (amigo) {
            const decodedName = atob(amigo); // Decodifica o nome em base64
            document.getElementById("resultado").innerHTML = `<span style="color: black;">Seu Amigo Secreto é: </span>${decodedName}`;
        }

        // Adiciona o evento de clique ao campo de input
        document.querySelector("#amigo").addEventListener("click", function(event) {
            if (!verificarTipoSorteioAoClicar()) {
                event.preventDefault(); // Impede a interação com o campo
            }
        });

        // Habilita o botão "Sortear amigo" ao recarregar a página
        document.querySelector(".button-sortear-amigo").disabled = false;
    };
}

// Inicializa a aplicação
inicializarApp();