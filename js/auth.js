import * as cru from "./storage.js";

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export async function registerUser(role, name, email, password, confirm) {
  if (!role) {
    throw new Error("Please select a role");
  }

  if (password !== confirm) {
    throw new Error("Passwords do not match");
  }

  const safeEmail = normalizeEmail(email);

  const existing = await cru.getUsersByEmail(safeEmail);
  const emailTaken = existing.length > 0;

  if (emailTaken) {
    throw new Error("Email already registered");
  }

  if (role === "company") {
    const user = await cru.createUser({
      role: "company",
      email: safeEmail,
      password
    });

    return await cru.createCompany({
      id: user.id,
      name: String(name || "").trim(),
      industry: "",
      size: "",
      location: "",
      description: ""
    });
  }

  if (role === "candidate") {
    const user = await cru.createUser({
      role: "candidate",
      email: safeEmail,
      password
    });

    return await cru.createCandidate({
      id: user.id,  //changed to use the same id as user
      email: user.email,
      name: String(name || "").trim(),
      title: "",
      skills: [],
      openToWork: true,
      location: "",
      experienceYears: 0
    });
  }

  throw new Error("Invalid role");
}

export async function loginUser(email, password) {
  const safeEmail = normalizeEmail(email);

  const user = await cru.getUserByEmailAndPassword(safeEmail, password);
  if (!user) throw new Error("Invalid email or password");

  if (user.role === "company") {
    const profile = await cru.getCompanyByUserId(user.id);
    return { ...user, ...(profile || {})}; //Deleted userType, as role already exists
  }

  if (user.role === "candidate") {
    const profile = await cru.getCandidateByUserId(user.id);
    return { ...user, ...(profile || {})}; //deleted userType, as role already exists
  }

  throw new Error("Invalid role");
}

export async function addCandidateToOffer(offer_id, candidateId){
  const offer = await cru.getJobOfferById(offer_id);
  const candidate = await cru.getCandidateByUserId(candidateId);
  if(!candidate){
    console.error("ERROR, Candidate is null")
    return null
  }
  if(!offer){
    console.error("ERROR, offer is null")
  }
  if(Object.hasOwn(offer, "candidates")){
    offer.candidates.push(candidateId)
  } else{
    offer.candidates = [candidateId];
  }
  const response = cru.updateJobOffer(offer_id, {candidates : offer.candidates}) //Updates the candidates
  return response;

}