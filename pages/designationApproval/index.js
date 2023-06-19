const homeDomain = "http://localhost:8080";

fetchDesignations();

document.querySelector(".confirm-approval-button").onclick = approveDesignation;
document.querySelector(".cancel-approval-button").onclick =
  toggleApprovalContainer;
document.querySelector(".confirm-refusal-button").onclick = refuseDesignation;
document.querySelector(".cancel-refusal-button").onclick =
  toggleRefusalContainer;

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

    const designationIdCell = newRow.insertCell(0);
    designationIdCell.innerHTML = designation.designationId;

    const outletIdCell = newRow.insertCell(1);
    outletIdCell.innerHTML = designation.outletId;

    const actionCell = newRow.insertCell(2);
    actionCell.innerHTML = `
      <div class="table-button-container">
        <button class="approval-button" id="approval-button-${index}" data-id="${designation.id}">Aprovar</button>
        <button class="refusal-button" id="refusal-button-${index}" data-id="${designation.id}">Recusar</button>
      </div>
    `;
    document
      .getElementById(`approval-button-${index}`)
      .addEventListener("click", toggleApprovalContainer);
    document
      .getElementById(`refusal-button-${index}`)
      .addEventListener("click", toggleRefusalContainer);
  });
}

function insertEmptyMessage() {
  const tableBody = document.getElementById("designation-table");
  const html = `
    <div class="card" id="card">
      <p>Sem designações cadastradas.</p>
    </div>
  `;
  tableBody.insertAdjacentHTML("afterend", html);
}

// Event listeners
function toggleApprovalContainer() {
  const approveContainer = document.getElementById("approval");

  if (approveContainer.style.display === "none") {
    approveContainer.style.display = "flex";
    const approveButton = document.querySelector(".confirm-approval-button");
    approveButton.dataset.id = this.dataset.id;
  } else approveContainer.style.display = "none";
}

function toggleRefusalContainer() {
  const refuseContainer = document.getElementById("refusal");

  if (refuseContainer.style.display === "none") {
    refuseContainer.style.display = "flex";
    const refuseButton = document.querySelector(".confirm-refusal-button");
    refuseButton.dataset.id = this.dataset.id;
  } else refuseContainer.style.display = "none";
}

async function approveDesignation() {
  const employeeIdInputId = "approve-name";
  const outletIdInputId = "approve-address";
  const statusInputId = "approve-type";

  const data = fetchFormData(employeeIdInputId, outletIdInputId, statusInputId);

  data.id = this.dataset.id;

  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/designation/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (result.status === 200) {
    alert("Aprovado com sucesso.");
    location.reload();
  }
}

async function refuseDesignation() {
  const data = {
    id: this.dataset.id,
  };
  // TODO: Integration with backend
  const result = await fetch(`${homeDomain}/v1/designation/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (result.status === 200) {
    alert("Recusado com sucesso.");
    location.reload();
  }
}
