const currentSession = JSON.parse(localStorage.getItem("session"));
const company = await getCompanyById(currentSession.id);

// if (!currentSession) {
//     window.location.href = "../../index.html";
// }

// if (currentSession.role !== "company") {
//     window.location.href = "../user/candidate-profile.html";
// }


// Buttons & Modal

const cancelEditBtn = document.getElementById("cancel-edit");
const logoutBtn = document.getElementById("logout-btn");
const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const editBtn = document.getElementById("edit-btn");


// Profile Display

const companyName = document.getElementById("company-name");
const companyLocation = document.getElementById("company-place");
const companyDes = document.getElementById("company-description");
const companyIndustry = document.getElementById("company-industry");
const companyEmployeesNum = document.getElementById("company-employees");


// Edit form inputs

const editName = document.getElementById("edit-name");
const editIndustry = document.getElementById("edit-industry");
const editLocation = document.getElementById("edit-location");
const editEmployees = document.getElementById("edit-employees-number");
const editDescription = document.getElementById("edit-description");


// initial Render

companyName.textContent = currentSession.name
companyLocation.textContent = company.location || "Location of the Company"
companyDes.textContent = company.description || "Here you can give a description of your company funtions to let the candidates kwon about you"
companyIndustry.textContent = company.industry || "Company insdustry"
companyEmployeesNum.textContent = company.size || "Amount of employees"


// Event Listeners

editBtn.addEventListener("click", () => {

    editName.value = currentSession.name;
    editIndustry.value = company.industry || "";
    editLocation.value = company.location || "";
    editEmployees.value = company.size || "";
    editDescription.value = company.description || "";

    editModal.className = "bg-gray-100 min-h-screen absolute inset-0 bg-black bg-opacity-60"
});

editForm.addEventListener("submit", async (e) => {
    e.preventDefault();


    const updates = {
        industry: editIndustry.value.trim() || company.industry,
        location: editLocation.value.trim() || company.location,
        size: editEmployees.value || company.size,
        description: editDescription.value.trim() || company.description
    };

    await updateCompany(company.id, updates);
    await updateCompanyName(currentSession, editName.value.trim() || currentSession.name);

    editModal.className = "hidden";
    location.reload();
});

logoutBtn.addEventListener("click", () => {
    clearSession()
    window.location.href = "../../index.html"
});

cancelEditBtn.addEventListener("click", () => {
    editModal.className = "hidden";
})


// API functions

async function updateCompany(company, updates) {
    await fetch(`http://localhost:3000/companies/${company.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
    });
}

async function updateCompanyName(companyUser, updates) {
    await fetch(`http://localhost:3000/users/${companyUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
    });
}

async function getCompanyById(userId) {
    const response = await fetch(
        `http://localhost:3000/companies?userId=${userId}`);
    const data = await response.json();
    return data[0];
}
