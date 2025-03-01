//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. 
//Aqui você deverá desenvolver a lógica para resolver o problema.
// Não tenho ideiaaaaaaaaaaaaa

let listaNomes = [];
let quantidadeLimite = 10;


function adicionarAmigo() {
    //Usuário digita um nome
    let nomeAmigo = document.querySelector("#amigo").value;

    // informa mensagem de erro se o campo estiver vazio
    if (nomeAmigo.trim() === "") {
        alert("Digite um nome para adicionar.");
        return;
    }

    // Verifica e impede duplicidade de nomes
    if (listaNomes.includes(nomeAmigo)) {
    alert("Este nome já foi adicionado.");
    return;
    }

    if (listaNomes.length >= quantidadeLimite) {
        alert("Limite de 10 amigos atingido. Não é possível adicionar mais.");
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

    listaNomes.forEach((nome) => {
        let li = document.createElement("li"); // Cria um novo elemento <li>
        li.textContent = nome; // Adiciona o nome dentro do <li>
        lista.appendChild(li); // Adiciona o <li> dentro da <ul>
    });
}

function sortearAmigo() {
 
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
    document.getElementById("resultado").textContent = `Sorteado: ${resultadoSorteio}!`;
    console.log(`Nome sorteado: ${resultadoSorteio}!`);

    return resultadoSorteio;
}


function reiniciarLista() {
    listaNomes = []; // Apaga todos os nomes da lista
    atualizarLista();
    document.getElementById("resultado").textContent = "";
    console.log("Lista reiniciada"); // Exibe no console
}