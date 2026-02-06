import {getUsers, getMatchesByCandidateId} from "./storage.js";
const users = await getUsers();
const avaiableUsers = []
for(const user of users){
    const matches = await getMatchesByCandidateId(user.id)
    if(matches.length>=1){
        continue
    }
    avaiableUsers.push(user)
}
console.log(avaiableUsers)