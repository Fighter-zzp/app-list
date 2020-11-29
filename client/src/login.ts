
namespace zzpOpt {
    let API_BASE = "http://127.0.0.1:8080/user";
    export function login(uname: string, upwd: string, callback: (data: any, status: any) => void) {
        $.post(API_BASE + "/login", {
            username: uname,
            password: upwd
        },
            callback
        );
    }
}
$(function () {
    $('#btnLogin').on('click', function () {
        //YDUI.dialog.alert("CLICK");
        let uid = $("#txtuid").val();
        let upwd = $("#txtpwd").val();
        zzpOpt.login(<string>uid, <string>upwd, function (data, status) {
            //console.log(data);
            if (data.sucess === 1) {
                localStorage.setItem("user", JSON.stringify(data.data));
                window.location.href = "/index.html";
            }
            else {
                YDUI.dialog.alert(data.message);
                console.log(data.message);
            }

        });
    })
});