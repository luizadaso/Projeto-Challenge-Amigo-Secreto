# Amigo Secreto 🎉

Sistema interativo de sorteio de "Amigo Secreto" desenvolvido em JavaScript. Ele permite que os usuários adicionem amigos, selecionem tipos de sorteio e gerem QR codes personalizados proporcionando uma experiência divertida e dinâmica. Também possui o modo "Sorteador", onde apenas sorteia aleatoriamente os nomes da lista.

## Pré-visualização

Visualize o layout do sistema nas telas: 

<div align="left">
  <img src="https://github.com/user-attachments/assets/22815f35-558d-481f-8e68-3a7023f6487f" width="65%" alt="demonstracao" />  
  <img src="https://github.com/user-attachments/assets/f18f1733-5b98-4d38-be4b-b7d4fd93d721" width="24%" alt="tela-celular" />

</div>

## Descrição

O Amigo Secreto é uma aplicação web que facilita o processo de sorteio de amigos para eventos como festas, confraternizações ou qualquer ocasião em que você queira fazer um sorteio. Com uma interface amigável, é possível adicionar nomes, realizar o sorteio, gerar QR codes e visualizar os amigos restantes de forma intuitiva.

𝘔𝘦𝘶 𝘱𝘳𝘪𝘯𝘤𝘪𝘱𝘢𝘭 𝘥𝘪𝘧𝘦𝘳𝘦𝘯𝘤𝘪𝘢𝘭 𝘯𝘦𝘴𝘵𝘦 𝘱𝘳𝘰𝘫𝘦𝘵𝘰 𝘧𝘰𝘪 𝘤𝘳𝘪𝘢𝘳 𝘰 𝐌𝐨𝐝𝐨: 𝐀𝐦𝐢𝐠𝐨 𝐒𝐞𝐜𝐫𝐞𝐭𝐨.

No modo “Sorteador” a função é apenas sortear os nomes adicionados à lista, mas meu desejo era criar realmente um 𝐀𝐦𝐢𝐠𝐨 𝐒𝐄𝐂𝐑𝐄𝐓𝐎. 

No modo “Amigo Secreto” o primeiro nome adicionado é determinado como o “Líder” do sorteio. O líder é quem está responsável por realizar o sorteio, visando a resolução da situação onde quem sorteia não pode ler o próprio QR Code, pois está utilizando o próprio celular para realizar o sorteio, com isso, apenas para o líder é exibido um link abaixo do QR Code para que ele acesse e veja seu amigo secreto. O líder também foi configurado para aparecer sempre ao final da lista após todos já terem escaneado os QR Codes, visando a segurança da visibilidade do amigo secreto que o líder sorteou.

## Usabilidade

**Modo: Amigo Secreto:**

1. Clique no botão correspondente para selecionar o tipo de sorteio desejado: "Amigo Secreto".
2. No campo de entrada identificado como "Nome do Líder", insira o nome de quem está realizando o sorteio.
3. Clique no botão "Adicionar" ou pressione a tecla Enter para incluir o nome na lista.
4. Certifique-se de que há pelo menos dois amigos na lista.
5. Após adicionar amigos, clique no botão "Sortear amigo".
6. O QR code correspondente ao amigo sorteado será exibido.
7. Cada pessoa pode ler o QR Code utilizando a câmera do celular.
8. Você pode navegar entre eles usando os botões "Anterior" e "Próximo".
9. Ao escanear o QR Code, você é direcionado ao link que mostrará seu amigo secreto.
10. O líder do sorteio sempre aparecerá ao final da lista.
11. Somente para o líder será exibido um link abaixo do QR code para que ele possa clicar e visualizar seu amigo secreto.
12. Se desejar realizar um novo sorteio, clique no botão "Reiniciar". Isso limpará a lista atual e permitirá que você comece novamente.

**Modo: Sorteador**

