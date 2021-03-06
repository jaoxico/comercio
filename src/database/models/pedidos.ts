import {DataTypes, Model, NOW, Sequelize, UUIDV4} from "sequelize";
import {Clientes} from "./clientes";

class classPedidos extends Model {}

const Pedidos = (connection: Sequelize) => {

    const clientes = Clientes(connection);

    classPedidos.init(
        {
            "codigo": {
                "defaultValue": UUIDV4,
                "primaryKey": true,
                "type": DataTypes.UUID,
                "validate": {
                    "isUUID": 4
                }
            },
            "data": {
                "type": DataTypes.DATE,
                "defaultValue": NOW
            },
            "observacao": {
                "type": DataTypes.TEXT
            },
            "pagamento": {
                "type": DataTypes.ENUM(
                    "dinheiro",
                    "cartão",
                    "cheque"
                ),
                "allowNull": false,
                "validate": {
                    "isIn": [
                        [
                            "dinheiro",
                            "cartão",
                            "cheque"
                        ]
                    ]
                }
            },
            "cliente": {
                "type": DataTypes.UUID,
                "references": {
                    "model": clientes,
                    "key": "Codigo"
                },
                "onDelete": "restrict"
            }
        },
        {
            "sequelize": connection,
            "modelName": "Pedidos"
        }
    );
    return classPedidos;

};

export {classPedidos, Pedidos};
