import * as uploadApi from "@/api/upload"
export default function appUpdate(appInfo) {

    uploadApi.upload({
            version: appInfo.version,
            name: appInfo.name
        })
        .then((result) => {
            var data = result.data.data;
            if (data.update && data.wgtUrl && data.update_type == '0') {
                // 热更新
                wgtUpdate(data);
            } else if (data.update && data.update_type == '1') {
                // 整包升级
                downloadUpdate(data);
            }



        })
        .catch((err) => {


        });
}

function wgtUpdate(data) {
    uni.showModal({
        title: '更新',
        content: '版本已更新，请升级到最新版本',
        showCancel: true,
        success: ({
            confirm,
            cancel
        }) => {
            uni.downloadFile({
                url: data.wgtUrl,
                success: (downloadResult) => {

                    if (downloadResult.statusCode === 200) {
                        plus.runtime.install(downloadResult.tempFilePath, {
                            force: false
                        }, function () {
                            uni.showModal({
                                title: "更新完成"
                            })
                            console.log('install success...');
                            plus.runtime.restart();
                        }, function (e) {

                            console.error('install fail...');
                        });
                    }
                }
            });

        }
    })
}

function downloadUpdate(fileInfo) {
    uni.showModal({

        title: "提醒",

        content: `检测到有最新版本${fileInfo.versionsql}，能否确认升级?`,

        success: function (res) {

            if (res.confirm) {

                plus.runtime.openURL(fileInfo.url) //整包下载

            }

        }

    });
}