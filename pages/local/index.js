const homeDomain = 'http://localhost:8080';

fetchLocals();

document.getElementById("local-form").addEventListener("submit", postFormData);
document.querySelector('.post-update-button').onclick = updateLocal;
document.querySelector('.cancel-update-button').onclick = toggleUpdateContainer;
document.querySelector('.confirm-deletion-button').onclick = deleteLocal;
document.querySelector('.cancel-deletion-button').onclick = toggleConfirmationContainer;

function fetchFormData(cityInputId, airportInputId) {
  
  const city = document.getElementById(cityInputId).value;
  const airport = document.getElementById(airportInputId).value;
  
  document.getElementById("local-form").reset();

  return {
    city,
    airport
  };
}

async function fetchLocals() {

  // TODO: Integration with backend
  // const response = await fetch(`${homeDomain}/v1/Local`,
    // {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    //   body: JSON.stringify(token),
    // });
  // const { data } = result.json();

  const response = { status: 200 };

  // const data = [];

  const data = [
    {
      id: "130tbvg302t8",
      city: "RJ",
      airport: "GIG",
    },
    {
      id: "8230tbvg302t8",
      city: "RJ",
      airport: "GIG",
    },
    {
      id: "bvg302t8dethjk",
      city: "RJ",
      airport: "GIG",
    },
    {
      id: "wejkoprvyh4p",
      city: "RJ",
      airport: "GIG",
    },
  ];

  if (response.status === 200 && data.length) insertIntoTable(data);
  else insertEmptyMessage();

}

// Function to add Local to the table
function insertIntoTable(data) {

  data.forEach((local, index) => {
    const tableBody = document.getElementById("local-table").getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    const idCell = newRow.insertCell(0);
    idCell.innerHTML = local.id;

    const cityCell = newRow.insertCell(1);
    cityCell.innerHTML = local.city;

    const airportCell = newRow.insertCell(2);
    airportCell.innerHTML = local.airport;

    const actionCell = newRow.insertCell(3);
    actionCell.innerHTML =`
      <div class="card-button-container">
        <button class="update-button" id="update-button-${index}" data-id="${local.id}">Atualizar</button>
        <button class="delete-button" id="delete-button-${index}" data-id="${local.id}">Apagar</button>
      </div>
    `
    document.getElementById(`update-button-${index}`).addEventListener('click', toggleUpdateContainer);
    document.getElementById(`delete-button-${index}`).addEventListener('click', toggleConfirmationContainer);

  })
}

function insertEmptyMessage() {
  const tableBody = document.getElementById("local-table");

  
  const html = `
    <div class="card" id="card">
      <p>Sem pontos de venda cadastrados.</p>
    </div>
  `;
  tableBody.insertAdjacentHTML('afterend', html)
}

// Event listeners

async function postFormData(event) {
  event.preventDefault();

  const cityInputId = 'city';
  const airportInputId = 'airport';

  const data = fetchFormData(cityInputId, airportInputId);

  // TODO: Integration with backend
  const result = await fetch(
    `${homeDomain}/v1/local`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (result.status === 200) {
    alert("Registrado com sucesso.");
    location.reload();
  }
  
}

function toggleUpdateContainer() { 
  
  const updateContainer = document.getElementById('update');
  
  if (updateContainer.style.display === "none") {
    updateContainer.style.display = "flex";
    const updateButton = document.querySelector(".post-update-button");
    updateButton.dataset.id = this.dataset.id;
  }
  else updateContainer.style.display = "none";
}

function toggleConfirmationContainer() { 
  const deleteContainer = document.getElementById('delete');
  
  if (deleteContainer.style.display === "none") {
    deleteContainer.style.display = "flex";
    const deleteButton = document.querySelector(".confirm-deletion-button");
    deleteButton.dataset.id = this.dataset.id;
  }
  else deleteContainer.style.display = "none";
}

async function updateLocal() {
  
  const cityInputId = 'update-city';
  const airportInputId = 'update-airport';

  const data = fetchFormData(cityInputId, airportInputId);

  data.id = this.dataset.id;

    // TODO: Integration with backend
  const result = await fetch(
    `${homeDomain}/v1/local/update`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (result.status === 200) {
    alert("Atualiado com sucesso.");
    location.reload();
  }
}

async function deleteLocal() {
  const data = {
    id: this.dataset.id
  };
  // TODO: Integration with backend
  const result = await fetch(
    `${homeDomain}/v1/local/update`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (result.status === 200) {
    alert("Apagado com sucesso.");
    location.reload();
  }

}