import {Sequelize} from "sequelize";

const connector = (): Sequelize => new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        "dialect": "mysql",
        "host": "localhost",
        "logging": false
    }
);
export default connector;