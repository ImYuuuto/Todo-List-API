import db from "../config/db.js";

async function searchForUser(userName: string) {
  const sql = "select * from users where userName=?";
  const [rows] = await db.execute(sql, [userName]);
  return rows;
}

async function addUser(userName: string, hashPassword: string) {
  const sql = "insert into users(userName, userPassword) values (?,?)";
  const [result] = await db.execute(sql, [userName, hashPassword]);
  return result;
}

export const authModel = {
  searchForUser,
  addUser,
};
export default authModel
