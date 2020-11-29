
namespace zzpOpt {
    let API_BASE = "http://127.0.0.1:8080/user";

    export function changePwd(uid: string, oldPwd: string, newPwd: string, callback: (data: any, status: any) => void) {
        $.post(API_BASE + "/changepwd", {
            uid: uid,
            oldpwd: oldPwd,
            newpwd: newPwd
        },
            callback
        );
    }
}
$(function () {
    $("#btnsubmit").off("click").on("click", function () {
        let oldPwd = $("#txtoldpwd").val();
        let txtnewpwd2 = $("#txtnewpwd2").val();
        let txtnewpwd = $("#txtnewpwd").val();
        if (txtnewpwd != txtnewpwd2) {
            YDUI.dialog.alert("二次密码不一致");
            return;
        }
        let uid = JSON.parse(localStorage.getItem("user")).uid;
        if (uid) {
            zzpOpt.changePwd(<string>uid, <string>oldPwd, <string>txtnewpwd2, function (data, status) {
                console.log(data);
                if (data.sucess === 1) {
                    YDUI.dialog.alert("更新成功");
                    localStorage.clear();
                    window.location.href = "/views/login.html";
                }
                else {
                    console.log(data.message);
                }
            });
        }
        else {
            window.location.href = "/index.html";
        }
    });
});