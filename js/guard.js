export function requireAuth(requiredRole = null) {
    const session = JSON.parse(localStorage.getItem("session"));
    console.log("called")
    if (!session) {
        window.location.href = "/pages/login.html";
        return;
    }

    if (requiredRole && session.role !== requiredRole) {
        
        if (session.role === "company") {
        window.location.href = "...";
        } else {
        window.location.href = "...";
        }
    }
}
