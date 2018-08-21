var app = getApp();
var loginActive = require('../../utils/loginActive.js');
var _url = require('../../utils/url.js');
Page( {
  data: {
    RegistrationCode: '',
    page_flag:'reg',
    openid:''
  },
  primary:function(){
  	wx.request({
            url:_url.local()+"/xcx/platform/regcode/list.shtml",
            data:{openId:this.data.openid,
            	    regCode:this.data.RegistrationCode
                 },
            success:function(e){
            	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
           	    //index
           	if(e.data.data.user_mark==1){
           		 wx.redirectTo({
													  url: '../index/index'
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
           			 wx.redirectTo({
													  url: '../index/index'
												});
           		}
           		//可注册
           		else if(e.data.data.user_mark==4){
           			if(e.data.data.user_now_code>1){
           				wx.showToast({
									  	title: '注册码错误',
									  	icon: 'loading',
									  	duration: 2000
									})

           			}
           			/*wx.redirectTo({
													  url: '../registered/index?open_id='+e.data.data.user_openid
												});*/
												
           		}
           		//可授权
           		else if(e.data.data.user_mark==5){
           				_that.setData({
				           		button_show:'block'
				           	});
           		}
           	}
            }
           	});
  },
  bindKeyInput: function(e) {
    this.setData({
      RegistrationCode: e.detail.value
    });
  },
  onLoad: function(e) {
  	wx.setStorage({
			  key:"storageOpen_id",
			  data:e.open_id
			})
  	this.setData({
  		openid:e.open_id
  	});
  	var open_id = wx.getStorageSync('storageOpen_id');
  	wx.getStorage({
		  key: 'key',
		  success: function(res) {
		  } 
    })
  },
  onShow: function (e){
  	wx.getStorage({
		  key: 'key',
		  success: function(res) {
		  	var open_id = wx.getStorageSync('storageOpen_id');
			     if(res.data!=null&&res.data!=""){
			     	 loginActive.loginRenovate(wx,res.data,this.data.page_flag);
			     }
		   } 
    })
    }
})
