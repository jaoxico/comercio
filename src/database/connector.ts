import { Sequelize } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2';

const databaseExists = async (configService: ConfigService): Promise<void> => {
  const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
  });
  await mysqlConnection
    .promise()
    .query(`create database if not exists ${configService.get('DATABASE')}`);
};

const Connector = (configService: ConfigService): Sequelize => {
  databaseExists(configService)
    .then(() => {
      return;
    })
    .catch((fail) => console.log(`failed: ${fail}`));
  const sequelize = new Sequelize(
    configService.get('DATABASE'),
    configService.get('DATABASE_USERNAME'),
    configService.get('DATABASE_PASSWORD'),
    {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    },
  );
  sequelize
    .sync({ logging: false })
    .then(() => {
      return;
    })
    .catch((fail) => console.log(`failed: ${fail}`));
  return sequelize;
};
export default Connector;
