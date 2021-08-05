import { Sequelize, Model, DataTypes, UUIDV4 } from 'sequelize';

class classClientes extends Model {}

const Clientes = (connection: Sequelize) => {
  classClientes.init(
    {
      codigo: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        validate: {
          isUUID: 4,
        },
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(50),
        validate: {
          is: /^[A-Za-z].{3,}$/,
        },
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true,
        validate: {
          isValidCPF(number: string): boolean {
            let sum: number;
            let rest: number;
            sum = 0;
            if (`${number}` === '00000000000') return false;

            [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(
              (i) =>
                (sum = sum + parseInt(number.substring(i - 1, i)) * (11 - i)),
            );
            rest = (sum * 10) % 11;

            if (rest === 10 || rest == 11) rest = 0;
            if (rest != parseInt(number.substring(9, 10))) return false;

            sum = 0;
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((i) => {
              sum = sum + parseInt(number.substring(i - 1, i)) * (12 - i);
            });
            rest = (sum * 10) % 11;

            if (rest == 10 || rest == 11) rest = 0;
            return rest == parseInt(number.substring(10, 11));
          },
        },
      },
      sexo: {
        type: DataTypes.ENUM('M', 'F'),
        validate: {
          is: /^[MF]$/,
        },
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize: connection,
      modelName: 'Clientes',
    },
  );
  return classClientes;
};

export { classClientes, Clientes };
