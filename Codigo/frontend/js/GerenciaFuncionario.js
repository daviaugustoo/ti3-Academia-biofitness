document.getElementById('pesquisar').addEventListener('click', function () {
    fetch('http://localhost:3000/api/employees', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log('Response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);

            const listaFuncionario = document.getElementById('listaFuncionario');
            listaFuncionario.innerHTML = '';

            data.forEach((employee, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.name}</td>
                    <td>${employee.phone_number}</td>
                    <td>${employee.cpf}</td>
                    <td>${employee.position}</td>
                    <td><button class="action-btn" onclick="abrirModal(${index})">Mais opções</button></td>
                `;
                listaFuncionario.appendChild(row);
            });

            window.funcionarios = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

function abrirModal(index) {
    const funcionario = window.funcionarios[index];

    // Criação de um modal único (se não existir)
    let modal = document.querySelector('.modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.classList.add('modal');
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'block'; // Exibe o modal
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Informações do Funcionário</h2>
            <label for="name">Nome:</label>
            <input type="text" id="name" value="${funcionario.name}">
            <label for="phone_number">Telefone:</label>
            <input type="text" id="phone_number" value="${funcionario.phone_number}">
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" value="${funcionario.cpf}">
            <label for="position">Cargo:</label>
            <input type="text" id="position" value="${funcionario.position}">
            <button id="action1">Atualizar</button>
            <button id="action2">Deletar</button>
        </div>
    `;

    // Fecha o modal
    modal.querySelector('.close-button').onclick = fecharModal;

    // Atualizar funcionário
    document.getElementById('action1').onclick = function () {
        const updatedFuncionario = {
            name: document.getElementById('name').value,
            phone_number: document.getElementById('phone_number').value,
            cpf: document.getElementById('cpf').value,
            position: document.getElementById('position').value
        };

        fetch(`http://localhost:3000/api/employees/${funcionario.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFuncionario)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Funcionário atualizado com sucesso!');
                fecharModal();
                document.getElementById('pesquisar').click(); // Atualiza a lista
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao atualizar o funcionário.');
            });
    };

    // Deletar funcionário
    document.getElementById('action2').onclick = function () {
        fetch(`http://localhost:3000/api/employees/${funcionario.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Funcionário deletado com sucesso!');
                fecharModal();
                document.getElementById('pesquisar').click(); // Atualiza a lista
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao deletar o funcionário.');
            });
    };
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fecha o modal ao clicar fora dele
window.onclick = function (event) {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
        fecharModal();
    }
}
