const homeDomain = "http://localhost:8080";

const token = sessionStorage.getItem("token");
let selectedTripId = undefined;

fetchAndInsertTrips();

fetchAndInsertDestinations();
document.querySelector(".post-update-button").onclick = updateTrip;
document.querySelector(".cancel-update-button").onclick = toggleUpdateContainer;
document.querySelector(".cancel-deletion-button").onclick =
  toggleConfirmationContainer;
document.querySelector(".confirm-deletion-button").onclick = deleteTrip;

document
  .querySelector("#tripForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    createTrip();
  });

async function fetchAndInsertTrips() {
  // TODO: Integration with backend
  const response = await fetch(`${homeDomain}/v1/trip`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (response.status === 200 && data.length) {
    insertIntoTable(data);
  } else insertEmptyMessage();
}

// Function to add trip to the table
function insertIntoTable(trips) {
  trips.forEach((trip, index) => {
    const tableBody = document
      .getElementById("tripTable")
      .getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    const idCell = newRow.insertCell(0);
    idCell.innerHTML = trip.id;

    const horaChegadaCell = newRow.insertCell(1);
    horaChegadaCell.innerHTML = trip.arrivalDatetime;

    const horaSaidaCell = newRow.insertCell(2);
    horaSaidaCell.innerHTML = trip.departureDatetime;

    const destinoCell = newRow.insertCell(3);
    destinoCell.innerHTML = trip.departureLocalization.cityName;

    const chegadaCell = newRow.insertCell(4);
    chegadaCell.innerHTML = trip.arrivalLocalization.cityName;

    const valorCell = newRow.insertCell(5);
    valorCell.innerHTML = `R$ ${trip.tripValue}`;

    const actionCell = newRow.insertCell(6);
    actionCell.innerHTML = `
      <div class="card-button-container">
        <button onclick="toggleUpdateContainer('${trip.id}')" class="update-button" id="update-button-${index}" data-id="${trip.id}">Atualizar</button>
        <button onclick="setGlobalIdAndToggleConfirmationModal('${trip.id}')" class="delete-button" id="delete-button-${index}" data-id="${trip.id}">Apagar</button>
      </div>
    `;
  });
}

async function fetchAndInsertDestinations() {
  // const response = { status: 200 };

  // const data = [
  //   {
  //     id: "40a8feb1-0049-42a0-9c5f-700f6e6dc8cf",
  //     city: {
  //       identificador: "São Paulo",
  //     },
  //   },
  //   {
  //     id: "00fef623-007c-407c-8d0a-d47628882eef",
  //     city: {
  //       identificador: "Rio de Janeiro",
  //     },
  //   },
  // ];
  const response = await fetch(`${homeDomain}/v1/localization?size=100`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response.json()).content;

  if (response.status === 200 && data.length)
    insertLocalesIntoLocalizationSelects(data);
}

async function insertLocalesIntoLocalizationSelects(locale) {
  const localizationSelects = document.querySelectorAll(".localization");

  localizationSelects.forEach((select) => {
    locale.forEach((locale) => {
      const option = document.createElement("option");
      option.value = locale.id;
      option.innerHTML = locale.cityName;
      select.appendChild(option);
    });
  });
}

function insertEmptyMessage() {
  const tableBody = document.getElementById("tripTable");

  const html = `
    <div class="card" id="card">
      <p>Sem viagens cadastradas.</p>
    </div>
  `;
  tableBody.insertAdjacentHTML("afterend", html);
}

// Event listeners

async function fetchTripDataAndUpdateModal(id) {
  const response = await fetch(`${homeDomain}/v1/trip`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  const trip = data.find((trip) => trip.id === id);

  document.querySelector("#update-arrival").value = trip.arrivalDatetime;
  document.querySelector("#update-departure").value = trip.departureDatetime;
  document.querySelector("#update-origin").value =
    trip.departureLocalization.id;
  document.querySelector("#update-destination").value =
    trip.arrivalLocalization.id;
  document.querySelector("#update-value").value = trip.tripValue;
}

function setGlobalIdAndToggleConfirmationModal(id) {
  selectedTripId = id;
  toggleConfirmationContainer();
}
function toggleUpdateContainer(id) {
  const updateContainer = document.getElementById("update");

  console.log("display", updateContainer.style.display);

  if (updateContainer.style.display === "none") {
    updateContainer.style.display = "flex";
    const updateButton = document.querySelector(".post-update-button");
    updateButton.dataset.id = id;
    fetchTripDataAndUpdateModal(id);
  } else updateContainer.style.display = "none";
}

function toggleConfirmationContainer() {
  const deleteContainer = document.getElementById("delete");

  if (deleteContainer.style.display === "none") {
    deleteContainer.style.display = "flex";
  } else deleteContainer.style.display = "none";
}

async function updateTrip(e) {
  e.preventDefault();
  const id = document.querySelector(".post-update-button").dataset.id;
  const data = {
    arrivalDatetime: document.querySelector("#update-arrival").value,
    departureDatetime: document.querySelector("#update-departure").value,
    departureLocalizationId: document.querySelector("#update-origin").value,
    arrivalLocalizationId: document.querySelector("#update-destination").value,
    tripValue: Number(document.querySelector("#update-value").value),
  };
  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/trip/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (result.status === 200) {
    alert("Atualiado com sucesso.");
    location.reload();
  }
}

async function deleteTrip() {
  const result = await fetch(`${homeDomain}/v1/trip/${selectedTripId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (result.status === 204) {
    alert("Apagado com sucesso.");
    location.reload();
  }
}

async function createTrip() {
  const arrivalDatetime = document.querySelector("#arrival").value;
  const departureDatetime = document.querySelector("#departure").value;
  const departureLocalizationId = document.querySelector("#origin").value;
  const arrivalLocalizationId = document.querySelector("#destination").value;
  const tripValue = document.querySelector("#value").value;

  const data = {
    arrivalDatetime,
    departureDatetime,
    departureLocalizationId,
    arrivalLocalizationId,
    tripValue,
  };

  const result = await fetch(`${homeDomain}/v1/trip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (result.status === 200) {
    alert("Criado com sucesso.");
    location.reload();
  }
}