1. Clique no botão correspondente para selecionar o tipo de sorteio desejado: "Sorteador".
2. No campo de entrada identificado como "Digite um nome", insira o nome.
3. Clique no botão "Adicionar" ou pressione a tecla Enter para incluir o nome na lista.
4. Após adicionar amigos, clique no botão "Sortear amigo".
5. Será exibido o nome sorteado abaixo da lista onde consta os nomes restantes.
6. Clique novamente em "Sortear amigo" até que todos sejam sorteados.
7. Se desejar realizar um novo sorteio, clique no botão "Reiniciar". Isso limpará a lista atual e permitirá que você comece novamente.

## Teste e divirta-se com seus amigos
👉 Acesse aqui: [Amigo Secreto](https://luizadaso.github.io/Projeto-Challenge-Amigo-Secreto)

Se gostou do projeto, não esqueça de deixar uma ⭐ no repositório! 😊  

## Funcionalidades

- **Adição de Nomes**: Adicionar amigos à lista.
- **Tipo de Sorteio**: Selecionar o tipo de sorteio (Amigo Secreto ou Sorteador).
- **Validação de Entrada**: Evita a adição de nomes duplicados e exige que os nomes sejam válidos.
- **Limite de Participantes**: Permite adicionar até 50 amigos.
- **QR Code**: Gerar e exibir QR codes para cada amigo.
- **Navegação**: Navegar entre os QR codes gerados.
- **Reinício rápido**: Reiniciar a lista de amigos e sortear novamente.
- **Sorteio Aleatório**: Realiza o sorteio de forma aleatória e remove o nome sorteado da lista de amigos restantes.
- **Interface Intuitiva**: A aplicação é fácil de usar e tem uma interface limpa e responsiva.

## Tecnologias Utilizadas

- **JavaScript**: Gerencia o estado do aplicativo de sorteio.
- **Arrays**: Armazena dados dos amigos.
- **Manipulação do DOM**: Atualiza a interface com interações do usuário.
- **Funções**: Promove modularidade e reutilização de código.
- **Validação de Entrada**: Garante que os nomes sejam adicionados corretamente.
- **Expressões Regulares**: Utilizadas para formatação de nomes.
- **Lógica Condicional**: Controla o fluxo do aplicativo.
- **Alertas**: Fornecem feedback ao usuário.
- **Event Listeners**: Controlam a remoção de itens.
- **Algoritmos de Sorteio**: Implementam a lógica do sorteio dinamicamente.
- **QR Codes**: Gerados utilizando codificação base64.
- **Algoritmos**: Para randomização de dados e modularidade do código.
- **Algoritmo de Desarranjo**: Utiliza Fisher-Yates para embaralhar a lista de amigos.
- **DOM Manipulation**: Exibe QR codes e informações dinâmicas.
- **Strings HTML**: Utilizadas para formatar conteúdo.
- **Funções de Navegação**: Exibem QR codes anteriores e próximos.
- **Validação de Entrada**: Garante interações válidas.
- **Controle de Estado**: Melhora a experiência do usuário.
- **Ocultação de Elementos**: Facilita a navegação e uso do aplicativo.
- **Exposição de Funções**: Permite acesso global às funções principais.
- **Event Listeners**: Implementam interatividade ao aplicativo.
- **Manipulação de URL Parameters**: Personaliza a experiência do usuário ao carregar a página.
- **CSS**: Para estilização e layout da interface, também configurado para telas de smartpphones.
- **Git & GitHub:** Para controle de versão e colaboração, mantendo o histórico do projeto e facilitando o compartilhamento do código.

## Conquista

Este projeto foi desenvolvido inteiramente por mim para apresentação ao programa [ONE - Oracle Next Education + Alura](https://www.oracle.com/br/education/oracle-next-education/).
Com a conclusão e entrega desse sistema, recebi reconhecicmeno e obtive a badge (insígnia):

<div align="left">
  <img src="https://github.com/user-attachments/assets/c6b07310-fb1d-400e-8653-f715434cdc33" width="25%" alt="badge" />
</div>

## Autora

Para mais informações, sinta-se à vontade para entrar em contato:

<div align="left">
  <img src="https://github.com/user-attachments/assets/57cac2a3-49b1-4a0a-aef3-e968523971eb" width="15%" alt="autora" />
</div>

- [Github](https://github.com/luizadaso)
- [Linkedin](https://www.linkedin.com/in/luizadaso)

### Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LISENSE.txt) para detalhes.
