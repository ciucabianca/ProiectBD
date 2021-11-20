import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../../app.js";

const queryGetUserByEmail = (userEmail) => {
  return `SELECT * FROM \`dbo.utilizatori\` Where Email="${userEmail}"`;
};

const queryCreateUser = (user) => {
  return `INSERT INTO \`dbo.utilizatori\`(\`UtilizatorId\`, \`Nume\`, \`Prenume\`, \`Email\`, \`Parola\`) VALUES ("${user.id}","${user.nume}","${user.prenume}","${user.email}","${user.password}")`;
};

export const create = async (user) => {
  const duplicates = await query(queryGetUserByEmail(user.email));
  if (duplicates.length) {
    throw "duplicated";
  }

  user.id = uuid();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  await query(queryCreateUser(user));
  return { msg: "User created" };
};

export const login = async (credentials) => {
  const existingUser = await query(queryGetUserByEmail(credentials.email));

  if (existingUser.length) {
    const same = await bcrypt.compare(
      credentials.password,
      existingUser[0].Parola
    );
    if (same) {
      return jwtSignUser(existingUser[0]);
    } else {
      throw "password mismatch";
    }
  } else {
    throw "not found";
  }
};

const jwtSignUser = (user) => {
  return jwt.sign(
    {
      utilizatorId: user.UtilizatorId,
      email: user.Email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
