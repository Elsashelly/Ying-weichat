// pages/combine/combine.js
const app=getApp();
Page({

  data: {

  },

  onLoad: function (options) {
    wx.getImageInfo({
      src:app.globalData.bgPic,
      success: res => {
        this.bgPic=res.path
        console.log(this.bgPic)
        if(this.bgPic==="pages/image/0.jpg"){
          this.bgPic = "../image/0.jpg"
        }
        console.log(this.bgPic)
        setTimeout(() => {
          this.draw();
        }, 1000)
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  
  draw() {
    let scale = app.globalData.scale;
    let rotate = app.globalData.rotate;
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    let hat_center_x = app.globalData.hat_center_x-(windowWidth / 2 - 150);
    let hat_center_y = app.globalData.hat_center_y-50;
    let currentHatId = app.globalData.currentHatId;
    const pc = wx.createCanvasContext('myCanvas');
    
    const hat_size = 100 * scale;


    pc.clearRect(0, 0, windowWidth, 300);
    pc.drawImage(this.bgPic, 0, 0, 300, 300);
    pc.save;
    pc.translate(hat_center_x,hat_center_y);
    pc.rotate(rotate * Math.PI / 180);
    pc.drawImage("../image/" + currentHatId + ".png", -hat_size / 2 , -hat_size / 2, hat_size, hat_size);
    pc.draw();
  },
  savePic() {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      height: 1000,
      width: 1000,
      canvasId: 'myCanvas',
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            console.log(res)
            wx.navigateTo({
              url: '../index/index',
              success: function(res) {  
              },
              fail: function(res) {         
              },
              complete: function(res) {},
            })
            console.log("success:" + res);
          }, fail(e) {
            console.log("err:" + e);
          }
        })
      }
    });
  }
})