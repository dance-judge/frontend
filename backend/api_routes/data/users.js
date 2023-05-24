const admin = {
    name: "admin",
}
const judge = {
    name: "judge",
}
const screen = {
    name: "screen",
}

const users = [
    {
    id: 1,
    first_name: "admin",
    last_name: "admin",
    email: "admin@gmail.com",
    password: "$2a$12$2TMa/a52WIcSjTyrIzZq3eAgsw4K6Qx4koo14DHRnbr03Bc6ywpcO", //ternoviy
    role: admin,
    token: "",
    },
    {
        id: 2,
        first_name: "screen",
        last_name: "screen",
        email: "screen@gmail.com",
        password: "$2a$12$tSdMyxZjAuA/AtoYypEGTeacKTHqhW.ydaA9GFMS4h1AhUMm91xRm", //venec
        role: screen,
        token: "",
    },
    {
        id: 3,
        first_name: "judge",
        last_name: "judge",
        email: "judge@gmail.com",
        password: "$2a$12$9hxRSiT9H9RSMZMCTIzKnuT1PwQBkyFS8D5OplZ0NxIp.J.0sX1xC", //evoluciy
        role: judge,
        token: "",
    },

]

module.exports = [users];