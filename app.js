const ADMIN_EMAIL = "admin@premier_fitness";
const ADMIN_PASS = "1234";

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    localStorage.setItem("auth", "1");
    showApp();
  } else {
    document.getElementById("msg").innerText = "Date greșite";
  }
}

function logout() {
  localStorage.removeItem("auth");
  location.reload();
}

function showApp() {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";
  loadMembers();
}

if (localStorage.getItem("auth") === "1") {
  showApp();
}

function addMember() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  let members = JSON.parse(localStorage.getItem("members") || "[]");

  members.push({ name, phone, start, end });

  localStorage.setItem("members", JSON.stringify(members));

  loadMembers();
}

function loadMembers() {
  let members = JSON.parse(localStorage.getItem("members") || "[]");

  const list = document.getElementById("list");
  list.innerHTML = "";

  members.forEach(m => {
    const now = new Date();
    const exp = new Date(m.end);

    let status = "🟢 Activ";
    if (exp < now) status = "🔴 Expirat";

    list.innerHTML += `
      <div class="member">
        <b>${m.name}</b><br>
        📞 ${m.phone}<br>
        📅 ${m.start} → ${m.end}<br>
        ${status}
      </div>
    `;
  });
}