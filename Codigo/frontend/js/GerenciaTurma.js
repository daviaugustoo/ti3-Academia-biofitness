document.addEventListener("DOMContentLoaded", function () {
  const turmasContainer = document.getElementById("turmasContainer");
  if (!turmasContainer) {
      console.error("Elemento turmasContainer não encontrado no DOM.");
      return;
  }

  // Fetch data from the backend
  fetch("http://localhost:3000/api/groups", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then(async (data) => {
        console.log("Success:", data);

        turmasContainer.innerHTML = ""; // Clear existing content

        // Use Promise.all to resolve all icon paths before rendering
        const cards = await Promise.all(
            data.map(async (group) => {
                const iconPath = await checkStatus(group.id, group.max_members);
                const card = document.createElement("div");
                card.className = "card";
                card.setAttribute("data-turma", group.name);
                card.innerHTML = `
                  <div class="cardContent">
                    <img src="${iconPath}" alt="" class="availability_icon" >    
                    <strong>Turma:</strong> ${group.name}<br>
                    <strong>Horário:</strong> ${group.time || 'N/A'}<br>
                    <strong>Qtd:</strong> ${group.max_members || 'N/A'} pessoas
                  </div>
                `;
                card.addEventListener("click", () => abrirModalTurma(group));
                return card;
            })
        );

        // Append all cards to the container
        cards.forEach((card) => turmasContainer.appendChild(card));
    })
    .catch((error) => {
        console.error("Error:", error);
    });

});

function abrirModalTurma(turma) {
  console.log(turma);
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.style.display = 'block';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <h2>Informações da Turma</h2>
      <label for="name">Nome:</label>
      <input type="text" id="name" value="${turma.name}">
      <label for="time">Horário:</label>
      <input type="text" id="time" value="${turma.time || 'N/A'}">
      <label for="max_members">Qtd:</label>
      <input type="number" id="max_members" value="${turma.max_members || 'N/A'}">
      <button id="delete-button" class="btn-actions">Deletar Turma</button>
      <button id="update-button" class="btn-actions">Atualizar Turma</button>
      <br>
      <button class="lista-alunos btn-actions">Lista de Alunos</button>
      <button class="lista-espera btn-actions">Lista de Espera</button>
      <button class="btnRelatório btn-actions" onclick = "verRelatorio(${turma.id})">Relatório</button>

    </div>
  `;
  document.body.appendChild(modal);

  const closeButton = modal.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.removeChild(modal);
  });


  const deleteButton = modal.querySelector('#delete-button');
  deleteButton.addEventListener('click', () => {
      if (confirm(`Tem certeza que deseja deletar a turma ${turma.name}?`)) {
          fetch(`http://localhost:3000/api/groups/${turma.id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
          })
              .then((response) => {
                  if (response.ok) {
                      //alert('Turma deletada com sucesso.');
                      modal.style.display = 'none';
                      document.body.removeChild(modal);
                      location.reload(); // Reload the page to update the list
                  } else {
                      //alert('Erro ao deletar a turma.');
                  }
              })
              .catch((error) => {
                  console.error('Error:', error);
                  //alert('Erro ao deletar a turma.');
              });
      } kk
  });

  const updateButton = modal.querySelector('#update-button');
  updateButton.addEventListener('click', () => {
      const updatedTurma = {
          name: document.getElementById('name').value,
          time: document.getElementById('time').value,
          max_members: document.getElementById('max_members').value
      };

      fetch(`http://localhost:3000/api/groups/${turma.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTurma)
      })
          .then((response) => response.json())
          .then((data) => {
              if (data.success) {
                  //alert('Turma atualizada com sucesso.');
                  modal.style.display = 'none';
                  document.body.removeChild(modal);
                  location.reload();
              }
              location.reload();
          })
          .catch((error) => {
              console.error('Error:', error);
              //alert('Erro ao atualizar a turma.');
          });
  });

  const listaAlunosButton = modal.querySelector('.lista-alunos');
  listaAlunosButton.addEventListener('click', () => abrirModalListaAlunos(turma));

  const listaEsperaButton = modal.querySelector('.lista-espera');
  listaEsperaButton.addEventListener('click', () => abrirModalListaEspera(turma));

  function abrirModalListaAlunos(turma) {
    fetch(`http://localhost:3000/api/groups/client_groups/${turma.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((users) => {
      lotacao = users.length;
      // Verifica se users é um array, senão define como vazio
      if (!Array.isArray(users)) {
        console.error("Erro: resposta inesperada. Esperado um array, mas obtido:", users);
        users = []; // Define como array vazio para exibir o modal mesmo assim
      }
  
      // Cria o modal
      const modalAlunos = document.createElement('div');
      modalAlunos.classList.add('modal');
      modalAlunos.style.display = 'block';
  
      // Cria o conteúdo do modal com opção para associar usuários
      modalAlunos.innerHTML = `
        <div class="modal-content">
          <span class="close-button">&times;</span>
          <h2>Lista de Alunos</h2>
          ${users.length === 0 ? "<p>Nenhum aluno associado. Adicione novos alunos abaixo:</p>" : ""}
          <ul id="users-list">
            ${users.map(student => `
              <li data-id="${student.id}">
                ${student.name} - ${student.gender}
                <span class="remove  input close-button" style="color: red;" onclick="removerAluno(${turma.id}, ${student.id})">+</span>
              </li>
            `).join('')}
          </ul>
          <hr>
          <input type="text" id="user-name-input" placeholder="Nome do usuário">
          <button id="add-student-button">Adicionar Aluno</button>
        </div>
      `;
  
      document.body.appendChild(modalAlunos);
  
      const closeButton = modalAlunos.querySelector('.close-button');
      closeButton.addEventListener('click', () => {
        modalAlunos.style.display = 'none';
        document.body.removeChild(modalAlunos);
      });
  
      const addButton = modalAlunos.querySelector('#add-student-button');
      addButton.addEventListener('click', () => {
        if (lotacao >= turma.max_members) {
          alert('Turma cheia. Não é possível adicionar mais alunos.');
          return;
        }
        const userName = document.getElementById('user-name-input').value;
  
        if (!userName.trim()) {
          //alert('Por favor, insira o nome do usuário.');
          return;
        }
  
        // Busca o usuário pelo nome
        fetch(`http://localhost:3000/api/clients/client_by_name/${userName}`)
          .then(response => response.json())
          .then(user => {
            if (!user || !user.id) {
              //alert('Usuário não encontrado.');
              return;
            }
  
            const userId = user.id;
  
            // Adiciona o usuário ao grupo
            fetch(`http://localhost:3000/api/groups/${turma.id}/${userId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(response => response.json())
              .then(data => {
                if (data.error) {
                  //alert('Erro ao adicionar aluno ao grupo: ' + data.error);
                } else {
                  //alert('Aluno adicionado ao grupo com sucesso.');
                  // Atualiza a lista de usuários no modal
                  const usersList = modalAlunos.querySelector('#users-list');
                  usersList.innerHTML += `
                    <li data-id="${user.id}">
                      ${user.name} / ${user.gender}
                      <span class="remove  input close-button" style="color: red;" onclick="removerAluno(${turma.id}, ${user.id})">+</span>
                    </li>
                  `;
                }
              })
              .catch(error => {
                console.error('Erro ao adicionar aluno ao grupo:', error);
                //alert('Erro ao adicionar aluno ao grupo.');
              });
          })
          .catch(error => {
            console.error('Erro ao buscar usuário:', error);
            //alert('Erro ao buscar usuário.');
          });
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar lista de alunos:", error);
      //alert("Erro ao carregar a lista de alunos.");
    });
  }
  

  function abrirModalListaEspera(turma) {
    // Cria o modal
    const modalEspera = document.createElement('div');
    modalEspera.classList.add('modal');
    modalEspera.style.display = 'block';
  
    // Cria o conteúdo do modal
    modalEspera.innerHTML = `
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Lista de Espera</h2>
        <ul id="users-list"></ul>
        <input type="text" id="user-name-input" placeholder="Nome do usuário">
        <button id="add-to-waitlist-button">Adicionar à Lista de Espera</button>
      </div>
    `;
    
    console.log(turma.id);
  
    // Busca a lista de espera do servidor
    fetch(`http://localhost:3000/api/wait_lists/clients_in_group/${turma.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        
        // Preenche a lista com os usuários
        const usersList = modalEspera.querySelector('#users-list');
        if (!Array.isArray(users) || users.length === 0) {
          usersList.innerHTML = '<li>Nenhum usuário na lista de espera.</li>';
        } else {
          users.forEach((student) => {

            fetch(`http://localhost:3000/api/clients/${student.client_id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => response.json())
              .then((user) => {
                console.log(user);
                usersList.innerHTML += `
                <li data-id="${user.id}">
                  ${user.name} - ${user.gender || 'N/A'}
                  <span class="remove  input close-button" style="color: red;" onclick="removerUsuarioEspera(${turma.id}, ${student.id})">+</span>
                </li>
              `;
              })

          
          });
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar lista de espera:', error);
      });
  
    document.body.appendChild(modalEspera);
  
    const closeButton = modalEspera.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      modalEspera.style.display = 'none';
      document.body.removeChild(modalEspera);
    });

    


  
    const addToWaitlistButton = modalEspera.querySelector('#add-to-waitlist-button');
    addToWaitlistButton.addEventListener('click', () => {
      const userName = document.getElementById('user-name-input').value;
  
      if (!userName.trim()) {
        //alert('Por favor, insira o nome do usuário.');
        return;
      }
  
      // Busca o usuário pelo nome
      fetch(`http://localhost:3000/api/clients/client_by_name/${userName}`)
        .then(response => response.json())
        .then(user => {
          if (!user || !user.id) {
            //alert('Usuário não encontrado.');
            return;
          }
  
          const userId = user.id;
  
          // Adiciona o usuário à lista de espera
          fetch('http://localhost:3000/api/wait_lists', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              client_id: userId,
              group_id: turma.id
            })
          })
            .then(response => response.json())
            .then(data => {
              if (data.error) {
                //alert('Erro ao adicionar à lista de espera: ' + data.error);
              } else {
                //alert('Usuário adicionado à lista de espera com sucesso.');
                // Atualiza a lista de usuários no modal
                const usersList = modalEspera.querySelector('#users-list');
                usersList.innerHTML += `
                  <li data-id="${user.id}">
                    ${user.name} / ${user.gender}
                    <span class="remove">remover</span>
                  </li>
                `;
              }
            })
            .catch(error => {
              console.error('Erro ao adicionar à lista de espera:', error);
              //alert('Erro ao adicionar à lista de espera.');
            });
        })
        .catch(error => {
          console.error('Erro ao buscar usuário:', error);
          //alert('Erro ao buscar usuário.');
        });
    });
  }
}

function removerAluno(groupId, userId) {
  if (confirm('Tem certeza que deseja remover este aluno da turma?')) {
    fetch(`http://localhost:3000/api/groups/delete/${groupId}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          //alert('Erro ao remover aluno do grupo: ' + data.error);
        } else {
          //alert('Aluno removido do grupo com sucesso.');
          // Remove o aluno da lista no modal
          const userItem = document.querySelector(`#users-list li[data-id="${userId}"]`);
          if (userItem) {
            userItem.remove();
          }
        }
      })
      .catch(error => {
        console.error('Erro ao remover aluno do grupo:', error);
        //alert('Erro ao remover aluno do grupo.');
      });
  }
}
function removerUsuarioEspera(groupId, userId) {
    if (confirm('Tem certeza que deseja remover este usuário da lista de espera?')) {
        fetch(`http://localhost:3000/api/wait_lists/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Erro ao remover usuário: ' + data.error);
            } else {
                alert('Usuário removido com sucesso.');
                const userItem = document.querySelector(`#users-list li[data-id="${userId}"]`);
                if (userItem) {
                    userItem.remove();
                }
            }
        })
        .catch(error => {
            console.error('Erro ao remover usuário:', error);
        });
    }
}
function checkStatus(Id_turma, max_members) {
  return fetch(`http://localhost:3000/api/groups/client_groups/${Id_turma}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
      .then(response => response.json())
      .then(data => {
          if (data.length < max_members) {
              return '../assets/available.png';
          } else {
              return '../assets/occupied.png';
          }
      })
      .catch(error => {
          console.error('Erro ao verificar status:', error);
          return '../assets/error.png'; // Return a default icon in case of an error
      });
}

function verRelatorio(id) {
  console.log('Ver relatório:', id);
  window.location.href = `../html/RelatorioTurma.html?turma=${id}`;
}