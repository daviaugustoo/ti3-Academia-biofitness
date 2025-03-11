document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");

  const queryString = window.location.search; // Pega a parte da URL após "?"
  const urlParams = new URLSearchParams(queryString); // Analisa os parâmetros
  const turmaId = urlParams.get('turma'); // Obtém o valor do parâmetro "client"
 
  console.log("ID da turma:", turmaId);
  const modalAlunos = document.createElement("div");
  modalAlunos.classList.add("modal");
  const modalListaEspera = document.createElement("div");
  modalListaEspera.classList.add("modal");
  var quantiaHomens = 0;
  var quantiaMulheres = 0;

  const turma = fetch(`http://localhost:3000/api/groups/${turmaId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json()) // Processa a resposta como JSON
    .then((turma) => {
      // Após obter a resposta em formato JSON, manipula o DOM
      document.getElementById(
        "turmaDiaDaSemana"
      ).innerHTML = `${turma.week_day}`;
      document.getElementById("turmaMaximo").innerHTML = `${turma.max_members}`;
      document.getElementById("turmaHorario").innerHTML = `${turma.time}`;
      document.getElementById("instrutor").innerHTML = `${turma.instructor}`;
      document.getElementById("nomeTurma").innerHTML = `${turma.name}`;
    })
    .catch((error) => {
      console.error("Erro ao buscar dados da turma:", error);
    });

  fetch(`http://localhost:3000/api/groups/client_groups/${turmaId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((users) => {
      // Verifica se users é um array, senão define como vazio
      if (!Array.isArray(users)) {
        console.error(
          "Erro: resposta inesperada. Esperado um array, mas obtido:",
          users
        );
        users = []; // Define como array vazio para exibir o modal mesmo assim
      }

      listaAlunos = document.getElementById("nomeAlunos");
      listaAlunos.innerHTML = `${users.map((student) => ` ${student.name}`)}`;

      users.forEach((student) => {
        if (student.gender == "Homem") {
          quantiaHomens++;
        } else {
          quantiaMulheres++;
        }
      });
      quantiaHomens = (quantiaHomens / users.length) * 100;
      quantiaMulheres = (quantiaMulheres / users.length) * 100;
      document.getElementById("barraHomens").style.width = `${quantiaHomens}%`;
      document.getElementById(
        "barraMulheres"
      ).style.width = `${quantiaMulheres}%`;
    });

  fetch(`http://localhost:3000/api/wait_lists/clients_in_group/${turmaId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((users) => {
      console.log(users);

      // Preenche a lista com os usuários
      if (!Array.isArray(users) || users.length === 0) {
        usersList.innerHTML = "<li>Nenhum usuário na lista de espera.</li>";
      } else {
        let userNames = [];
        users.forEach((student) => {
          fetch(`http://localhost:3000/api/clients/${student.client_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((user) => {
              console.log(user);
              userNames.push(user.name);
              if (userNames.length === users.length) {
                document.getElementById("listaDeEspera").innerHTML =
                  userNames.join(", "); // Junta os nomes com vírgulas, sem adicionar no final
              }
            });
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar lista de espera:", error);
    });

  content.innerHTML = `
        <table>
            <tr class="table-row">
                <td class="row-start">Turma:</td>
                <td class="row-expand" id="nomeTurma">
                </td>
            </tr>
            <tr class="table-row">
                <td class="row-start">Clientes</td>
                <td class="row-expand" id="nomeAlunos">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <div class="progress-bar" style="width:100%" >
                        <div class="progress" id="barraHomens" style="">Homens </div>
                    </div>
                </td>
                </tr>
                <tr>
                <td colspan="2">
                    <div class="progress-bar" style="width:100%" >
                        <div class="progress" id="barraMulheres" style="">Mulheres</div>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="row-start">Instrutores</td>
                <td id="instrutor">

                </td>
            </tr>
            <tr>
                <td class="row-start">Dia da semana</td>
                <td id="turmaDiaDaSemana">
                </td>
            </tr>
            <tr>
                <td class="row-start">Horário início</td>
                <td id="turmaHorario">
                </td>
            </tr>
            <tr>
                <td class="row-start">Máx de membros</td>
                <td id="turmaMaximo">
                </td>
            </tr>
            <tr class="table-row">
                <td class="row-start">Lista De Espera</td>
                <td class="row-expand" id="listaDeEspera">
                </td>
            </tr>
        </table>
    `;

  const main = document.querySelector("main");
  main.appendChild(content);

  // Busca dados do backend
  fetchDataAndPopulate(content);

  // Evento para abrir modal
  const editButton = document.querySelector(".edit-button");
  editButton.addEventListener("click", () => abrirModalEdicao());
});

function fetchDataAndPopulate(content) {
  fetch("/api/relatorio-turma")
    .then((response) => response.json())
    .then((data) => {
      const clientesTd = content.querySelector(
        "table tr:nth-child(1) td:nth-child(2)"
      );
      clientesTd.textContent = data.clientes || "N/A";

      const instrutoresTd = content.querySelector(
        "table tr:nth-child(3) td:nth-child(2)"
      );
      instrutoresTd.textContent = data.instrutores || "N/A";

      const progressBar = content.querySelector(".progress");
      progressBar.style.width = data.progresso + "%" || "0%";
    })
    .catch((error) => console.error("Erro ao buscar dados:", error));
}

// function abrirModalEdicao() {
//   const modal = document.createElement("div");
//   modal.classList.add("modal");
//   modal.style.display = "block";

//   modal.innerHTML = `
//         <div class="modal-content">
//             <span class="close-button">&times;</span>
//             <h2>Editar Informações</h2>
//             <label for="clientes">Clientes:</label>
//             <input type="text" id="clientes" value="Clientes">

//             <label for="instrutores">Instrutores:</label>
//             <input type="text" id="instrutores" value="Instrutores">

//             <label for="dia-da-semana">Dia da semana:</label>
//             <input type="text" id="dia-da-semana" value="Segunda-feira">

//             <label for="horario-inicio">Horário início:</label>
//             <input type="time" id="horario-inicio" value="08:00">

//             <label for="max-membros">Máx de membros:</label>
//             <input type="number" id="max-membros" value="20">

//             <label for="lista-espera">Lista de espera:</label>
//             <p>Nenhum aluno na lista</p>

//             <button id="save-button">Salvar</button>
//         </div>
//     `;

//   document.body.appendChild(modal);

//   const closeButton = modal.querySelector(".close-button");
//   closeButton.addEventListener("click", () => {
//     modal.style.display = "none";
//     document.body.removeChild(modal);
//   });

//   const saveButton = modal.querySelector("#save-button");
//   saveButton.addEventListener("click", () => {
//     const clientes = document.getElementById("clientes").value;
//     const instrutores = document.getElementById("instrutores").value;

//     const dataToSave = {
//       clientes,
//       instrutores,
//       progresso,
//     };

//     console.log("Dados salvos:", dataToSave);

//     modal.style.display = "none";
//     document.body.removeChild(modal);
//   });
// }
