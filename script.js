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
