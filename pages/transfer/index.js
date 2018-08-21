var app = getApp();
var APPID = 'wx38d7fd2acf604d62';
var SECRET = '19a6102eb5fd710fefdea8555a383701';
//获取应用实例
var _url = require('../../utils/url.js');
Page( {
  data: {
    cartImg: '',
    tipWords: '',
    button_show:'none'
  },
  onLoad: function(e) {
  	var _that  = this;
  	 wx.showToast({  
            title: '数据加载中...',  
            icon: 'loading',  
            duration: 2000  
        })  
  	wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: _url.local()+"/xcx/platform/appletlist/transfer.shtml",
            data:{code:res.code},
            success:function(e){
            	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
           	//index
           	if(e.data.data.user_mark==1){
           		if(wx.getStorageSync('storageOpen_id')==null||wx.getStorageSync('storageOpen_id')==""){
													wx.setStorageSync('storageOpen_id',e.data.data.user_openid);
												}
           		 wx.redirectTo({
													  url: '../index/index?open_id='+e.data.data.user_openid
												});
						//警告页面					
           	}else if(e.data.data.user_mark==3){
           		wx.redirectTo({
													  url: '../danger/index'
												});
						//待审核						
           		}else if(e.data.data.user_mark==0){
           			wx.redirectTo({
													  url: '../underReview/index'
												});
           		}
           			//index
           		else if(e.data.data.user_mark==2){
           			if(wx.getStorageSync('storageOpen_id')==null||wx.getStorageSync('storageOpen_id')==""){
													wx.setStorageSync('storageOpen_id',e.data.data.user_openid);
												}
           			 wx.redirectTo({
													  url: '../index/index?open_id='+e.data.data.user_openid
												});
           		}
           		//可注册
           		else if(e.data.data.user_mark==4){
           			wx.redirectTo({
													  url: '../registered/index?open_id='+e.data.data.user_openid
												});
           		}
           		//可授权
           		else if(e.data.data.user_mark==5){
           				_that.setData({
				           		button_show:'block'
				           	});
           		}
           
           	//跳转注册页面
           	/*wx.redirectTo({
													  url: '../registered/index?open_id='+e.data.data.user_openid
												});*/
           /*	if(e.data.data.user_mark==4){
           		
           	}*/
            }
            }
          })
        } else {
        }
      }
    });
    },
    bindGetUserInfo:function(e){
    	this.setData({
    		_e : e,
    		button_show:"none"
    	});
    	var _e = e;
    	wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.showLoading({
							  title: '授权中...',
						});
          wx.request({
            url:  _url.local()+"/xcx/platform/appletlist/authorization.shtml",
            method: 'get',
            data: {encryptedData:  _e.detail.encryptedData, iv: _e.detail.iv, code: res.code},
            header: {
						"Content-Type": "applciation/json"
						},
						success: function (e) {
							var href_flag = e.data.data.user_mark;
								wx.hideLoading();
							//注册页面
							if(href_flag==4){
								  wx.redirectTo({
													  url: '../registered/index?open_id='+e.data.data.user_openid
												});
							}else if(href_flag==3){
								  wx.redirectTo({
													  url: '../danger/index?open_id='+e.data.data.user_openid
												});
							}
			         } 
          })
        } else {
        }
      }
    });
    }
})
