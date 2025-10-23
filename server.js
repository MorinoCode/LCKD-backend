import express from "express";
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT

const app = express();
app.use(express.json());

app.get('/', (req , res) => {
    res.send('Hi')
})


app.listen(PORT , ()=>{
console.log(`App is runnig on port: ${PORT}`);
})