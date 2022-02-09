// Add Details
const forms = document.querySelector(".forms");
const heading = document.querySelector("#form-heading");
const btn = document.querySelector("#btn");

const form = document.getElementById("form");
const fname = document.getElementById("Name");
const email = document.getElementById("Email");
const phone = document.getElementById("Phone");
const city = document.getElementById("City");
const country = document.getElementById("Country");

let data;
let UserList = [];

let currentPage = 1;
const page = document.getElementById("page");
page.innerText = currentPage;

// fetching data from Air table
(async function () {
  data = await fetch(
    "https://api.airtable.com/v0/appFxv4EL1Fd3jI4Y/Agency?api_key=keyNKqHcL56vfDNNn"
  ).then((response) => response.json());

  for (let i = 0; i < data.records.length; i++) {
    UserList.push(
      new RECORD(
        i + 1,
        data.records[i].id,
        data.records[i].fields.Name,
        data.records[i].fields.Email,
        data.records[i].fields.Phone,
        data.records[i].fields.City,
        data.records[i].fields.Country
      )
    );
  }
  display();
})();

class RECORD {
  constructor(index, id, Name, Email, Phone, City, Country) {
    this.index = index;
    this.id = id;
    this.Name = Name;
    this.Email = Email;
    this.Phone = Phone;
    this.City = City;
    this.Country = Country;
  }
}

function previous() {
  currentPage--;
  page.innerText = currentPage;
  display();
  search();
}
function next() {
  currentPage++;
  page.innerText = currentPage;
  display();
  search();
}

// display data
function display() {
  if (currentPage == 1) {
    document.getElementById("previous").disabled = true;
  } else {
    document.getElementById("previous").disabled = false;
  }
  if (currentPage == Math.ceil(UserList.length / 5)) {
    document.getElementById("next").disabled = true;
  } else {
    document.getElementById("next").disabled = false;
  }
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  for (
    let i = (currentPage - 1) * 5;
    i < currentPage * 5 && i < UserList.length;
    i++
  ) {
    addRow(UserList[i]);
  }
}

// Adding separate Row
function addRow(user) {
  const tableBody = document.getElementById("table-body");
  const tr = tableBody.insertRow(0);
  tr.innerHTML = `
    <td>${user.index}</td>
    <td class="name">${user.Name}</td>
    <td class="email">${user.Email}</td>
    <td class="phone">${user.Phone}</td>
    <td class="city">${user.City}</td>
    <td class="country">${user.Country}</td>
    <td style="display:none;" class="id">${user.id}</td>
    <td><button id="edit-btn" onclick="edit(this)">Edit</button> | <button id="delete-btn" onclick="del(this)">Delete</button>
    </td>`;
  tableBody.append(tr);
}

// ADD ITEM
function add() {
  forms.style.display = "block";
  heading.innerText = "Add New Agency";
  btn.value = "Add";

  fname.value = "";
  email.value = "";
  phone.value = "";
  city.value = "";
  country.value = "";

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    let counter = 0;
    for (let i = 0; i < data.records.length; i++) {
      if (data.records[i].fields.Email == email.value) {
        counter++;
      }
    }
    if (counter == 0) {
      await fetch(
        "https://api.airtable.com/v0/appFxv4EL1Fd3jI4Y/Agency?api_key=keyNKqHcL56vfDNNn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              Name: `${fname.value}`,
              Email: `${email.value}`,
              Phone: `${phone.value}`,
              City: `${city.value}`,
              Country: `${country.value}`,
            },
          }),
          typecast: true,
        }
      )
        .then((response) => response.json())
        .catch((err) => console.log(err));
      forms.style.display = "none";
      location.replace("/Dashboard/index.html");
    } else {
      document.querySelector(".msg").innerHTML =
        "This Email is already Registered. Please Use another!";
      document.querySelector(".msg").style.display = "block";
      setTimeout(() => {
        document.querySelector(".msg").style.display = "none";
      }, 2000);
    }
  });
}

// UPDATE ITEM
function edit(e) {
  heading.innerText = "Update Agency Detail";
  btn.value = "Update";
  forms.style.display = "block";
  const values = e.parentNode.parentNode.children;
  fname.value = values[1].innerText;
  email.value = values[2].innerText;
  phone.value = values[3].innerText;
  city.value = values[4].innerText;
  country.value = values[5].innerText;
  const id = values[6].innerText;
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    await fetch(`https://api.airtable.com/v0/appFxv4EL1Fd3jI4Y/Agency/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer keyNKqHcL56vfDNNn",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: `${fname.value}`,
          Email: `${email.value}`,
          Phone: `${phone.value}`,
          City: `${city.value}`,
          Country: `${country.value}`,
        },
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
    location.replace("/Dashboard/index.html");
  });
}

// DELETE ITEM
async function del(e) {
  const values = e.parentNode.parentNode.children;
  const id = values[6].innerText;
  await fetch(`https://api.airtable.com/v0/appFxv4EL1Fd3jI4Y/Agency/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer keyNKqHcL56vfDNNn",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
  location.replace("/Dashboard/index.html");
}

// form close icon
function closeIcon() {
  forms.style.display = "none";
}

// logout Button
function logout() {
  location.href = "../index.html";
}

// User Name
let index;
const emailName = JSON.parse(localStorage.getItem("active"));
const userList = JSON.parse(localStorage.getItem("users"));
for (let i = 0; i < userList.length; i++) {
  if (userList[i].Email == emailName) {
    index = i;
  }
}
document.getElementsByClassName("user-name")[0].innerText =
  userList[index].Name;

// Update User
function updateUser() {
  heading.innerText = "Update User Detail";
  btn.value = "Update";
  forms.style.display = "block";
  fname.value = userList[index].Name;
  email.value = userList[index].Email;
  phone.value = userList[index].Phone;
  city.value = userList[index].City;
  country.value = userList[index].Country;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    userList[index].Name = fname.value;
    userList[index].Email = email.value;
    userList[index].Phone = phone.value;
    userList[index].City = city.value;
    userList[index].Country = country.value;
    const active = email.value;
    localStorage.setItem("active", JSON.stringify(active));
    localStorage.setItem("users", JSON.stringify(userList));
    location.replace("/Dashboard/index.html");
  });
}

// Sorting All Things in One
function sort(e) {
  let value = "";
  value = e.classList.value;

  const icon = e.children[0].children[0].classList;

  if (icon.contains("fa-arrow-down")) {
    icon.remove("fa-arrow-down");
    icon.add("fa-arrow-up");
    if (value == "Index") {
      UserList.sort((a, b) => a.index - b.index);
    } else {
      UserList.sort((a, b) => {
        let x = a[value].toLowerCase();
        let y = b[value].toLowerCase();
        if (x < y) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    display();
  } else {
    icon.remove("fa-arrow-up");
    icon.add("fa-arrow-down");

    if (value == "Index") {
      UserList.sort((a, b) => b.index - a.index);
    } else {
      UserList.sort((a, b) => {
        let x = a[value].toLowerCase();
        let y = b[value].toLowerCase();
        if (x > y) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    display();
  }
}

// Searching By country
const input = document.getElementById("search");
input.addEventListener("input", debounce(300));
// Debouncing
function debounce(delay) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      search(context, args);
    }, delay);
  };
}

function search() {
  if (input.value.trim() == "") {
    display();
  } else {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    for (let x of UserList) {
      if (x.Country.toLowerCase().startsWith(input.value.toLowerCase())) {
        addRow(x);
      }
    }
  }
}
