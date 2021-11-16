import {DataTypes, Model, Sequelize, UUIDV4} from "sequelize";

export class classClientes extends Model {
}

export const modelClientes = (connection: Sequelize) => {

    classClientes.init(
        {
            code: {
                defaultValue: UUIDV4,
                primaryKey: true,
                type: DataTypes.UUID,
                validate: {
                    isUUID: 4
                }
            },
            cpf: {
                allowNull: false,
                type: DataTypes.STRING(14),
                unique: true,
                validate: {
                    isValidCPF(number: string): boolean {

                        let rest = 0, sum = 0;
                        if (`${number}` === "00000000000") {
                            return false;
                        }

                        const numbers = [...Array(10).keys()];
                        numbers.shift();

                        numbers.forEach((value) => {
                            sum += parseInt(number.substring(value - 1, value), 10) * (11 - value);
                        });
                        rest = sum * 10 % 11;

                        if (rest === 10 || rest === 11) {
                            rest = 0;
                        }
                        if (rest !== parseInt(number.substring(9, 10), 10)) {
                            return false;
                        }

                        sum = 0;
                        [ ...numbers, 10].forEach((value) => {
                            sum += parseInt(number.substring(value - 1, value), 10) * (12 - value);
                        });
                        rest = sum * 10 % 11;

                        if (rest === 10 || rest === 11) {
                            rest = 0;
                        }
                        return rest === parseInt(number.substring(10, 11), 10);

                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                }
            },
            nome: {
                allowNull: false,
                type: DataTypes.STRING(50),
                validate: {
                    is: /^[A-Za-z].{3,}$/u
                }
            },
            sexo: {
                allowNull: false,
                type: DataTypes.ENUM(
                    "M",
                    "F"
                ),
                validate: {
                    is: /^[MF]$/u
                }
            }
        },
        {
            modelName: "Clientes",
            sequelize: connection
        }
    );
    return classClientes;

};