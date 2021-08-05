import { Sequelize } from 'sequelize';
import { ConfigService } from '@nestjs/config';

const Connector = (configService: ConfigService): Sequelize => {
  return new Sequelize(
    configService.get('DATABASE'),
    configService.get('DATABASE_USERNAME'),
    configService.get('DATABASE_PASSWORD'),
    {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    },
  );
};
export default Connector;
