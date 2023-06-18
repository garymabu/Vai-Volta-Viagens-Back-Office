const homeDomain = 'http://localhost:8080';

await fetchOutlets();

document.getElementById("outlet-form").addEventListener("submit", postFormData);
document.querySelector('.post-update-button').onclick = updateOutlet;
document.querySelector('.cancel-update-button').onclick = toggleUpdateContainer;
document.querySelector('.confirm-deletion-button').onclick = deleteOutlet;
document.querySelector('.cancel-deletion-button').onclick = toggleConfirmationContainer;

function fetchFormData(nameInputId, addressInputId) {
  
  const name = document.getElementById(nameInputId).value;
  const address = document.getElementById(addressInputId).value;
  
  document.getElementById("outlet-form").reset();

  return {
    name,
    address
  };
}

async function fetchOutlets() {

  // TODO: Integration with backend
  // const response = await fetch(`${homeDomain}/v1/Outlet`,
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
      name: "Zeca Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro",
    },
    {
      id: "8230tbvg302t8",
      name: "Mamou Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro",
    },
    {
      id: "bvg302t8dethjk",
      name: "Chupou Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro",
    },
    {
      id: "wejkoprvyh4p",
      name: "Fudeu Gado",
      address: "Rua da Macumba, 123, Rio de Janeiro",
    },
  ];

  if (response.status === 200 && data.length) insertIntoTable(data);
  else insertEmptyMessage();

}

// Function to add Outlet to the table
function insertIntoTable(data) {

  data.forEach((outlet, index) => {
    const tableBody = document.getElementById("outlet-table").getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    const idCell = newRow.insertCell(0);
    idCell.innerHTML = outlet.id;

    const nameCell = newRow.insertCell(1);
    nameCell.innerHTML = outlet.name;

    const emailCell = newRow.insertCell(2);
    emailCell.innerHTML = outlet.address;

    const actionCell = newRow.insertCell(3);
    actionCell.innerHTML =`
      <div class="card-button-container">
        <button class="update-button" id="update-button-${index}" data-id="${outlet.id}">Atualizar</button>
        <button class="delete-button" id="delete-button-${index}" data-id="${outlet.id}">Apagar</button>
      </div>
    `
    document.getElementById(`update-button-${index}`).addEventListener('click', toggleUpdateContainer);
    document.getElementById(`delete-button-${index}`).addEventListener('click', toggleConfirmationContainer);

  })
}

function insertEmptyMessage() {
  const tableBody = document.getElementById("outlet-table");

  
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

  const nameInputId = 'name';
  const addressInputId = 'address';

  const data = fetchFormData(nameInputId, addressInputId);

  // TODO: Integration with backend
  const result = await fetch(
    `${homeDomain}/v1/outlet`,
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

async function updateOutlet() {
  
  const nameInputId = 'update-name';
  const addressInputId = 'update-address';
  const typeInputId = 'update-type';

  const data = fetchFormData(nameInputId, addressInputId);

  data.id = this.dataset.id;

    // TODO: Integration with backend
  const result = await fetch(
    `${homeDomain}/v1/outlet/update`,
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

async function deleteOutlet() {
  const data = {
    id: this.dataset.id
  };
  // TODO: Integration with backend
  const result = await fetch(
    `${homeDomain}/v1/outlet/update`,
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