async function gerarAgendaEstatica() {
  const diasCalendario = document.getElementById("calendarDays");
  diasCalendario.innerHTML = "";

  const diasDaSemana = ["segunda", "terça", "quarta", "quinta", "sexta", "sabado", "domingo"];

  let eventos = [];
  try {
    const response = await fetch("http://localhost:3000/api/groups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Success:", data);
    eventos = data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  const eventosPorDia = {
    segunda: [],
    terça: [],
    quarta: [],
    quinta: [],
    sexta: [],
    sabado: [],
    domingo: []
  };

  eventos.forEach((evento) => {
    const diaIndex = (diasDaSemana.indexOf(evento.week_day)) % 7; // Adjust the day index
    const dia = diasDaSemana[diaIndex];

    if (eventosPorDia[dia]) {
      const porcentagem = (evento.registered_members / evento.max_members) * 100;
      let classe = "";
      if (porcentagem < 50) {
        classe = "event vinteCinco";
      } else if (porcentagem < 75) {
        classe = "event cinquenta";
      } else if(porcentagem < 100) {
        classe = "event setentaCinco";
      } else{
        classe = "event cem";
      }
      eventosPorDia[dia].push({
        nome: evento.name,
        time: evento.time,
        title: `Máximo: ${evento.max_members} pessoas`,
        class: classe,
        max_members: evento.max_members,
        registered_members: evento.registered_members,
        instructor: evento.instructor
      });
    }
  });

  // Gerar a agenda
  try {
    diasDaSemana.forEach((dia) => {
      const elementoDia = document.createElement("div");
      elementoDia.innerHTML = `<h2 style="border: solid 1px #000; padding: 5px;  margin: 0; text-align:center;">${dia.slice(0,3)}</h2>`;
      elementoDia.classList.add("day");

      eventosPorDia[dia].forEach((evento) => {
        const elementoEvento = document.createElement("div");
        elementoEvento.innerHTML = `<p>${evento.time} - ${evento.title} - Instrutor: ${evento.instructor}</p>`;
        elementoEvento.classList.add(...evento.class.split(" "));
        elementoEvento.onclick = () => showPopup(evento); // Add click event listener
        elementoDia.appendChild(elementoEvento);
      });

      diasCalendario.appendChild(elementoDia);
    });
  } catch (error) {
    console.error("Error generating agenda:", error);
  }
}

// Function to create and display the popup
function showPopup(evento) {
  // Create popup elements
  const popup = document.createElement("div");
  popup.classList.add("popup");

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => popup.remove();

  const eventDetails = `
    <h2>${evento.title}</h2>
    <p>Horário: ${evento.time}</p>
    <p><strong>Nome:</strong> ${evento.nome}</p>
    <p><strong>Horário:</strong> ${evento.time || 'N/A'}</p>
    <p><strong>Max Participantes: </strong> ${evento.max_members || 'N/A'} pessoas</p>
    <p>Quantidade de participantes registrados: ${evento.registered_members}</p>
    <p>Instrutor: ${evento.instructor}</p>
  `;

  popupContent.innerHTML = eventDetails;
  popupContent.appendChild(closeBtn);
  popup.appendChild(popupContent);
  document.body.appendChild(popup);
}

gerarAgendaEstatica();