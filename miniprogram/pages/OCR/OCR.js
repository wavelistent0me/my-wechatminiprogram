Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    shenfenzheng() {
        this.photo("shenfenzheng")
    },
    //拍照或者从相册选择要识别的照片
    photo(type) {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                let imgUrl = res.tempFilePaths[0];
                console.log("图片路径:" + imgUrl);
                that.uploadImg(type, imgUrl)
            }
        })
    },
    // 上传图片到云存储
    uploadImg(type, imgUrl) {
        let that = this
        wx.cloud.uploadFile({
            cloudPath: 'ocr/' + type + '.png',
            filePath: imgUrl, // 文件路径
            config: {
                env: "cloud1-7glbr4uj4d6a7f62"
            },
            success: res => {
                console.log("上传成功,fileID:", res.fileID);
                that.getImgUrl(type, res.fileID)
            },
            fail: err => {
                console.log("上传失败", err)
            }
        })
    },
    //获取云存储里的图片url
    getImgUrl(type, imgUrl) {
        let that = this
        wx.cloud.getTempFileURL({
            fileList: [imgUrl],
            success: res => {
                let imgUrl = res.fileList[0].tempFileURL
                console.log("获取图片url成功", imgUrl)
                that.shibie(type, imgUrl)
            },
            fail: err => {
                console.log("获取图片url失败", err)
            }
        })
    },
    //调用云函数，实现OCR识别
    shibie(type, imgUrl) {
        wx.cloud.callFunction({
            name: "quickstartFunctions",
            data: {
                type: "OCR",
                data: {
                    imgUrl: imgUrl,
                    mode: type,
                },
            },
            config: {
                env: "cloud1-7glbr4uj4d6a7f62"
            },
            success(res) {
                console.log("识别成功", res)
            },
            fail(res) {
                console.log("识别失败", res)
            }
        })
    },
})