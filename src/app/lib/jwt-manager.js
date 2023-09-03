import { SignJWT } from "jose";
import { jwtVerify } from "jose";


export async function createToken(email) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    let token = await new SignJWT({ email: email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(process.env.JWT_ISSUER)
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
        .sign(secret);
    return token;
}

export async function verifyToken(token) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const decoded = await jwtVerify(token, secret)
    return decoded['payload'];
}