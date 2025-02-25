import pgPromise from "pg-promise";

const pgp = pgPromise();
const db = pgp(`${process.env.DBCONECTION}`); // connection string

export async function get2FACode (CPF){
    const query = `
            SELECT t.CODE
            FROM public."TwoFactorCode" t
            JOIN public."User" u 
            ON t."userId" = u.id
            WHERE u."cpf" = '${CPF}'
            ORDER BY t.id DESC
            LIMIT 1;
    `;

    const result =  await db.oneOrNone(query);
    return result.code 

}