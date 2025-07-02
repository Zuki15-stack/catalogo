function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

document.getElementById("buscador").addEventListener("input", function () {
  const valor = this.value.toLowerCase();
  const tarjetas = document.querySelectorAll(".card");

  tarjetas.forEach((card) => {
    const texto = card.textContent.toLowerCase();
    card.style.display = texto.includes(valor) ? "block" : "none";
  });
});

function filtrarCategoria(categoria) {
  const tarjetas = document.querySelectorAll(".card");

  tarjetas.forEach((card) => {
    if (categoria === "todas") {
      card.style.display = "block";
    } else {
      card.style.display = card.classList.contains(categoria) ? "block" : "none";
    }
  });

  document.getElementById("sidebar").classList.remove("open");
}
