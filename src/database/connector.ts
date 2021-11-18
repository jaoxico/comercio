import { Sequelize } from 'sequelize';
import { ConfigService } from '@nestjs/config';

const Connector = (configService: ConfigService): Sequelize => {
  const sequelize = new Sequelize(
    configService.get('DATABASE'),
    configService.get('DATABASE_USERNAME'),
    configService.get('DATABASE_PASSWORD'),
    {
      host: 'localhost',
      dialect: 'mysql',
      logging: console.log,
    },
  );
  sequelize.sync({ logging: false }).then(() => {
    console.log('Sync done.');
  });
  return sequelize;
};
export default Connector;
