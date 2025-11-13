import crypto from "crypto";

export function EncryptPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export function ComparePassword(password: string, hash: string): boolean {
    return crypto.createHash('sha256').update(password).digest('hex') === hash;
}