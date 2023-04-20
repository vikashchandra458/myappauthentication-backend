const { DataTypes } = require("sequelize");
const Role = require("../../../_role/role.dto");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: true,
            defaultValue: DataTypes.UUIDV4,
        },
        password: { type: DataTypes.STRING, allowNull: true },
        role: { type: DataTypes.STRING, allowNull: false, defaultValue: Role.USER },
        email: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: true },
        remember_token: { type: DataTypes.STRING, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: true },
        updated_at: { type: DataTypes.DATE, allowNull: true },
    };


    return sequelize.define("users", attributes);
}
