import { registerUser, loginUser } from "./auth.js";

const cards = document.querySelectorAll(".role-card");
const roleInput = document.getElementById("role");
const form = document.getElementById("register-form");
const errorMsg = document.getElementById("errorMsg");

function setActiveRoleCard(activeCard) {
  cards.forEach((card) => {
    card.classList.remove("border-blue-500", "ring-2", "ring-blue-500");
    card.classList.add("border-gray-300");
  });

  activeCard.classList.remove("border-gray-300");
  activeCard.classList.add("border-blue-500", "ring-2", "ring-blue-500");
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    roleInput.value = card.id;
    setActiveRoleCard(card);
    errorMsg.textContent = "";
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorMsg.textContent = "";

  const role = roleInput.value;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (!role) {
    errorMsg.textContent = "Please select a role";
    return;
  }

  if (!name || !email || !password || !confirm) {
    errorMsg.textContent = "Please complete all fields";
    return;
  }

  try {
    registerUser(role, name, email, password, confirm).then( //used then to make sure the promise is properly solved before trying to log in
      async ()=>{ //Make login instead of redirecting to login page
        const user = await loginUser(email, password);
        localStorage.setItem("session", JSON.stringify(user));
        if (user.userType === "company") {
          window.location.href = "/pages/company/dashboard.html";
        } else {
          window.location.href = "/pages/user/candidate-dashboard.html";
        }
      }
    )

  } catch (err) {
    errorMsg.textContent = err?.message || "Registration failed. Please try again.";
  }
});
