// pages/mycanvas.js
var IMG_URL = "../images/ying.jpg"
var icon_url = ["../images/cicle.png", "../images/cicle02.png"]
var ICON_NUMS = 2
const device = wx.getSystemInfoSync()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    image_url: IMG_URL,
    ICON_URL : "../images/cicle.png",
    ICON_NUM : 1,
    imageUrl:null,
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
        src: avatar,
        image_url: avatar
      })
    }
    setTimeout(() => {
      this.drawbgImage()
    }, 1000)
  },
  //选择图片
  bindSelectPictuce: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          image_url: res.tempFilePaths,
        })
        setTimeout(() => {
          that.drawbgImage()
        }, 1000)
      }
    })
  },
  //保持图片到相册
  bindSaveImage: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imageUrl,
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 3000
        })
      },
      fail: function (res) {
        console.log(res)
        console.log('保存图片失败')
        wx.showToast({
          title: '正在生成图片，请稍后重试',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  //预览图片
  bindPreview:function(){
    var src = this.data.imageUrl
    if (src) {
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [src] // 需要预览的图片http链接列表
      })
    } else {
      console.log('获取图片地址失败，请稍后重试')
    }
  },

  //选择元素
  bindSelectIcon:function(){
    var that = this
    var i = that.data.ICON_NUM
    that.setData({
      ICON_NUM: (i+1)%ICON_NUMS,
      ICON_URL: icon_url[i]
    })
    this.drawbgImage()
  },
  //生成图片
  drawAvaterbind: function () {
    this.drawbgImage()
  },
  drawbgImage: function () {
    var that = this;
    var systemInfo = wx.getSystemInfoSync()

    var canv2 = wx.createCanvasContext('canvas')
    var width = device.windowWidth
    canv2.drawImage(that.data.image_url, 0, 0, width, width)
    canv2.restore()
    canv2.save()
    canv2.drawImage(that.data.ICON_URL, 0, 0, width, width)
    canv2.restore()
    canv2.save()
    canv2.draw()
    

    var canv = wx.createCanvasContext('mycanvas')
    var width = systemInfo.windowWidth/1.5 
    canv.drawImage(that.data.image_url, 0, 0, width, width)
    canv.restore()
    canv.save()
    canv.drawImage(that.data.ICON_URL, 0, 0, width, width)
    canv.restore()
    canv.save()
    canv.draw()
    
    setTimeout(() => {
      this.canvastoImg()
    }, 500)
  },
  canvastoImg: function () {
    var that = this
    // 画布转成图片
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      x: 0,
      y: 0,
      width: device.windowWidth,
      height: device.windowWidth,
      //生成图片的大小
      destWidth: 1000,
      destHeight: 1000,
      success: function (res) {
        wx.hideLoading()
        console.log(res.tempFilePath, 'mycanvas生成图片')
        that.setData({
          imageUrl: res.tempFilePath
        })
      }
    })
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
  
  }
})