const homeDomain = "http://localhost:8080";

fetchEmployees();

document
  .getElementById("employeeForm")
  .addEventListener("submit", postFormData);
document.querySelector(".post-update-button").onclick = updateEmployee;
document.querySelector(".cancel-update-button").onclick = toggleUpdateContainer;
document.querySelector(".confirm-deletion-button").onclick = deleteEmployee;
document.querySelector(".cancel-deletion-button").onclick =
  toggleConfirmationContainer;

async function fetchEmployees() {
  // TODO: Integration with backend
  // const response = await fetch(`${homeDomain}/v1/employee`,
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
      name: "Viagem legal organizados",
      address: "Rua da Salvação, 123, Rio de Janeiro",
    },
    {
      id: "130tbvg302t8dethjk",
      name: "Posto viagem show",
      address: "Avenida Bandeira vermelha, 123, Rio de Janeiro",
    },
  ];

  if (response.status === 200 && data.length) insertIntoTable(data);
  else insertEmptyMessage();
}

// Function to add employee to the table
function insertIntoTable(data) {
  data.forEach((employee, index) => {
    const tableBody = document
      .getElementById("outlet-table")
      .getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    const idCell = newRow.insertCell(0);
    idCell.innerHTML = employee.id;

    const nameCell = newRow.insertCell(1);
    nameCell.innerHTML = employee.name;

    const emailCell = newRow.insertCell(2);
    emailCell.innerHTML = employee.address;

    const actionCell = newRow.insertCell(3);
    actionCell.innerHTML = `
      <div class="card-button-container">
        <button class="update-button" id="update-button-${index}" data-id="${employee.id}">Atualizar</button>
        <button class="delete-button" id="delete-button-${index}" data-id="${employee.id}">Apagar</button>
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
  const tableBody = document.getElementById("employeeTable");

  const html = `
    <div class="card" id="card">
      <p>Sem funcionários cadastrados.</p>
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
  const result = await fetch(`${homeDomain}/v1/employee`, {
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

async function updateEmployee() {
  const nameInputId = "update-name";
  const addressInputId = "update-address";
  const typeInputId = "update-type";

  const data = fetchFormData(nameInputId, addressInputId, typeInputId);

  data.id = this.dataset.id;

  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/employee/update`, {
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

async function deleteEmployee() {
  const data = {
    id: this.dataset.id,
  };
  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/employee/update`, {
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
