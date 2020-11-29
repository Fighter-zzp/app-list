//// <reference path="template.d.ts" />
namespace zzpOpt {
    let API_BASE = "http://127.0.0.1:8080/list";
    let user = JSON.parse(localStorage.getItem('user'));

    export function getList(userid: string, isdone: string, callback: (data: any, status: any) => void) {
        $.get(`${API_BASE}/${user.uname}/${userid}/${isdone}`, callback);
    }

    export function deleteList(id: string, callback: (data: any, status: any) => void) {
        $.post(`${API_BASE}/delete/${user.uname}`, {
            id: id
        },
            callback
        );

    }
    export function doneList(id: string, callback: (data: any, status: any) => void) {
        $.post(`${API_BASE}/done/${user.uname}`, {
            key: id
        },
            callback
        );
    }

    export function editList(data: object, callback: (data: any, status: any) => void) {
        $.post(`${API_BASE}/edit/${user.uname}`, data,
            callback
        );
    }

    export function newList(title: string, type: string, userid: string, callback: (data: any, status: any) => void) {
        $.post(`${API_BASE}/add/${user.uname}`, {
            params: JSON.stringify({
                title: title,
                type: type,
                userid: userid
            })
        },
            callback
        );
    }

    export function getQueryVariable(variable: string) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return "";
    }

    export function bindEvent() {
        $('.list-delete').on('click', function (e) {
            let id = $(this).data("id");
            let that = $(this);
            deleteList(<string>id, function (data, status) {
                if (data.sucess === 1) {
                    YDUI.dialog.alert("删除成功");
                    that.parent().parent().remove();
                }
                else {
                    console.log(data.message);
                    YDUI.dialog.alert("删除失败");
                }
            });
            e.stopPropagation(); // 阻止事件冒泡
        });
        $('.list-done').on('click', function (e) {
            let id = $(this).data("id");
            let that = $(this);
            doneList(<string>id, function (data, status) {
                if (data.sucess === 1) {
                    YDUI.dialog.alert("操作成功");
                    that.parent().parent().remove();
                }
                else {
                    console.log(data.message);
                    YDUI.dialog.alert("操作失败");
                }
            });
            e.stopPropagation(); // 阻止事件冒泡
        });

        $('.list-item').on('click', function (e) {
            $("#title").val($(this).data("title"));
            $("#type").val($(this).data("type"));
            $("#id").val($(this).data("id"));
            $("#J_Save").text("保存");
            $('#J_ActionSheet').actionSheet('open');
            e.stopPropagation(); // 阻止事件冒泡
        });
    }

    export function init() {
        let isdone = zzpOpt.getQueryVariable("flag") === "" ? "0" : zzpOpt.getQueryVariable("flag");
        let userid = user.uid;

        // clear all active
        $('.tabbar-item').removeClass('tabbar-active')
        // add current active
        $('#flag' + isdone).addClass('tabbar-active');

        zzpOpt.getList(<string>userid, <string>isdone, function (data, status) {
            if (data.sucess === 1) {
                //console.log(data);

                $('#J_ListContent').html(template('J_ListHtml', { list: data.data }));
                if (isdone === "1") {
                    $(".list-done").hide();
                }
                else {
                    $(".list-done").show();
                }
                zzpOpt.bindEvent();
            }
            else {
                console.log(data.message);
            }
        });
    }
}
$(function () {
    zzpOpt.init();
    var $myAs = $('#J_ActionSheet');

    $('#J_ShowActionSheet').on('click', function () {
        $("#J_Save").text("新建");
        $myAs.actionSheet('open');
    });

    $('#J_Cancel').on('click', function () {
        $myAs.actionSheet('close');
    });
    let isSave = false;
    $("#J_Save").off("click").on("click", function () {
        if (!isSave) {
            isSave = true;
            let title = $("#title").val();
            let type = $("#type").val();
            let userid = JSON.parse(localStorage.getItem("user")).uid
            if ($("#J_Save").text() === "新建") {
                zzpOpt.newList(<string>title, <string>type, <string>userid, function (data, status) {
                    if (data.sucess === 1) {
                        YDUI.dialog.alert("操作成功");
                        zzpOpt.init();
                    }
                    else {
                        console.log(data.message);
                        YDUI.dialog.alert("操作失败");
                    }
                    isSave = false;
                });
            }
            else if ($("#J_Save").text() === "保存") {
                let id = $("#id").val();
                let title = $("#title").val();
                let type = $("#type").val();
                let data = {
                    id: id,
                    title: title,
                    type: type
                };
                zzpOpt.editList(data, function (data, status) {
                    if (data.sucess === 1) {
                        YDUI.dialog.alert("操作成功");
                        zzpOpt.init();
                    }
                    else {
                        console.log(data.message);
                        YDUI.dialog.alert("操作失败");
                    }
                    isSave = false;
                });
            }
            else {
                console.log("参数错误");
            }
        }
    });

});