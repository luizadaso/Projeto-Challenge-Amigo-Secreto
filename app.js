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
        // Define o placeholder inicial para o líder do sorteio
        document.querySelector("#amigo").placeholder = "Nome do Líder";
        verificarBotaoSortear();
    }

    function selecionaSorteador() {
        tipoSorteioAtivo = 'sorteador';
        atualizarEstadoBotoes();
        // Define o placeholder inicial para adicionar um nome
        document.querySelector("#amigo").placeholder = "Digite um nome";
        document.querySelector(".button-sortear-amigo").style.display = "inline";
        document.querySelector(".button-sortear-amigo").disabled = false;
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

    function capitalizarNomes(nome) {
        return nome.replace(/\b\w/g, char => char.toUpperCase());
    }

    function adicionarAmigo() {
        if (!verificarTipoSorteio()) return;
        const amigoInput = document.querySelector("#amigo");
        let nomeAmigo = amigoInput.value.trim();

        if (nomeAmigo === "") {
            alert("Digite um nome para adicionar.");
            return;
        }

        // Normaliza o nome para comparação case-insensitive
        const nomeNormalizado = nomeAmigo.toLowerCase();

        // Verifica se o nome já foi adicionado
        if (listaNomes.some(nome => nome.toLowerCase() === nomeNormalizado)) {
            alert("Este nome já foi adicionado.");
            return;
        } else if (listaNomes.length >= quantidadeLimite) {
            alert(`Limite de ${quantidadeLimite} amigos atingido. Não é possível adicionar mais.`);
            return;
        }

        nomeAmigo = capitalizarNomes(nomeAmigo);
        listaNomes.push(nomeAmigo);
        atualizarLista();
        amigoInput.value = "";

        // Altera o placeholder após o primeiro nome ser inserido
        if (listaNomes.length === 1) {
            amigoInput.placeholder = "Digite um nome";
        }

        verificarBotaoSortear();

        console.log(`Nomes na lista: ${listaNomes}`);
    }

    function atualizarLista() {
        const lista = document.getElementById("listaAmigos");
        lista.innerHTML = "";

        listaNomes.forEach((nome, index) => {
            const li = document.createElement("li");
            li.textContent = capitalizarNomes(nome);

            // Adiciona o texto "(Líder)" ao primeiro nome da lista, apenas para Amigo Secreto
            if (tipoSorteioAtivo === 'amigoSecreto' && index === 0) {
                li.textContent += " (Líder)";
            }

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
        verificarBotaoSortear();
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
            document.getElementById("resultado").textContent = `${capitalizarNomes(resultadoSorteio)}!`;
            console.log(`Nome sorteado: ${resultadoSorteio}!`);

            ocultarElementos();
            return resultadoSorteio;
        } else if (tipoSorteioAtivo === 'amigoSecreto') {
            if (listaNomes.length < 2) {
                alert("Adicione pelo menos 2 nomes para sortear.");
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

        const baseUrl = "https://luizadaso.github.io/Projeto-Challenge-Amigo-Secreto/";

        let shuffledNomes;
        let sorteios;

        // Embaralha a lista de amigos, exceto o primeiro (líder), até que ninguém sorteie a si mesmo
        do {
            shuffledNomes = listaNomes.slice(1).sort(() => Math.random() - 0.5);
            sorteios = [];
            for (let i = 0; i < listaNomes.length - 1; i++) {
                sorteios.push(shuffledNomes[i]);
            }
        } while (sorteios.some((amigo, index) => amigo === listaNomes[index + 1]));

        // Gera QR codes para todos os nomes, garantindo que ninguém sorteie a si mesmo
        for (let i = 1; i < listaNomes.length; i++) {
            const amigo = sorteios[i - 1];
            const encodedName = btoa(amigo); // Codifica o nome em base64
            const link = `${baseUrl}?amigo=${encodedName}`;

            qrCodes.push(link);
        }

        // Adiciona o líder ao final da lista de sorteios
        const encodedNameLider = btoa(listaNomes[0]); // Codifica o nome do líder em base64
        const linkLider = `${baseUrl}?amigo=${encodedNameLider}`;
        qrCodes.push(linkLider);

        // Move o líder para o final da lista de exibição
        listaNomes.push(listaNomes.shift());

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
        const qrLinkDisplay = document.getElementById("qrLink");
        qrCodeDisplay.innerHTML = '';

        let nomeExibido = capitalizarNomes(listaNomes[index]);

        // Adiciona o texto "(Líder)" ao primeiro nome da lista, apenas para Amigo Secreto
        if (tipoSorteioAtivo === 'amigoSecreto' && index === listaNomes.length - 1) {
            nomeExibido += " (Líder)";
            document.querySelector(".button-reiniciar").style.display = "inline";
        } else {
            document.querySelector(".button-reiniciar").style.display = "none";
        }

        if (index === listaNomes.length - 1) {
            qrNameDisplay.innerHTML = `<strong style="color: purple;">${nomeExibido}</strong>`;
        } else {
            qrNameDisplay.innerHTML = `<strong style="color: purple;">${nomeExibido}</strong>, escaneie e descubra seu Amigo Secreto:`;
        }

        // Exibe o QR code apenas se não for o líder
        if (index !== listaNomes.length - 1) {
            $(qrCodeDisplay).qrcode(qrCodes[index]);
        }

        // Exibe o link apenas para o primeiro nome que foi adicionado (agora no final da lista)
        if (index === listaNomes.length - 1) {
            qrLinkDisplay.innerHTML = `<a href="${qrCodes[index]}" target="_blank">Clique aqui e descubra seu Amigo Secreto</a>`;
        } else {
            qrLinkDisplay.innerHTML = '';
        }

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

    function verificarBotaoSortear() {
        const botaoSortear = document.querySelector(".button-sortear-amigo");
        if (tipoSorteioAtivo === 'amigoSecreto' && listaNomes.length < 2) {
            botaoSortear.disabled = true;
        } else {
            botaoSortear.disabled = false;
        }
    }

    function ocultarElementos() {
        document.querySelector(".section-title").style.display = "none";
        document.querySelectorAll(".button-ativarAmigoSecretoEsorteador").forEach(button => button.style.display = "none");
        document.querySelector(".button-add").style.display = "none";
        document.querySelector("#amigo").style.display = "none";
        if (tipoSorteioAtivo === 'amigoSecreto') {
            document.querySelector(".button-sortear-amigo").style.display = "none";
        }
    }

    function ocultarElementosAposQRCode() {
        document.querySelector("#amigo").style.display = "none";
        document.querySelectorAll(".button-ativarAmigoSecretoEsorteador").forEach(button => button.style.display = "none");
        document.querySelector(".button-add").style.display = "none";
        document.querySelector(".button-sortear-amigo").style.display = "none";
        document.querySelector(".section-title").style.display = "none";
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
            document.getElementById("resultado").innerHTML = `Seu Amigo Secreto é: <span style="color: purple;">${capitalizarNomes(decodedName)}</span>`;
            ocultarElementosAposQRCode();
        }

        // Adiciona o evento de clique ao campo de input
        document.querySelector("#amigo").addEventListener("click", function(event) {
            if (!verificarTipoSorteioAoClicar()) {
                event.preventDefault(); // Impede a interação com o campo
            }
        });

        // Adiciona o evento de tecla ao campo de input para adicionar nome ao pressionar "Enter"
        document.querySelector("#amigo").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                adicionarAmigo();
                event.preventDefault();
            }
        });

        document.querySelector("#amigo").placeholder = "Selecione o tipo do sorteio";

        // Habilita o botão "Sortear amigo" ao recarregar a página
        document.querySelector(".button-sortear-amigo").disabled = false;
    };
}

// Inicializa a aplicação
inicializarApp();