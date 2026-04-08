import express from "express" //type cambia a module en package.json

const app = express()
app.use(express.static("public"))
const PORT = 1001 //Servidor web ocupa un puerto
app.listen(PORT,console.log("http://localhost:"+ PORT)) //siempre estar "alerta"
