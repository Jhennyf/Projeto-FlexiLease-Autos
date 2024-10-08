import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { Express } from 'express';

const swaggerDocument = YAML.load(
  path.resolve(__dirname, './docs/swagger.yaml'),
);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
