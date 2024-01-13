import jwt from "jsonwebtoken";
const secret = "secretKey@1223";

export const setUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  // this will return token
  return jwt.sign(payload, secret, { expiresIn: "3d" });
  // TODO update this expiresIn time to 10s or 3d
};

export const getUser = (token) => {
  if (!token) return null;
  try {
    // this will return payload attached to this token
    // i.e. user
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
