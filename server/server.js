const app=require('./app');
const connectDB=require('./config/db')

connectDB();


app.listen(process.env.PORT,()=>{
    console.log(`Server Running at ${process.env.PORT}`);
})