let listaNomes = [];
let quantidadeLimite = 50;
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

    // Habilita/desabilita inputs e botões
    amigoInput.disabled = tipoSorteioAtivo === '';

    // Seleciona os botões de escolha
    const amigoSecretoButton = document.querySelector(".button-aSecretoSorteador:nth-child(1)");
    const sorteadorButton = document.querySelector(".button-aSecretoSorteador:nth-child(2)");

    // Atualiza as classes para indicar qual botão está ativo
    amigoSecretoButton.classList.remove('active');
    sorteadorButton.classList.remove('active');

    if (tipoSorteioAtivo === 'amigoSecreto') {
        amigoSecretoButton.classList.add('active');
    } else if (tipoSorteioAtivo === 'sorteador') {
        sorteadorButton.classList.add('active');
    }
}

function verificarTipoSorteio() {
    if (tipoSorteioAtivo === '') {
        alert("Por favor, selecione um tipo de sorteio antes de continuar.");
        return false; // Retorna falso se nenhum tipo de sorteio estiver selecionado
    }
    return true; // Retorna verdadeiro se um tipo de sorteio estiver selecionado
}

function adicionarAmigo() {
    if (!verificarTipoSorteio()) return;
    // Usuário digita um nome
    const nomeAmigo = document.querySelector("#amigo").value.trim();

    // Verifica e impede duplicidade de nomes e se o campo está vazio
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

    // Adiciona o nome à lista se passar nas verificações anteriores
    listaNomes.push(nomeAmigo); // armazena o nome na lista
    atualizarLista(); // Executa a função atualizarLista
    document.getElementById("amigo").value = ""; // Limpa o campo após adicionar um nome
    console.log(`Nomes na lista: ${listaNomes}`); // Exibe no console a lista dos nomes adicionados
}

function atualizarLista() {
    // Atualiza a lista após receber novo nome
    let lista = document.getElementById("listaAmigos"); 
    lista.innerHTML = "";

    listaNomes.forEach((nome, index) => {
        let li = document.createElement("li"); // Cria um novo elemento <li>
        li.textContent = nome; // Adiciona o nome dentro do <li>

        // Cria um ícone de remoção
        let removeIcon = document.createElement("span");
        removeIcon.textContent = "✖"; // Você pode substituir por uma imagem se preferir
        removeIcon.style.cursor = "pointer"; // Muda o cursor para indicar que é clicável
        removeIcon.style.marginLeft = "10px"; // Adiciona um espaço entre o nome e o ícone
        removeIcon.onclick = () => {
            removerAmigo(index); // Chama a função de remoção passando o índice
        };

        li.appendChild(removeIcon); // Adiciona o ícone de remoção ao <li>
        lista.appendChild(li); // Adiciona o <li> dentro da <ul>
    });
}

function removerAmigo(index) {
    listaNomes.splice(index, 1); // Remove o nome da lista pelo índice
    atualizarLista(); // Atualiza a lista para refletir a remoção
    console.log(`Nome removido. Lista atualizada: ${listaNomes}`);
}

function sortearAmigo() {
    if (!verificarTipoSorteio()) return; // Verifica se o tipo de sorteio foi selecionado

    if (tipoSorteioAtivo === 'sorteador') {
        if (listaNomes.length === 0) {
            alert("Adicione nomes antes de sortear."); 
            return;
        }

        // Sorteia um índice aleatório
        const indiceSorteado = Math.floor(Math.random() * listaNomes.length);
        const resultadoSorteio = listaNomes[indiceSorteado];

        // Remove o nome sorteado da lista
        listaNomes.splice(indiceSorteado, 1);

        // Atualiza a lista para refletir a remoção do nome sorteado
        atualizarLista();

        // Atualiza o resultado na tela
        document.getElementById("resultado").textContent = `Sorteado(a): ${resultadoSorteio}!`;
        console.log(`Nome sorteado: ${resultadoSorteio}!`);

        return resultadoSorteio;

    } else if (tipoSorteioAtivo === 'amigoSecreto') {
        gerarQRCodes();
    }
}

function gerarQRCodes() {
    // Limpa QR codes anteriores
    qrCodes = []; // Limpa o array de QR codes
    document.getElementById("qrCode").innerHTML = ''; // Limpa a exibição do QR code

    // Para cada nome, cria um QR code que aponta para a mesma página com um amigo aleatório
    const amigosRestantes = [...listaNomes];

    listaNomes.forEach(nome => {
        const indiceAleatorio = Math.floor(Math.random() * amigosRestantes.length);
        const amigoAleatorio = amigosRestantes[indiceAleatorio];

        // Cria um link para a mesma página com o nome do amigo aleatório como parâmetro
        const link = `${window.location.href}?amigo=${encodeURIComponent(amigoAleatorio)}`;

        // Adiciona o QR code ao array
        qrCodes.push(link);

        // Remove o amigo escolhido para evitar repetições
        amigosRestantes.splice(indiceAleatorio, 1);
    });

    // Exibe o primeiro QR code
    currentIndex = 0;
    showQR(currentIndex);

    // Oculte a lista de amigos
    document.getElementById("resultado").style.display = "none"; // Oculta a lista de amigos

    // Mostra os botões de navegação
    document.getElementById("prevButton").style.display = "inline"; // Mostra o botão anterior
    document.getElementById("nextButton").style.display = "inline"; // Mostra o botão próximo

    document.getElementById("listaAmigos").style.display = "none"; // Oculta a lista de amigos
    document.getElementById("amigo").value = ""; // Limpa o campo após gerar QR codes
}

function showQR(index) {
    const qrCodeDisplay = document.getElementById("qrCode"); // Altera para o contêiner do QR code
    const qrNameDisplay = document.getElementById("qrName"); // Altera para o contêiner do nome
    qrCodeDisplay.innerHTML = ''; // Limpa QR code anterior
    qrNameDisplay.textContent = listaNomes[index]; // Exibe o nome correspondente

    $(qrCodeDisplay).qrcode(qrCodes[index]); // Gera o QR code

    // Atualiza a aparência dos botões
    document.getElementById("prevButton").disabled = index === 0; // Desabilita o botão anterior se for o primeiro
    document.getElementById("nextButton").disabled = index === qrCodes.length - 1; // Desabilita o botão próximo se for o último
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
    listaNomes = []; // Limpa a lista de amigos
    qrCodes = []; // Limpa os QR codes gerados
    currentIndex = 0; // Reseta o índice do QR code

    // Exibir o campo de entrada para adicionar amigos
    document.getElementById("resultado").style.display = "block"; // Mostra a lista de amigos
    document.getElementById("qrCodeDisplay").style.display = "none"; // Oculta a exibição do QR code
    document.getElementById("qrCode").innerHTML = ''; // Limpa a exibição do QR code

    // Oculta os botões de navegação
    document.getElementById("prevButton").style.display = "none"; // Oculta o botão anterior
    document.getElementById("nextButton").style.display = "none"; // Oculta o botão próximo

    // Limpa a lista de resultados
    document.getElementById("resultado").innerHTML = ""; // Limpa a lista de resultados
    
    // Limpa o campo de entrada
    document.getElementById("amigo").value = ""; // Limpa o campo de entrada
    atualizarLista();
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const amigo = urlParams.get('amigo');

    if (amigo) {
        // Exibe o nome do amigo na página
        document.getElementById("resultado").textContent = `Você escaneou o QR Code! Amigo: ${decodeURIComponent(amigo)}`;
    }
};