import { Sequelize } from "sequelize";

const Connector = (): Sequelize => {
    return new Sequelize(
        process.env.DATABASE,
        process.env.DATABASE_USERNAME,
        process.env.DATABASE_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            logging: false
        }
    );
};
export default Connector;