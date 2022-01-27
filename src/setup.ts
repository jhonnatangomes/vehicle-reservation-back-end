import dotenv from "dotenv";

let path = ".env.test";

if (process.env.NODE_ENV === "production") {
    path = ".env.production";
}
if (process.env.NODE_ENV === "development") {
    path = ".env.development";
}

dotenv.config({ path });
