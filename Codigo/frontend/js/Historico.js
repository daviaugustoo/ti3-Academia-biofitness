document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search; // Pega a parte da URL após "?"
    const urlParams = new URLSearchParams(queryString); // Analisa os parâmetros
    const clienteId = urlParams.get('client'); // Obtém o valor do parâmetro "client"
    console.log('ID do cliente:', clienteId);

    loadHistory(clienteId); // Carrega o histórico do cliente
});

// Função para carregar o histórico de pagamentos
async function loadHistory(clienteId) {
    try {
        const cliente = await getCliente(clienteId); // Aguarda a resposta do cliente
        console.log(cliente);

        // Fetch os pagamentos associados ao cliente
        const response = await fetch(`http://localhost:3000/api/historico_pagamentos/find_by_client?client=${clienteId}`);
        const pagamentos = await response.json();

        const tbody = document.querySelector('tbody'); // Seleciona o corpo da tabela
        tbody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

        pagamentos.forEach(pagamento => {
            console.log('Pagamento:', pagamento);
            const statusText = getStatusText(pagamento.status); // Converte o enum para texto
            console.log('Status TEXT:', statusText);
            const row = document.createElement('tr');
            row.dataset.pagamentoId = pagamento.id; // Define o ID do pagamento no dataset

            // Preenche os dados da linha com informações do pagamento
            row.innerHTML = `
                <td>${cliente.name}</td>
                <td>${pagamento.price.toFixed(2)}</td>
                <td>${pagamento.expiration_date}</td>
                <td class="status">${statusText}</td>
            `;
            tbody.appendChild(row); // Adiciona a linha à tabela
        });
    } catch (error) {
        console.error('Erro ao obter histórico:', error);
        alert('Erro ao buscar histórico de pagamentos.');
    }
}

// Função para mapear o status numérico para o enum
function mapStatusToEnum(statusCode) {
    switch (statusCode) {
        case 0: return 'paid';    // Pago
        case 1: return 'created'; // Não pago
        case 2: return 'expired'; // Expirado
        default: return 'unknown'; // Status desconhecido
    }
}

// Função para obter o texto do status com base no enum
function getStatusText(statusEnum) {
    switch (statusEnum) {
        case 'paid': return '✔️ Pago';
        case 'created': return 'Não pago';
        case 'expired': return 'Expirado';
        default: return 'Status desconhecido';
    }
}

// Função para buscar os dados do cliente
async function getCliente(clienteId) {
    const response = await fetch(`http://localhost:3000/api/clients/${clienteId}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar cliente.');
    }
    const cliente = await response.json();
    return cliente;
}
