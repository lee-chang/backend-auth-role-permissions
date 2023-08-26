import path from 'path'
import dotenv from 'dotenv'

const envArgument = process.argv.find((arg) => arg.startsWith('env'))

const ENVIRONMENT = envArgument?.substring(4)?.split("'")?.join('')

const envFile = !ENVIRONMENT ? '.env' : `.env.${ENVIRONMENT}`
const envPath = path.resolve(__dirname, `../enviroments/${envFile}`)

dotenv.config({ path: envPath })

/**
 * Environment Constants
 */


const DEFAULT_PORT = 8000
const PORT =
  process.env.SERVER_PORT === undefined
    ? DEFAULT_PORT
    : Number.parseInt(process.env.SERVER_PORT)
const API_PREFIX =
  process.env.API_PREFIX === undefined ? 'api' : process.env.API_PREFIX
const API_VERSION =
  process.env.API_VERSION === undefined ? 'v1' : process.env.API_VERSION

const MONGODB_URI =
  process.env.MONGODB_URI === undefined ? '' : process.env.MONGODB_URI

// SMTP
const SMTP_HOST =
  process.env.SMTP_HOST === undefined ? '' : process.env.SMTP_HOST
const SMTP_PORT =
  process.env.SMTP_PORT === undefined ? '' : process.env.SMTP_PORT
const SMTP_USER =
  process.env.SMTP_USER === undefined ? '' : process.env.SMTP_USER
const SMTP_PASSWORD =
  process.env.SMTP_PASSWORD === undefined ? '' : process.env.SMTP_PASSWORD
const SMTP_FROM = process.env.SMTP_FROM === undefined ? '' : process.env.SMTP_FROM
const SMTP_ALIAS = process.env.SMTP_ALIAS === undefined ? '' : process.env.SMTP_ALIAS

// JWT
const JWT_SECRET =
  process.env.JWT_SECRET === undefined ? 'token' : process.env.JWT_SECRET

const NAME_STORAGE_TOKEN_JWT =
  process.env.NAME_STORAGE_TOKEN_JWT === undefined ? '' : process.env.NAME_STORAGE_TOKEN_JWT


  
export const ENV_CONFIG = {
  DEFAULT_PORT,
  PORT,
  ENVIRONMENT,
  API_PREFIX,
  API_VERSION,
  MONGODB_URI,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PORT,
  SMTP_FROM,
  SMTP_ALIAS,
  SMTP_PASSWORD,
  JWT_SECRET,
  NAME_STORAGE_TOKEN_JWT
}
