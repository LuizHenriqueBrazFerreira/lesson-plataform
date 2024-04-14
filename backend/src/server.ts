import app from './app'

const PORT = process.env.API_PORT || '3001';

const server = app.listen(PORT, () =>  console.log(`Server is running on port: ${PORT}`))


export default server;