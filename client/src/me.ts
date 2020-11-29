
namespace zzpOpt {
    let API_BASE ="http://127.0.0.1:8080/user";
    export function loadMe(uid: string,callback:(data:any, status:any)=>void) {
        $.get(`${API_BASE}/me/${uid}`,callback);
    }
}
$(function() {
    let uid = JSON.parse(localStorage.getItem("user")).uid;
    if(uid){
        zzpOpt.loadMe(<string>uid,function(data,status){
            // console.log(data);
            if(data.sucess===1){
               for(let i in data.data[0]){
                   $("#"+i).text(data.data[0][i]);
               }
            }
            else{
                console.log(data.message);
            }
           
        });
    }
    else{
        window.location.href ="/views/login.html";
    }
    $("#btnLogout").off("click").on("click",function(){
         localStorage.clear();
         window.location.href ="/views/login.html";
    });
    
});