document.addEventListener('DOMContentLoaded', () => {
  loadUsers();

  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');

  if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
      const clientId = searchInput.value;
      searchPagamentoByClient(clientId);
    });
  }
});

function loadUsers() {
  fetch('http://localhost:3000/api/clients')
    .then(response => response.json())
    .then(users => {
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = ''; // Clear the current content

      users.forEach(user => {
        // Fetching the payments associated with the user
        fetch(`http://localhost:3000/api/pagamentos/find_by_client?client=${user.id}`)
          .then(response => response.json())
          .then(pagamentos => {
            // Setting the pagamentoId to the user if available
            const pagamentoId = pagamentos.length > 0 ? pagamentos[0].id : null;

            const row = document.createElement('tr');
            row.dataset.studentId = user.id;
            row.dataset.pagamentoId = pagamentoId;

            const statusText = getStatusText(pagamentos[0]?.status); // Get the status text based on the enum
            row.innerHTML = `
              <td>${user.name}</td>
              <td>${user.subscription_fee}</td>
              <td>${user.cpf}</td>
              <td class="status">${statusText}</td>
              <td>
                <button class="action-btn" onclick="validarPagamento(this)">Validar Pagamento</button>
                <button class="action-btn" onclick="verHistorico(${user.id})">Histórico</button>
                <button class="action-btn" onclick="setPagamentoStatus(this, 0)">Marcar como Pago</button>
                <button class="action-btn" onclick="setPagamentoStatus(this, 1)">Marcar como Não Pago</button>
                <button class="action-btn" onclick="setPagamentoStatus(this, 2)">Marcar como Expirado</button>
              </td>
            `;
            tbody.appendChild(row);
          })
          .catch(error => {
            console.error('Erro ao obter pagamentos:', error);
            //alert('Erro ao buscar pagamentos.');
          });
      });
    })
    .catch(error => {
      console.error('Erro:', error);
      //alert('Erro ao carregar os usuários.');
    });
}

// Get status text based on the enum value
function getStatusText(statusCode) {
  switch (statusCode) {
    case 'paid': return '✔️ Pago';
    case 'created': return 'Não pago';
    case 'expired': return 'Expirado';
    default: return 'Status desconhecido';
  }
}

function validarPagamento(button) {
  const row = button.closest('tr');
  const pagamentoId = row.dataset.pagamentoId;

  console.log(`Pagamento ID (Validar): ${pagamentoId}`); // Check pagamentoId

  if (!pagamentoId) {
    alert('Pagamento não encontrado!');
    return;
  }

  // Fetch the payment details using the provided ID
  fetch(`http://localhost:3000/api/pagamentos/${pagamentoId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do pagamento.');
      }
      return response.json();
    })
    .then((paymentData) => {
      console.log('Payment Data:', paymentData);

      // Send the payment data to the payment history API
      return fetch('http://localhost:3000/api/historico_pagamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData), // Ensure data is stringified
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao enviar pagamento ao histórico.');
      }
      return response.json();
    })
    .then((result) => {
      console.log('Success:', result);
      console.log('Pagamento enviado ao histórico com sucesso!');

      // Update the expiration_date to the next month
      const newExpirationDate = new Date(result.expiration_date);
      newExpirationDate.setMonth(newExpirationDate.getMonth() + 1);

      return fetch(`http://localhost:3000/api/pagamentos/${pagamentoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expiration_date: newExpirationDate.toISOString().split('T')[0] }),
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar a data de expiração.');
      }
      return response.json();
    })
    .then((updatedPayment) => {
      console.log('Updated Payment:', updatedPayment);
      console.log('Data de expiração atualizada com sucesso!');
      alert('Pagamento enviado ao histórico com sucesso!');

    })
    .catch((error) => {
      console.error('Erro:', error);
      alert('Ocorreu um erro: ' + error.message);
    });
}

function setPagamentoStatus(button, newStatus) {
  const row = button.closest('tr');
  const pagamentoId = row.dataset.pagamentoId;

  console.log(`Pagamento ID (setPagamentoStatus): ${pagamentoId}`); // Check pagamentoId

  if (!pagamentoId) {
    //alert('Pagamento não encontrado!');
    return;
  }

  fetch(`http://localhost:3000/api/pagamentos/${pagamentoId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: newStatus })
  })
    .then(response => response.json())
    .then(data => {
      const statusText = getStatusText(data.status);
      row.querySelector('.status').textContent = statusText;
      //alert('Status atualizado com sucesso!');
    })
    .catch(error => {
      console.error('Erro:', error);
      //alert('Erro ao atualizar o status.');
    });
}

function verHistorico(id) {
  console.log('Ver histórico:', id);
  window.location.href = `../html/historico.html?client=${id}`;
}

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
};

function searchPagamentoByClient(clientId) {
  fetch(`http://localhost:3000/api/pagamentos/find_by_client?client=${clientId}`)
    .then(response => response.json())
    .then(response => {
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = ''; // Clear current content

      if (!response.success) {
        //alert(response.error || 'Erro ao buscar pagamentos.');
      } else {
        response.forEach(pagamento => {
          const row = document.createElement('tr');
          row.dataset.pagamentoId = pagamento.id;
          const statusText = getStatusText(pagamento.status); // Get the status text based on the enum
          row.innerHTML = `
            <td>${pagamento.client}</td>
            <td>${pagamento.price}</td>
            <td>${pagamento.expiration_date}</td>
            <td class="status">${statusText}</td>
            <td>
              <button class="action-btn" onclick="validarPagamento(this)">Validar Pagamento</button>
              <button class="action-btn" onclick="setPagamentoStatus(this, 0)">Marcar como Pago</button>
              <button class="action-btn" onclick="setPagamentoStatus(this, 1)">Marcar como N��o Pago</button>
              <button class="action-btn" onclick="setPagamentoStatus(this, 2)">Marcar como Expirado</button>
            </td>
          `;
          tbody.appendChild(row);
        });
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      //alert('Erro ao buscar pagamentos.');
    });
}