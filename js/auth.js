import { getUsers, createUsers } from "./storage.js";

export async function registerUser(role, email, password, confirm) {
    if(!role) {
        throw new Error("please select a role");
    };
    if(password != confirm){
        throw new Error("passwords do not match");
    };
    const users = await getUsers();

    const exists = users.find(u => u.email === email);
    if (exists){
        throw new Error("Email already registered");
    };  
    const newUser = {
        role,
        email,
        password,
    };
    return await createUsers(newUser);
}