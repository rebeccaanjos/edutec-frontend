import { verifyToken } from "./utils/verify-token.js"
import { getName } from "./utils/get-name.js"

const url = "./login/login.html"

verifyToken(url)

const name = await getName()

