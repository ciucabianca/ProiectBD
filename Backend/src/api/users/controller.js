import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { query } from "../../app.js";

const queryGetUserByEmail = (userEmail) => {
  return `SELECT * FROM Utilizatori Where Email="${userEmail}"`;
};

const queryCreateUser = (user) => {
  return `INSERT INTO \`utilizatori\`(\`UtilizatorId\`, \`Nume\`, \`Prenume\`, \`Email\`, \`Parola\`) VALUES ("${user.id}","${user.nume}","${user.prenume}","${user.email}","${user.password}")`;
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
