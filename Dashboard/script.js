// Add Details
const form = document.querySelector(".forms");
const heading = document.querySelector("#form-heading");
const btn = document.querySelector("#submit-btn");
function add() {
  form.style.display = "block";
  heading.innerText = "Add New Agency";
  btn.value = "Add";
}

function edit(e) {
  form.style.display = "block";
  heading.innerText = "Update Agency Detail";
  btn.value = "Update";
  //   console.log(e.parent);
}

function closeIcon() {
  console.log("hii");
  form.style.display = "none";
}
