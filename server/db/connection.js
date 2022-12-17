const mongoose = require("mongoose");


mongoose.set("strictQuery",false)

mongoose.connect(process.env.DB_URL,{

  useNewUrlParser : true,
  useUnifiedTopology : true,

})
.then(()=>{

  console.log(`Connection Established Successfully.....`);
})
.catch((err)=>{

  console.log(err);
});