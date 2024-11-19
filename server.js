const app = require("./app");

const port = 500;

app.listen(port,'0.0.0.0',()=>{
    console.log("server lancer au port: ", port);
});
