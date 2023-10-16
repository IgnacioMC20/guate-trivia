import { DataTypes, Model, Sequelize } from 'sequelize'

class Friend extends Model {
  public id!: number
  public user_id_1!: number
  public user_id_2!: number

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id_1: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id_2: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'friends',
        tableName: 'friends',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    )
  }
}

export default Friend
