//登录权限刷新
var _url = require('../utils/url.js');
function loginRenovate(ob,open_id,page_flag) {
 ob.request({
            url: _url.local()+'/xcx/platform/appletlist/transferNode.shtml',
            data:{open_id:open_id},
            success:function(e){
           	//index
           	if(e.data.data.user_mark==1){
           		if(wx.getStorageSync('storageOpen_id')==null||wx.getStorageSync('storageOpen_id')==""){
													wx.setStorageSync('storageOpen_id',e.data.data.user_openid);
												}
           			if(page_flag!="index"){wx.redirectTo({ url: '../index/index?open_id='+e.data.data.user_openid});}
						//警告页面					
           	}else if(e.data.data.user_mark==3){
           		if(page_flag!="danger"){wx.redirectTo({url: '../danger/index'});}
						//待审核						
           		}else if(e.data.data.user_mark==0){
           			if(page_flag!="under"){wx.redirectTo({ url: '../underReview/index'});}
           		}
           			//index
           		else if(e.data.data.user_mark==2){
           			if(wx.getStorageSync('storageOpen_id')==null||wx.getStorageSync('storageOpen_id')==""){
													wx.setStorageSync('storageOpen_id',e.data.data.user_openid);
												}
           			if(page_flag!="index"){wx.redirectTo({url: '../index/index?open_id='+e.data.data.user_openid});}
           		}
           		//可注册
           		else if(e.data.data.user_mark==4){
           			if(page_flag!="reg"){
           			    wx.redirectTo({url: '../registered/index?open_id='+e.data.data.user_openid});
           			}
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
          })
}
module.exports = {
loginRenovate: loginRenovate
}