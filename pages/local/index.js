const homeDomain = "http://localhost:8080";

const token = sessionStorage.getItem("token");
let selectedLocalId = undefined;

fetchLocals();

document.getElementById("local-form").addEventListener("submit", postFormData);
document.querySelector(".post-update-button").onclick = updateLocal;
document.querySelector(".cancel-update-button").onclick = toggleUpdateContainer;
document.querySelector(".confirm-deletion-button").onclick = deleteLocal;
document.querySelector(".cancel-deletion-button").onclick =
  toggleConfirmationContainer;

function fetchFormData() {
  const cityName = document.getElementById("city").value;
  const airport = document.getElementById("airport").value;
  const cityId = document.getElementById("cityCode").value;
  const airportCode = document.getElementById("airportCode").value;

  document.getElementById("local-form").reset();

  return {
    cityName,
    airport,
    cityId,
    airportCode,
  };
}

async function fetchLocals() {
  const response = await fetch(`${homeDomain}/v1/localization?size=100`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response.json()).content;

  if (response.status === 200 && data.length) insertIntoTable(data);
  else insertEmptyMessage();
}

// Function to add Local to the table
function insertIntoTable(data) {
  data.forEach((local, index) => {
    const tableBody = document
      .getElementById("local-table")
      .getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    const idCell = newRow.insertCell(0);
    idCell.innerHTML = local.id;

    const cityIdCell = newRow.insertCell(1);
    cityIdCell.innerHTML = local.cityName;

    const cityCodeCell = newRow.insertCell(2);
    cityCodeCell.innerHTML = local.cityId;

    const airportCell = newRow.insertCell(3);
    airportCell.innerHTML = local.airportName;

    const airportCodeCell = newRow.insertCell(4);
    airportCodeCell.innerHTML = local.airportCode;

    const actionCell = newRow.insertCell(5);
    actionCell.innerHTML = `
      <div class="card-button-container">
        <button onclick="toggleUpdateContainer('${local.id}')"  class="update-button" id="update-button-${index}" data-id="${local.id}">Atualizar</button>
        <button onclick="toggleConfirmationContainer('${local.id}')" class="delete-button" id="delete-button-${index}" data-id="${local.id}">Apagar</button>
      </div>
    `;
    // document
    //   .getElementById(`update-button-${index}`)
    //   .addEventListener("click", toggleUpdateContainer);
    // document
    //   .getElementById(`delete-button-${index}`)
    //   .addEventListener("click", toggleConfirmationContainer);
  });
}

function insertEmptyMessage() {
  const tableBody = document.getElementById("local-table");

  const html = `
    <div class="card" id="card">
      <p>Sem pontos de venda cadastrados.</p>
    </div>
  `;
  tableBody.insertAdjacentHTML("afterend", html);
}

// Event listeners

async function postFormData(event) {
  event.preventDefault();

  const data = fetchFormData();

  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/localization`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (result.status === 200) {
    alert("Registrado com sucesso.");
    location.reload();
  }
}

function toggleUpdateContainer(id) {
  const updateContainer = document.getElementById("update");

  if (updateContainer.style.display === "none") {
    updateContainer.style.display = "flex";
    selectedLocalId = id;
  } else updateContainer.style.display = "none";
}

function toggleConfirmationContainer(id) {
  const deleteContainer = document.getElementById("delete");

  if (deleteContainer.style.display === "none") {
    deleteContainer.style.display = "flex";
    selectedLocalId = id;
  } else deleteContainer.style.display = "none";
}

async function updateLocal() {
  const id = selectedLocalId;

  const data = {
    cityName: document.querySelector("#update-city").value,
    airportName: document.querySelector("#update-airport").value,
    cityId: document.querySelector("#update-city-id").value,
    airportCode: document.querySelector("#update-airport-code").value,
  };

  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/localization/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (result.status === 200) {
    alert("Atualizado com sucesso.");
    location.reload();
  }
}

async function deleteLocal() {
  // TODO: Integration with backend
  const result = await fetch(
    `${homeDomain}/v1/localization/${selectedLocalId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (result.status === 200) {
    alert("Apagado com sucesso.");
    location.reload();
  }
}
