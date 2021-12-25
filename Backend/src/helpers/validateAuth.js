import jwt from "jsonwebtoken";

export const validateAuth = (roles) => {
  roles.push("admin");
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "expired or invalid token" });
        } else {
          if (roles.includes(decoded.role)) {
            req.user = decoded;
            return next();
          } else {
            return res.status(401).json({ error: "invalid role" });
          }
        }
      });
    }
  };
};
