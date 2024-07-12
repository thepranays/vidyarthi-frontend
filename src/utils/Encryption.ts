import Cryptr from "cryptr";
/*encrypt & decrypt given string*/
export function encryptToken(text: string) {
    const secretKey = `${process.env.NEXTAUTH_SECRET}`;
    const crypter = new Cryptr(secretKey);

    const encryptedToken = crypter.encrypt(text);
    return encryptedToken;
}


export function decryptToken(text: string) {
    const secretKey = `${process.env.NEXTAUTH_SECRET}`;

    const crypter = new Cryptr(secretKey);

    const decryptedToken = crypter.decrypt(text);

    return decryptedToken;
}