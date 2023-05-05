import { jwtSecretPath } from "./env";
import { readFile } from "fs/promises";
import { importPKCS8 } from "jose";
import { AppConfig } from "../types/config";

export const getConfig = async (): Promise<AppConfig> => {
    const secretContent = await readFile(jwtSecretPath, "utf8");
    const jwtSecret = await importPKCS8(secretContent, "EdDSA");
    return { jwtSecret }
}