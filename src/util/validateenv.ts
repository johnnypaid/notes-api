// envalid is use to clean up and sanitize environment variables, server will exit if there is a missing variable
import { cleanEnv, port, str } from "envalid";
import "dotenv/config";

const env = cleanEnv(process.env, { MONGO_CONN_STR: str(), PORT: port() });

export default env;
