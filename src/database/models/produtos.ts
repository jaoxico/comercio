import {Sequelize, Model, DataTypes, UUIDV4} from 'sequelize';

class classProdutos extends Model {}

const Produtos = (connection: Sequelize) => {

    classProdutos.init({
        codigo: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4
            }
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [2, 50]
            }
        },
        cor: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                len: [2, 20]
            }
        },
        tamanho: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                len: [1, 10]
            }
        },
        valor: {
            type: DataTypes.FLOAT(11, 2),
            allowNull: false
        }
    }, {
        sequelize: connection,
        modelName: 'Produtos'
    });
    return classProdutos;
};

export { classProdutos, Produtos };