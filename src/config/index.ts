import pino from 'pino';
import { configSchema } from './config.schema';

const logger = pino();

export interface ConfigInterface {
  server: {
    port: number;
    baseUrl: string;
  },
  token: {
    secret: string;
    expiresIn: string;
  }
}

const configData: ConfigInterface = {
  server: {
    port: parseInt(process.env.PORT, 10),
    baseUrl: process.env.BASE_URL || '/'
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expiresIn: process.env.TOKEN_EXP || '1h'
  }
}

export const config = ((): ConfigInterface => {
  const { value, error } = configSchema.validate(configData);

  if (error) {
    logger.error('Config validation error', error);
  }
  return value;
})();
