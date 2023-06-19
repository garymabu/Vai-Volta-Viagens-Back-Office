const homeDomain = "http://localhost:8080";

fetchDesignations();

document
  .getElementById("designation-form")
  .addEventListener("submit", postFormData);
document.querySelector(".post-update-button").onclick = updateDesignation;
document.querySelector(".cancel-update-button").onclick = toggleUpdateContainer;
document.querySelector(".confirm-deletion-button").onclick = deleteDesignation;
document.querySelector(".cancel-deletion-button").onclick =
  toggleConfirmationContainer;

function fetchFormData(employeeIdInputId, outletIdInputId, statusInputId) {
  const employeeId = document.getElementById(employeeIdInputId).value;
  const outletId = document.getElementById(outletIdInputId).value;
  const status = document.getElementById(statusInputId).value;

  document.getElementById("designationForm").reset();

  return {
    employeeId,
    outletId,
    status,
  };
}

async function fetchDesignations() {
  // TODO: Integration with backend
  // const response = await fetch(`${homeDomain}/v1/designation`,
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
      designationId: "Yuri",
      outletId: "Avenida lemos de brito, 615",
      status: "Registrador de Modal",
    },
    {
      id: "130tbvg302t8",
      designationId: "Gustavo Abreu",
      outletId: "Almirante Baltazar, 194",
      status: "Cadastrador de Locais",
    },
    {
      id: "130tbvg302t8",
      designationId: "Joao Coimbra",
      outletId: "Fernandes Lima, 194",
      status: "Administrador",
    },
  ];

  if (response.status === 200 && data.length) insertIntoTable(data);
  else insertEmptyMessage();
}

// Function to add designation to the table
function insertIntoTable(data) {
  data.forEach((designation, index) => {
    const tableBody = document
      .getElementById("designation-table")
      .getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    const idCell = newRow.insertCell(0);
    idCell.innerHTML = designation.id;

    const designationIdCell = newRow.insertCell(1);
    designationIdCell.innerHTML = designation.designationId;

    const outletIdCell = newRow.insertCell(2);
    outletIdCell.innerHTML = designation.outletId;

    const actionCell = newRow.insertCell(3);
    actionCell.innerHTML = `
      <div class="card-button-container">
        <button class="update-button" id="update-button-${index}" data-id="${designation.id}">Atualizar</button>
        <button class="delete-button" id="delete-button-${index}" data-id="${designation.id}">Apagar</button>
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
  const tableBody = document.getElementById("designationTable");

  const html = `
    <div class="card" id="card">
      <p>Sem designações cadastradas.</p>
    </div>
  `;
  tableBody.insertAdjacentHTML("afterend", html);
}

// Event listeners
async function postFormData(event) {
  event.preventDefault();

  const nameInputId = "name";
  const addressInputId = "address";
  const typeInputId = "type";

  const data = fetchFormData(nameInputId, addressInputId, typeInputId);

  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/designation`, {
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

async function updateDesignation() {
  const employeeIdInputId = "update-name";
  const outletIdInputId = "update-address";
  const statusInputId = "update-type";

  const data = fetchFormData(employeeIdInputId, outletIdInputId, statusInputId);

  data.id = this.dataset.id;

  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/designation/update`, {
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

async function deleteDesignation() {
  const data = {
    id: this.dataset.id,
  };
  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/designation/update`, {
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
