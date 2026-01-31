const API = "https://localhost:3000/"


export async function getUsers() {
    try {
        const res = await fetch(`${API}/users`);
        return await res.json();
    } catch (e){
        console.log(e)
        return e
    }
}
export async function createUsers(user) {
    const res = await fetch(API, {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(user)
    });
    return await res.json();
}

