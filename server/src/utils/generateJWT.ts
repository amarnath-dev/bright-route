import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRETE as string, {
    expiresIn: maxAge,
  });
};

export default createToken;
