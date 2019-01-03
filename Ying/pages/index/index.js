// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPic: "../image/0.jpg",
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    SetbgPic()
  },
  SetbgPic(){
    this.setData({
      bgPic: "../image/0.jpg",
    })
  },
  upload() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          //url: `../normal/normal?src=${src}`
          url: `../upload/upload?src=${src}`
        })
      }
    })
  },
  onLoad(option) {
    let { avatar } = option
    if (avatar) {
      this.setData({
        bgPic: avatar
      })
    }
  },
  getAvatar() {
    if (app.globablData.userInfo) {
      this.setData({
        bgPic: app.globalData.userInfo.avatarUrl,
      });
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            bgPic: res.userInfo.avatarUrl
          });
          this.assignPicChoosed();
        }
      })
    }
  },
  nextPage(){
      app.globalData.bgPic=this.data.bgPic;
      wx.navigateTo({
        url: '../imageeditor/imageeditor',
      })
  }
})