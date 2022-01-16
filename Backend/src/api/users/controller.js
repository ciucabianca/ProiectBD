import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../../app.js";

const queryGetUserById = (userId) => {
  const query = `SELECT * FROM \`users\` Where UserId="${userId}"`;
  console.log("Query get user", query);
  return query;
};

const queryGetUserByEmail = (userEmail) => {
  const query = `SELECT * FROM \`users\` Where Email="${userEmail}"`;
  console.log("Query get user", query);
  return query;
};

const queryCreateUser = (user) => {
  const query = `INSERT INTO \`users\`(\`UserId\`, \`LastName\`, \`FirstName\`, \`Email\`, \`Password\`, \`Role\`) VALUES ("${user.id}","${user.lastName}","${user.firstName}","${user.email}","${user.password}", "${user.role}")`;
  console.log("Query create user", query);
  return query;
};

const queryUpdateUser = (userId, firstName, lastName) => {
  const query = `UPDATE \`users\`
                SET users.FirstName='${firstName}', users.LastName='${lastName}'
                WHERE users.UserID='${userId}'`;

  console.log("Query update users", query);
  return query;
};

const queryDeleteUser = (userId) => {
  const query = `DELETE FROM \`users\` WHERE users.UserId='${userId}'`;

  console.log("Query delete user", query);
  return query;
};

export const getUserById = async (userId) => {
  const user = await query(queryGetUserById(userId));
  if (user.length) {
    return user[0];
  } else {
    return undefined;
  }
};

export const create = async (user) => {
  const duplicates = await query(queryGetUserByEmail(user.email));
  if (duplicates.length) {
    throw "duplicated";
  }
  user.id = uuid();
  user.role = "user";
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
      existingUser[0].Password
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

export const updateUser = async (userId, { firstName, lastName }) => {
  const user = await query(queryUpdateUser(userId, firstName, lastName));
  return { user };
};

export const deleteUser = async (userId) => {
  await query(queryDeleteUser(userId));
};

const jwtSignUser = (user) => {
  return jwt.sign(
    {
      userId: user.UserId,
      email: user.Email,
      role: user.Role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
