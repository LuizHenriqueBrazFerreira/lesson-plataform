import app from './app'

const PORT = process.env.API_PORT;

const server = app.listen(PORT, () =>  console.log(`Server is running on port: ${PORT}`))


export default server;