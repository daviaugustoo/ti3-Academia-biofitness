document.getElementById('pesquisar').addEventListener('click', function() {
  // Fetch data from the backend
  fetch('http://localhost:3000/api/clients', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // You can now use the data to update the DOM or perform other actions

    const listaCliente = document.getElementById('listaCliente');
    listaCliente.innerHTML = ''; // Clear any existing content

    data.forEach((client, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${client.name}</td>
        <td>${client.phone_number}</td>
        <td>${client.cpf}</td>
        <td>R$ ${client.subscription_fee.toFixed(2)}</td>
        <td><button class="action-btn" onclick="abrirMatricula(${client.id})">Matriculas</button></td>
        <td><button class="action-btn" onclick="abrirModal(${index})">Mais opções</button></td>
      `;
      listaCliente.appendChild(row);
    });    

    // Store the data for later use
    window.clientes = data;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

function abrirModal(index) {
  const cliente = window.clientes[index];
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.style.display = 'block';

  // Conteúdo do modal
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <h2>Informações do Cliente</h2>
      <label for="name">Nome:</label>
      <input type="text" id="name" value="${cliente.name}">
      <label for="phone_number">Telefone:</label>
      <input type="text" id="phone_number" value="${cliente.phone_number}">
      <label for="cpf">CPF:</label>
      <input type="text" id="cpf" value="${cliente.cpf}">
      <label for="birthday">Data de Nascimento:</label>
      <input type="date" id="birthday" value="${cliente.birthday.split('T')[0]}">
      <label for="gender">Gênero:</label>
      <input type="text" id="gender" value="${cliente.gender}">
      <label for="gym_goal">Objetivo na Academia:</label>
      <input type="text" id="gym_goal" value="${cliente.gym_goal}">
      <label for="health_issues">Problemas de Saúde:</label>
      <input type="text" id="health_issues" value="${cliente.health_issues}">
      <label for="job">Profissão:</label>
      <input type="text" id="job" value="${cliente.job}">
      <label for="subscription_fee">Mensalidade:</label>
      <input type="number" id="subscription_fee" value="${cliente.subscription_fee}">
      <button id="action1">Atualizar</button>
      <button id="action2">Deletar</button>
    </div>
  `;

  // Adiciona o modal ao corpo do documento
  document.body.appendChild(modal);

  // Fecha o modal quando o botão de fechar é clicado
  modal.querySelector('.close-button').onclick = fecharModal;

  // Adiciona ações aos botões
  document.getElementById('action1').onclick = function() {
    const updatedCliente = {
      name: document.getElementById('name').value,
      phone_number: document.getElementById('phone_number').value,
      cpf: document.getElementById('cpf').value,
      birthday: document.getElementById('birthday').value,
      gender: document.getElementById('gender').value,
      gym_goal: document.getElementById('gym_goal').value,
      health_issues: document.getElementById('health_issues').value,
      job: document.getElementById('job').value,
      subscription_fee: document.getElementById('subscription_fee').value
    };

    fetch(`http://localhost:3000/api/clients/${cliente.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCliente)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Cliente atualizado com sucesso!');
      fecharModal();
      // Optionally, refresh the client list
      document.getElementById('pesquisar').click();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Ocorreu um erro ao atualizar o cliente.');
    });
  };

  document.getElementById('action2').onclick = function() {
    fetch(`http://localhost:3000/api/clients/${cliente.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Cliente deletado com sucesso!');
      fecharModal();
      // Optionally, refresh the client list
      document.getElementById('pesquisar').click();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Ocorreu um erro ao deletar o cliente.');
    });
  };
}

  document.getElementById('action2').onclick = function() {
    fetch(`http://localhost:3000/api/clients/${cliente.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Cliente deletado com sucesso!');
      fecharModal();
      // Optionally, refresh the client list
      document.getElementById('pesquisar').click();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Ocorreu um erro ao deletar o cliente.');
    });
  };


function fecharModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.removeChild(modal);
  }
}

window.onclick = function(event) {
  const modal = document.querySelector('.modal');
  if (event.target === modal) {
    fecharModal();
  }
}

function verHorario() {
  alert('Exibir os horários das turmas');
}

function abrirMatricula(clienteId) {
  // Salva o ID do cliente no localStorage para uso na próxima página
  localStorage.setItem('clienteId', clienteId);

  // Redireciona o usuário para a página Matricula.html
  window.location.href = `../html/Matricula.html?id=${clienteId}`;
}