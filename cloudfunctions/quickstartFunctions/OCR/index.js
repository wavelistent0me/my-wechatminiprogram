const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async(event, context) => {
    let {
        mode,
        imgUrl
    } = event.data;
    switch (mode) {
        case 'shenfenzheng':
        {
            // 识别身份证
            return shenfenzheng(imgUrl)
        }
        case 'yinhangka':
        {
            // 识别银行卡
            return yinhangka(imgUrl)
        }
        case 'xingshizheng':
        {
            // 识别行驶证
            return xingshizheng(imgUrl)
        }
        default:
        {
            return
        }
    }
}

//识别身份证
async function shenfenzheng(imgUrl) {
    try {
        const result = await cloud.openapi.ocr.idcard({
            type: 'photo',
            imgUrl: imgUrl
        })
        return result;
    } catch (err) {
        console.log(err)
        return err
    }
}
//识别银行卡
async function yinhangka(imgUrl) {
    try {
        const result = await cloud.openapi.ocr.bankcard({
            type: 'photo',
            imgUrl: imgUrl
        })
        return result
    } catch (err) {
        console.log(err)
        return err
    }
}
//识别行驶证
async function xingshizheng(imgUrl) {
    try {
        const result = await cloud.openapi.ocr.vehicleLicense({
            type: 'photo',
            imgUrl: imgUrl
        })
        return result
    } catch (err) {
        console.log(err)
        return err
    }
}
