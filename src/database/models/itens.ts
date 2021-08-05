import { Sequelize, Model, DataTypes, UUIDV4 } from 'sequelize';
import { Pedidos } from './pedidos';
import { Produtos } from './produtos';

class classItens extends Model {}

const Itens = (connection: Sequelize) => {
  const pedidos = Pedidos(connection);
  const produtos = Produtos(connection);

  classItens.init(
    {
      codigo: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
      },
      pedido: {
        type: DataTypes.UUID,
        references: {
          model: pedidos,
          key: 'Codigo',
        },
        onDelete: 'restrict',
      },
      produto: {
        type: DataTypes.UUID,
        references: {
          model: produtos,
          key: 'Codigo',
        },
        onDelete: 'restrict',
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize: connection,
      modelName: 'Itens',
    },
  );
  return classItens;
};

export { classItens, Itens };
