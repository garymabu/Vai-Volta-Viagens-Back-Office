// TODO: integração com o backend

const homeDomain = 'http://localhost:8080';

fetchBookings();

document.querySelector('.cancel-approval-button').onclick = toggleApprovalContainer;
document.querySelector('.cancel-deletion-button').onclick = toggleRemovalContainer;

async function fetchBookings() {

  // TODO: Integration with backend
  // const response = await fetch(`${homeDomain}/v1/bookings`,
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
      number: 12,
      timeTravel: 3,
      typeId: '12313',
      code: '13124',
      escale: true,
      createDate: '12/05/2034',
      status: 'Pendente',
      price: 300,
      originId: '12314',
      destinyId: '16567',
      clientId: '5255435',
      employeeId: '2255366546',

    },
    {
      id: "8230tbvg302t8",
      number: 12,
      timeTravel: 3,
      typeId: '12313',
      code: '13124',
      escale: true,
      createDate: '12/05/2034',
      status: 'Pendente',
      price: 300,
      originId: '12314',
      destinyId: '535346',
      clientId: '5255435',
      employeeId: '2255366546',
    },
    {
      id: "bvg302t8dethjk",
      number: 12,
      timeTravel: 3,
      typeId: '12313',
      code: '13124',
      escale: true,
      createDate: '12/05/2034',
      status: 'Pendente',
      price: 300,
      originId: '12314',
      destinyId: '15437',
      clientId: '5255435',
      employeeId: '2255366546',
    },
    {
      id: "wejkoprvyh4p",
      number: 12,
      timeTravel: 3,
      typeId: '12313',
      code: '13124',
      escale: true,
      createDate: '12/05/2034',
      status: 'Pendente',
      price: 300,
      originId: '12314',
      destinyId: '15513',
      clientId: '5255435',
      employeeId: '2255366546',
    },
  ];

  if (response.status === 200 && data.length) insertIntoTable(data);
  else insertEmptyMessage();

}

// Function to add employee to the table
function insertIntoTable(data) {

  data.forEach((booking, index) => {
    const tableBody = document.getElementById("bookingTable").getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    const idCell = newRow.insertCell(0);
    idCell.innerHTML = booking.id;

    const numberCell = newRow.insertCell(1);
    numberCell.innerHTML = booking.number;

    const timeTravelCell = newRow.insertCell(2);
    timeTravelCell.innerHTML = booking.timeTravel;

    const typeIdCell = newRow.insertCell(3);
    typeIdCell.innerHTML = booking.typeId;

    const codeCell = newRow.insertCell(4)
    codeCell.innerHTML = booking.code

    const escaleCell = newRow.insertCell(5)
    escaleCell.innerHTML = booking.escale === true ? 'Sim' : 'Não'

    const createDateCell = newRow.insertCell(6)
    createDateCell.innerHTML = booking.createDate

    const statusCell = newRow.insertCell(7)
    statusCell.innerHTML = booking.status

    const priceCell = newRow.insertCell(8)
    priceCell.innerHTML = booking.price

    const originIdCell = newRow.insertCell(9)
    originIdCell.innerHTML = booking.originId

    const destinyIdCell = newRow.insertCell(10)
    destinyIdCell.innerHTML = booking.destinyId

    const clientIdCell = newRow.insertCell(11)
    clientIdCell.innerHTML = booking.clientId

    const employeeIdCell = newRow.insertCell(12)
    employeeIdCell.innerHTML = booking.employeeId

    const actionCell = newRow.insertCell(13);
    actionCell.innerHTML =`
      <div class="card-button-container">
        <button class="approval-button" id="approval-button-${index}" data-id="${booking.id}">Aprovar</button>
        <button class="cancel-button" id="cancel-button-${index}" data-id="${booking.id}">Recusar</button>
      </div>
    `
    document.getElementById(`approval-button-${index}`).addEventListener('click', toggleApprovalContainer);
    document.getElementById(`cancel-button-${index}`).addEventListener('click', toggleRemovalContainer);

  })
}

function insertEmptyMessage() {
  const tableBody = document.getElementById("bookingTable");

  
  const html = `
    <div class="card" id="card">
      <p>Sem funcionários cadastrados.</p>
    </div>
  `;
  tableBody.insertAdjacentHTML('afterend', html)
}



function toggleApprovalContainer() { 
  
  const approvalContainer = document.getElementById('approval');
  
  if (approvalContainer.style.display === "none") {
    approvalContainer.style.display = "flex";
    const updateButton = document.querySelector(".confirm-approval-button");
    updateButton.dataset.id = this.dataset.id;
  }
  else approvalContainer.style.display = "none";
}

function toggleRemovalContainer() { 
  const removalContainer = document.getElementById('cancel');
  console.log(removalContainer)
  if (removalContainer.style.display === "none") {
    removalContainer.style.display = "flex";
    const deleteButton = document.querySelector(".confirm-deletion-button");
    deleteButton.dataset.id = this.dataset.id;
  } 
  else removalContainer.style.display = "none";
}

