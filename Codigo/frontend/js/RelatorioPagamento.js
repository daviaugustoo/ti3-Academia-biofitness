document.addEventListener('DOMContentLoaded', () => {
    loadPagamentos(); // Carrega todos os pagamentos inicialmente
  
    // Adiciona o listener para o botão de busca
    const searchInput = document.getElementById('searchInput');
  
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const clientId = searchInput.value;
        searchPagamentoByClient(clientId);
      });
    }
  });
  
  function loadPagamentos() {
    fetch('http://localhost:3000/api/pagamentos')
      .then(response => response.json())
      .then(pagamentos => {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Limpa o conteúdo atual
  
        pagamentos.forEach(pagamento => {
          const row = document.createElement('tr');
          row.dataset.pagamentoId = pagamento.id; // Armazena o ID do pagamento

          // Verificação de 'valor' para evitar erro ao chamar toFixed()
          const valorFormatado = (pagamento.valor !== undefined && !isNaN(pagamento.valor)) 
            ? `R$ ${pagamento.valor.toFixed(2)}`
            : "Valor indisponível";

          row.innerHTML = `
            <td>${new Date(pagamento.data_criacao).toLocaleDateString()}</td>
            <td>${new Date(pagamento.data_vencimento).toLocaleDateString()}</td>
            <td>${valorFormatado}</td>
            <td>${pagamento.paid ? '✔️ Pago' : '❌ Pendente'}</td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao carregar os pagamentos.');
      });
  }
  
  function searchPagamentoByClient(clientId) {
    fetch(`http://localhost:3000/api/pagamentos/find_by_client?client=${clientId}`)
      .then(response => response.json())
      .then(pagamentos => {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Limpa o conteúdo atual
  
        if (pagamentos.error) {
          alert(pagamentos.error);
          loadPagamentos(); // Carrega todos os pagamentos se não encontrar pagamentos do cliente
        } else {
          pagamentos.forEach(pagamento => {
            const row = document.createElement('tr');
            row.dataset.pagamentoId = pagamento.id; // Armazena o ID do pagamento

            // Verificação de 'valor' para evitar erro ao chamar toFixed()
            const valorFormatado = (pagamento.valor !== undefined && !isNaN(pagamento.valor)) 
              ? `R$ ${pagamento.valor.toFixed(2)}`
              : "Valor indisponível";

            row.innerHTML = `
              <td>${new Date(pagamento.data_criacao).toLocaleDateString()}</td>
              <td>${new Date(pagamento.data_vencimento).toLocaleDateString()}</td>
              <td>${valorFormatado}</td>
              <td>${pagamento.paid ? '✔️ Pago' : '❌ Pendente'}</td>
            `;
            tbody.appendChild(row);
          });
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao buscar pagamentos.');
        loadPagamentos();
      });
  }