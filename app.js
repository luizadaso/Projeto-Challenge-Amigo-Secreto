//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. 
//Aqui você deverá desenvolver a lógica para resolver o problema.
// Não tenho ideiaaaaaaaaaaaaa

let listaNomes = [];
let quantidadeLimite = 10;


function adicionarAmigo() {
    let nomeAmigo = document.querySelector("#amigo").value; //variavel criada, usuário informa nome
        if (nomeAmigo.trim() === "") {      // informa mensagem de erro se o campo estiver vazio
            alert("Digite um nome válido.");
            return;
        }

    listaNomes.push(nomeAmigo); // armazena o nome na lista
    atualizarLista();
    document.getElementById("amigo").value = ""; //limpa o campo após adicionar um nome
    console.log(`Nomes na lista: ${listaNomes}`); //exibe no console a lista dos nomes adicionados
}

function atualizarLista() {
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
        alert("Adicione nomes antes de sortear!"); 
        return;
    }

    let resultado = listaNomes[Math.floor(Math. random() * listaNomes.length)];
    resultado = document.getElementById("resultado").textContent = `Sorteado: ${resultado}!`;
    console.log(`Nome sorteado: ${resultado}!`);
}

function reiniciarLista() {
    listaNomes = []; // Apaga todos os nomes da lista
    atualizarLista();
    document.getElementById("resultado").textContent = "";
    console.log("Lista reiniciada"); // Exibe no console
}