import * as jose from "jose";

export interface AppConfig {
    jwtSecret: jose.KeyLike;
}