document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('pesquisar').addEventListener('click', function () {
        fetch('http://localhost:3000/api/employees', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                const listaFuncionario = document.getElementById('listaFuncionario');
                listaFuncionario.innerHTML = '';

                data.forEach((employee, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${employee.name}</td>
                        <td>${employee.begin_shift.substring(11, 16)}</td>
                        <td>${employee.end_shift.substring(11, 16)}</td>
                        <td><button class="action-btn" onclick="abrirModal(${index})">Editar</button></td>
                    `;
                    listaFuncionario.appendChild(row);
                });

                window.funcionarios = data;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao buscar funcionários. Tente novamente mais tarde.');
            });
    });
});

function abrirModal(index) {
    const funcionario = window.funcionarios[index];

    let modal = document.querySelector('.modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.classList.add('modal');
        document.body.appendChild(modal);
    }

    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Informações do Funcionário</h2>
            <label for="name">Nome:</label>
            <input type="text" id="name" value="${funcionario.name}">
            <label for="position">Cargo:</label>
            <input type="text" id="position" value="${funcionario.position || ''}">
            <br>
            <label for="begin_shift">Início do turno:</label>
            <input type="time" id="begin_shift" value="${funcionario.begin_shift.substring(11, 16)}">
            <br>
            <label for="end_shift">Fim do turno:</label>
            <input type="time" id="end_shift" value="${funcionario.end_shift.substring(11, 16)}">
            <br>
            <button id="action1">Atualizar</button>
            <button id="action2">Deletar</button>
        </div>
    `;

    modal.querySelector('.close-button').onclick = fecharModal;

    document.getElementById('action1').onclick = function () {
        const updatedFuncionario = {
            name: document.getElementById('name').value,
            position: document.getElementById('position').value,
            begin_shift: `2000-01-01T${document.getElementById('begin_shift').value}:00.000Z`,
            end_shift: `2000-01-01T${document.getElementById('end_shift').value}:00.000Z`
        };

        fetch(`http://localhost:3000/api/employees/${funcionario.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFuncionario)
        })
            .then(response => {
                if (!response.ok) throw new Error(`Erro ao atualizar: ${response.status}`);
                return response.json();
            })
            .then(data => {
                alert('Funcionário atualizado com sucesso!');
                fecharModal();
                document.getElementById('pesquisar').click();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao atualizar o funcionário.');
            });
    };

    document.getElementById('action2').onclick = function () {
        fetch(`http://localhost:3000/api/employees/${funcionario.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(`Erro ao deletar: ${response.status}`);
                return response.json();
            })
            .then(data => {
                alert('Funcionário deletado com sucesso!');
                fecharModal();
                document.getElementById('pesquisar').click();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao deletar o funcionário.');
            });
    };
}

function fecharModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

window.onclick = function (event) {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
        fecharModal();
    }
};
