import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: string, email: string) => {
    return jwt.sign({ id, email }, "jwtsecrete", {
        expiresIn: maxAge
    })
}

export default createToken;