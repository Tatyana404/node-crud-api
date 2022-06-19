import 'dotenv/config'

module.exports = {
  env: {
    PORT_DEV: process.env.PORT_DEV,
    PORT_PROD: process.env.PORT_PROD
  }
}
