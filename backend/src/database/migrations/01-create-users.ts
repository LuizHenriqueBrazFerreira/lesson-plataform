import { QueryInterface, Model, DataTypes } from 'sequelize'
import { UserDB } from '../../interfaces/Database'

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<UserDB>>('Users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'STUDENT'
      },
      confirmEmailToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'confirm_email_token'
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      organization: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      }
    })
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('Users')
  }
}