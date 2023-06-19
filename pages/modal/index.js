const homeDomain = "http://localhost:8080";

fetchModals();

document.getElementById("modal-form").addEventListener("submit", postFormData);
document.querySelector(".post-update-button").onclick = updatemodal;
document.querySelector(".cancel-update-button").onclick = toggleUpdateContainer;
document.querySelector(".confirm-deletion-button").onclick = deletemodal;
document.querySelector(".cancel-deletion-button").onclick =
  toggleConfirmationContainer;

function fetchFormData(
  typeInputId,
  codeInputId,
  modelInputId,
  capacityInputId,
  manufactureYearInputId,
  companyNameInputId,
  activeInputId
) {
  const type = document.getElementById(typeInputId).value;
  const code = document.getElementById(codeInputId).value;
  const model = document.getElementById(modelInputId).value;
  const capacity = document.getElementById(capacityInputId).value;
  const manufactureYear = document.getElementById(manufactureYearInputId).value;
  const companyName = document.getElementById(companyNameInputId).value;
  const active = document.getElementById(activeInputId).value;

  document.getElementById("modalForm").reset();

  return {
    type,
    code,
    model,
    capacity,
    manufactureYear,
    companyName,
    active,
  };
}

async function fetchModals() {
  // TODO: Integration with backend
  // const response = await fetch(`${homeDomain}/v1/modal`,
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
      id: "8230tbvg302t8",
      type: "Ônibus",
      code: 23562345,
      model: "Bem Grande",
      capacity: "50",
      manufactureYear: "1693",
      companyName: "Rothschild",
      active: true,
    },
    {
      id: "t24by24ynb2",
      type: "Ônibus",
      code: 223451213,
      model: "Pequeno",
      capacity: "50",
      manufactureYear: "1693",
      companyName: "Rothschild",
      active: true,
    },
  ];

  if (response.status === 200 && data.length) insertIntoTable(data);
  else insertEmptyMessage();
}

// Function to add modal to the table
function insertIntoTable(data) {
  data.forEach((modal, index) => {
    const tableBody = document
      .getElementById("modal-table")
      .getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    const idCell = newRow.insertCell(0);
    idCell.innerHTML = modal.id;

    const typeCell = newRow.insertCell(1);
    typeCell.innerHTML = modal.type;

    const codeCell = newRow.insertCell(2);
    codeCell.innerHTML = modal.code;

    const modelCell = newRow.insertCell(3);
    modelCell.innerHTML = modal.model;

    const capacityCell = newRow.insertCell(4);
    capacityCell.innerHTML = modal.capacity;

    const manufactureYearCell = newRow.insertCell(5);
    manufactureYearCell.innerHTML = modal.manufactureYear;

    const companyNameCell = newRow.insertCell(6);
    companyNameCell.innerHTML = modal.companyName;

    const activeCell = newRow.insertCell(7);
    activeCell.innerHTML = modal.active;

    const actionCell = newRow.insertCell(8);
    actionCell.innerHTML = `
      <div class="card-button-container">
        <button class="update-button" id="update-button-${index}" data-id="${modal.id}">Atualizar</button>
        <button class="delete-button" id="delete-button-${index}" data-id="${modal.id}">Apagar</button>
      </div>
    `;
    document
      .getElementById(`update-button-${index}`)
      .addEventListener("click", toggleUpdateContainer);
    document
      .getElementById(`delete-button-${index}`)
      .addEventListener("click", toggleConfirmationContainer);
  });
}

function insertEmptyMessage() {
  const tableBody = document.getElementById("modalTable");

  const html = `
    <div class="card" id="card">
      <p>Sem modais cadastrados.</p>
    </div>
  `;
  tableBody.insertAdjacentHTML("afterend", html);
}

// Event listeners

async function postFormData(event) {
  event.preventDefault();

  const typeInputId = "type";
  const codeInputId = "code";
  const modelInputId = "model";
  const capacityInputId = "capacity";
  const manufactureYearInputId = "manufactureYear";
  const companyNameInputId = "companyName";
  const activeInputId = "active";

  const data = fetchFormData(
    typeInputId,
    codeInputId,
    modelInputId,
    capacityInputId,
    manufactureYearInputId,
    companyNameInputId,
    activeInputId
  );

  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/modal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (result.status === 200) {
    alert("Registrado com sucesso.");
    location.reload();
  }
}

function toggleUpdateContainer() {
  const updateContainer = document.getElementById("update");

  if (updateContainer.style.display === "none") {
    updateContainer.style.display = "flex";
    const updateButton = document.querySelector(".post-update-button");
    updateButton.dataset.id = this.dataset.id;
  } else updateContainer.style.display = "none";
}

function toggleConfirmationContainer() {
  const deleteContainer = document.getElementById("delete");

  if (deleteContainer.style.display === "none") {
    deleteContainer.style.display = "flex";
    const deleteButton = document.querySelector(".confirm-deletion-button");
    deleteButton.dataset.id = this.dataset.id;
  } else deleteContainer.style.display = "none";
}

async function updatemodal() {
  const typeInputId = "update-type";
  const codeInputId = "update-code";
  const modelInputId = "update-model";
  const capacityInputId = "update-capacity";
  const manufactureYearInputId = "update-manufactureYear";
  const companyNameInputId = "update-companyName";
  const activeInputId = "update-active";

  const data = fetchFormData(
    typeInputId,
    codeInputId,
    modelInputId,
    capacityInputId,
    manufactureYearInputId,
    companyNameInputId,
    activeInputId
  );

  data.id = this.dataset.id;

  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/modal/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (result.status === 200) {
    alert("Atualiado com sucesso.");
    location.reload();
  }
}

async function deletemodal() {
  const data = {
    id: this.dataset.id,
  };
  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/modal/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (result.status === 200) {
    alert("Apagado com sucesso.");
    location.reload();
  }
}
