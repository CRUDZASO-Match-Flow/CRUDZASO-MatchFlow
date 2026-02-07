const cards = document.querySelectorAll(".candidate-card");

const mainAvatar = document.getElementById("mainAvatar");
const mainName = document.getElementById("mainName");
const mainRole = document.getElementById("mainRole");

const modal = document.getElementById("profileModal");
const openBtn = document.getElementById("openProfile");
const closeBtn = document.getElementById("closeModal");

const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");

let selectedCandidate = {
  name: mainName.textContent,
  role: mainRole.textContent,
  img: mainAvatar.src
};

// Cambiar candidato
cards.forEach(card => {
  card.addEventListener("click", () => {

    selectedCandidate = {
      name: card.dataset.name,
      role: card.dataset.role,
      img: card.dataset.img
    };

    mainName.textContent = selectedCandidate.name;
    mainRole.textContent = selectedCandidate.role;
    mainAvatar.src = selectedCandidate.img;

    cards.forEach(c => c.classList.remove("border-indigo-300", "bg-indigo-50"));
    card.classList.add("border-indigo-300", "bg-indigo-50");
  });
});

// Abrir modal
openBtn.addEventListener("click", () => {
  modalName.textContent = selectedCandidate.name;
  modalRole.textContent = selectedCandidate.role;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

// Cerrar modal
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});