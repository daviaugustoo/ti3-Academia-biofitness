// Função para carregar os grupos do cliente com base no ID armazenado
const queryString = window.location.search; // Pega a parte da URL após "?"
const urlParams = new URLSearchParams(queryString); // Analisa os parâmetros
const clienteId = urlParams.get('id'); // Obtém o valor do parâmetro "id"
console.log('ID do cliente:', clienteId);
async function carregarGruposCliente() {


    try {
        const response = await fetch(`http://localhost:3000/api/clients/${clienteId}`);
        const cliente = await response.json();
        console.log('Client:', cliente);
        document.getElementById('clientName').innerHTML = cliente.name;
    }
        catch{
            throw new Error('Erro ao buscar cliente.');
        }
    
    

    if (!clienteId) {
        //alert('ID do cliente não encontrado. Retorne à página anterior e selecione um cliente.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/clients/client_groups/${clienteId}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar os grupos do cliente.');
        }

        const grupos = await response.json();
        console.log('Grupos:', grupos);

        // Aguarda o carregamento do documento antes de selecionar o elemento
        
            const listaGrupo = document.getElementById('listaCliente');
            if (listaGrupo) { // Verifica se o elemento foi encontrado
                listaGrupo.innerHTML = ''; // Limpa os dados existentes

                grupos.forEach(grupo => {
                    const linha = document.createElement('tr');

                    linha.innerHTML = `
                        <td>${grupo.name || 'Sem nome'}</td>
                        <td>${grupo.week_day || 'Sem horário definido'}</td>
                        <td>${grupo.instructor || 'Sem treinador definido'}</td>
                        <td>${grupo.time || 'Sem horário definido'}</td>
                        <td>
                            <button class="desvincular" onclick="removerAluno(${grupo.id}, ${clienteId})">Desvincular</button>
                        </td>
                    `;
                    console.log('Linha:', linha);
                    listaGrupo.appendChild(linha);
                });

                // Adiciona os eventos de clique nos botões de desvinculação
                document.querySelectorAll('.desvincular').forEach(btn => 
                    btn.addEventListener('click', desvincularGrupo)
                );
            }
        

    } catch (error) {
        console.error('Erro:', error.message);
        //alert('Erro ao carregar os grupos do cliente.');
    }
}

// Função para desvincular o cliente de um grupo

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
// Evento ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarGruposCliente();
});
