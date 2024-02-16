function establecerCookie(nombre, valor, segundos) {
  let expiracion = "";
  if (segundos) {
    let fecha = new Date();
    fecha.setTime(fecha.getTime() + segundos * 1000);
    expiracion = "; expires=" + fecha.toUTCString();
  }
  document.cookie = nombre + "=" + (valor || "") + expiracion + "; path=/";
}

function guardarCookies(evento) {
  evento.preventDefault();

  let idioma = document.getElementById("language").value;
  let tema = document.getElementById("theme").value;
  let usuario = document.getElementById("username").value;
  let preferencia = document.querySelector(
    'input[name="preference"]:checked',
  ).value;
  let fechaUsuario = document.getElementById("dateUser").value;

  establecerCookie("language", idioma, 10); // Expira a los 10 segundos
  establecerCookie("theme", tema, 15); // Expira a los 15 segundos
  establecerCookie("username", usuario, 20); // Expira a los 20 segundos
  establecerCookie("preference", preferencia); // No expira
  establecerCookie("dateUser", fechaUsuario); // No expira

  mostrarCookies(); // Actualizar la visualización de las cookies
}

function mostrarCookies() {
  let cookies = document.cookie.split(";");
  let cookiesDisplay = document.getElementById("cookiesDisplay");
  cookiesDisplay.innerHTML = "";
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let nombre = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    let valor = eqPos > -1 ? cookie.substr(eqPos + 1) : "";
    cookiesDisplay.innerHTML += `Cookie: ${nombre.trim()} | Valor: ${valor}<br>`;
  }
}

function borrarCookies() {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let nombre = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      nombre.trim() + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  mostrarCookies();
}

window.onload = function () {
  document
    .getElementById("cookieForm")
    .addEventListener("submit", guardarCookies);
  document
    .getElementById("deleteCookies")
    .addEventListener("click", borrarCookies);
  mostrarCookies();
  setInterval(mostrarCookies, 2000);
};