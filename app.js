//app.js

var loginActive = require('utils/loginActive.js');
App({
  onLaunch: function() {
  	var APPID = 'wx38d7fd2acf604d62';
  	var SECRET = '19a6102eb5fd710fefdea8555a383701';
  	console.log("用户初始化信息");
  	// 查看是否授权
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
            }
          })
        }
      }
    })
  },
  
  onLoad: function() {
    // 查看是否授权
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
            }
          })
        }
      }
    })
  },
  onShow: function (e) {
  	console.log(e);
  	//必须从把transfer放在app.json第一行  不然e.data.data.user_openid报错
  	if(wx.getStorageSync('storageOpen_id')==null||wx.getStorageSync('storageOpen_id')==""){
													wx.setStorageSync('storageOpen_id',e.data.data.user_openid);
												}else{
													
												}
   //wx.setStorageSync('storageOpen_id',e.data.data.user_openid)
  },
  onHide: function () {
    
  },
  globalData:{
    userInfo:null
  }
})