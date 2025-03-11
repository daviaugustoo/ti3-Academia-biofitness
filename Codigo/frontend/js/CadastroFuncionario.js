document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroFuncionarioForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('name').value;
        const salario = document.getElementById('salary').value;
        const telefone = document.getElementById('phone_number').value;
        const cpf = document.getElementById('cpf').value;
        const endereco = document.getElementById('address').value;
        const dataNascimento = document.getElementById('birth_date').value;
        const cargo = document.getElementById('position').value;
        const inicioTurno = document.getElementById('begin_shift').value;
        const fimTurno = document.getElementById('end_shift').value;

        if (!nome || !salario || !telefone || !cpf || !endereco || !dataNascimento || !cargo || !inicioTurno || !fimTurno) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        fetch('http://localhost:3000/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nome,
                salary: salario,
                phone_number: telefone,
                cpf: cpf,
                address: endereco,
                birth_date: dataNascimento,
                position: cargo,
                begin_shift: inicioTurno,
                end_shift: fimTurno
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Cadastro realizado com sucesso!');
            form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Ocorreu um erro ao realizar o cadastro.');
        });
    });
});