// Adiciona um evento ao formulário para capturar os dados quando for submetido
document.getElementById('classForm').addEventListener('submit', function (event) {
    // Previne o comportamento padrão de envio do formulário
    event.preventDefault();

    // Coleta os dados dos campos do formulário
    const nome = document.getElementById('modulo').value;
    const instruct = document.getElementById('instructor').value;
    const maxStu = document.getElementById('maxStudents').value;
    const horario = document.getElementById('time').value;
    const weekDay = document.getElementById('day').value;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !instruct || !maxStu || !horario || !weekDay) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    

    // Envia os dados para o servidor via AJAX
    fetch('http://localhost:3000/api/groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nome,
            instructor: instruct,
            max_members: maxStu,
            time: horario,
            week_day: parseInt(weekDay, 10)
            
        })
        
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Cadastro realizado com sucesso!');
        location.reload();
        // Aqui você pode adicionar código para tratar a resposta do servidor
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Ocorreu um erro ao realizar o cadastro.');
        // Aqui você pode adicionar código para tratar erros
    });
});
