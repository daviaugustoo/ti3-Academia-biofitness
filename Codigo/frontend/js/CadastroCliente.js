document.getElementById('cadastroClienteForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const mensalidade = document.getElementById('subscription_fee').value; 
    const telefone = document.getElementById('telefone').value;
    const cpf = document.getElementById('cpf').value;
    const sexo = document.getElementById('sexo').value;
    const profissao = document.getElementById('profissao').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const problemaSaude = document.getElementById('problemaSaude').value;
    const objetivo = document.getElementById('objetivo').value;

    if (!nome || !telefone || !cpf || !sexo || !profissao || !dataNascimento || !problemaSaude || !objetivo) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Map gender to enum values
    const genderEnum = {
        'Mulher': 0,
        'Homem': 1,
        'Outro': 2
    };

    fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nome,
            subscription_fee: mensalidade,
            phone_number: telefone,
            cpf: cpf,
            gender: genderEnum[sexo], // Use the enum value
            job: profissao,
            birthday: dataNascimento,
            health_issues: problemaSaude,
            gym_goal: objetivo
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Cadastro realizado com sucesso!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Ocorreu um erro ao realizar o cadastro.');
    });
});