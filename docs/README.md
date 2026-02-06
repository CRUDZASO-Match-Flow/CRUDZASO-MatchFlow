# Notice
- The base webpage we received does not have all the functionalities and basic requirements done yet
- The logic for login and sign up is different
## Login logic
- We are going to adapt to the account storing logic the following way:
    - The users element in the db.json will be used as the gateway to login, it will store the user id, email, password and role, no more, it's only purporse will be to serve as the storing point for the login and sesion persistance logic
    - The candidate and company elements in the db.json will then store the id, which should be the same as inside users, and the public information, like description, matches, etc. 
## Functionalities missing
- The match does not work
- The users are not being loaded dinamically
- The companies can only edit parcially their profile
