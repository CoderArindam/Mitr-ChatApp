import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;

const generateToken = (email, userId) => {
  const token = jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });

  return token;
};

export { maxAge, generateToken };
