import {QueryInterface} from 'sequelize'
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

export default {
  up: async(queryInterface:QueryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'fsmsss',
      email: 'fsmsss@gmail.com',
      password: bcrypt.hashSync('Fsmsss2023!!', SALT_ROUNDS),
      role: 'ADMIN'
    }])
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Users', {})
  }
}