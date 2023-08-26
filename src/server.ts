import app from './app'
import { ENV_CONFIG } from './config/env.config'

app.listen(ENV_CONFIG.PORT, () => {
  console.log('-----------------------------------------')
  console.log(`Server on PORT: ${ENV_CONFIG.PORT}`)
  console.log('-----------------------------------------')
})
