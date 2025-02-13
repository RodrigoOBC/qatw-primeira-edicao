import pgPromise from "pg-promise";

const pgp = pgPromise();
const db = pgp(`${process.env.DBCONECTION}`); // connection string

export async function get2FACode (){
    const query = `
            SELECT CODE
            FROM public."TwoFactorCode"
            ORDER BY id DESC
            LIMIT 1;
    `;

    const result =  await db.oneOrNone(query);
    return result.code 

}