// Tab Change
function tabChange(e) {
  const tab = document.querySelectorAll(".tab");
  const signup = document.querySelector("#signup");
  const login = document.querySelector("#login");
  if (!e.classList.contains("active")) {
    for (let i = 0; i < tab.length; i++) {
      tab[i].classList.toggle("active");
    }
  }
  if (e.classList.contains("login")) {
    login.style.display = "block";
    signup.style.display = "none";
  } else {
    login.style.display = "none";
    signup.style.display = "block";
  }
}

// LogIn & SignUp Using Local Storage
const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");
const regPhone = document.getElementById("regPhone");
const regCity = document.getElementById("regCity");
const regCountry = document.getElementById("regCountry");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

document.getElementById("signup").addEventListener("submit", signup);
document.getElementById("login").addEventListener("submit", login);

var users = [];

function signup(e) {
  e.preventDefault();
  let local = JSON.parse(localStorage.getItem("users"));
  if (local == null) {
    users = [
      {
        Name: regName.value,
        Email: regEmail.value,
        Password: regPass.value,
        Phone: regPhone.value,
        City: regCity.value,
        Country: regCountry.value,
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));
    location.replace("/index.html");
  } else {
    // if (local[1] == undefined) {
    //   local = [local];
    // }
    let checkEmail;
    if (local[0] == null) {
      checkEmail = local.Email;
    } else {
      checkEmail = local.filter((data) => data["Email"] === regEmail.value);
    }

    if (checkEmail.length > 0) {
      document.querySelectorAll(".msg")[1].innerHTML =
        "This Email is already Registered. Please Use another!";
      document.querySelectorAll(".msg")[1].style.display = "block";
      setTimeout(() => {
        document.querySelectorAll(".msg")[1].style.display = "none";
      }, 2000);
      JSON.parse(localStorage.getItem("users"));
    } else {
      local.push({
        Name: regName.value,
        Email: regEmail.value,
        Password: regPass.value,
        Phone: regPhone.value,
        City: regCity.value,
        Country: regCountry.value,
      });
      localStorage.setItem("users", JSON.stringify(local));
      alert("SIGN UP SuccessFully");
      location.replace("/index.html");
    }
  }

  regName.value = "";
  regEmail.value = "";
  regPass.value = "";
  regPhone.value = "";
  regCity.value = "";
  regCountry.value = "";
}

function login(e) {
  e.preventDefault();
  let usersList = JSON.parse(localStorage.getItem("users"));
  if (usersList.length > 0) {
    // const usersEmail = usersList.map((data) => data["Email"]);
    // const usersPassword = usersList.map((data) => data["Password"]);

    const isValidUser = usersList.filter(
      (data) =>
        data["Email"] === loginEmail.value &&
        data["Password"] === loginPassword.value
    );

    if (isValidUser.length > 0) {
      const active = loginEmail.value;
      localStorage.setItem("active", JSON.stringify(active));
      location.replace("/Dashboard/index.html");
    } else {
      document.querySelectorAll(".msg")[0].innerHTML =
        "Invalid login credentials. Please Try again!";
      document.querySelectorAll(".msg")[0].style.display = "block";
      setTimeout(() => {
        document.querySelectorAll(".msg")[0].style.display = "none";
      }, 2000);
    }
  } else {
    document.querySelectorAll(".msg")[0].innerHTML =
      "No Data Found. Please Sign Up!";
    document.querySelectorAll(".msg")[0].style.display = "block";
    setTimeout(() => {
      document.querySelectorAll(".msg")[0].style.display = "none";
    }, 2000);
  }

  loginEmail.value = "";
  loginPassword.value = "";
}
