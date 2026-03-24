db.createUser({
    user:"the_username",
    pwd:"the_password",
    roles: [
        {
            role: "dbOwner",
            db: "the_database",
        },
    ],
});

db.users.insert({
  username: "user",
  name: "user",
  passwordHash: "$2a$10$phsWApMjcnrKmQWoxk/EVO8WQ7ZIGou6X7xhuwv9x/L31k/GzUc.G",
})

