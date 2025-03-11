document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".menu");

  let menuHTML = `
      <a href="" class="logo">
          <div class="logoIMG">
              <img src="../assets/logoCut.jpg" alt="" />
          </div>
      </a>
      <a href="../html/GerenciaCliente.html" class="tags">
          <div>
              <p>Cliente</p>
          </div>
      </a>
      <a href="../html/GerenciaTurma.html" class="tags">
          <div>
              <p>Turma</p>
          </div>
      </a>
      <a href="../html/Agenda.html" class="tags">
          <div>
              <p>Agenda</p>
          </div>
      </a>
      <a href="../html/GerenciaFuncionario.html" class="tags" id="funcionario">
          <div >
              <p>Funcionário</p>
          </div>
      </a>
      <a href="../html/GerenciaPagamento.html" class="tags">
          <div>
              <p>Pagamento</p>
          </div>
      </a>
  `;

  menu.innerHTML = menuHTML;

  // Chama getUserType após o menu ser carregado no DOM
  getUserType();
});

function getUserType() {
  if (localStorage.getItem('cargo') !== 'admin') {
      const funcionarioElement = document.getElementById('funcionario');
      if (funcionarioElement) {
          funcionarioElement.setAttribute('style', 'display: none');
      } else {
          console.warn('Elemento com ID "funcionario" não encontrado.');
      }
  }
}
