// app main
import {app as appServer} from './app/server' 

// listen app start
let server = appServer.listen(8080,()=>{
    console.log("myAppList server is started!")
})