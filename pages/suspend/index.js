var app = getApp();
var _url = require('../../utils/url.js');
Page({
    data: {
    	put_upList:"",//挂单集合
    	errorDis:""
    },
    onLoad: function(options) {
    },
    onShow: function (e) {
    	 var _put_upList= wx.getStorageSync('put_upList');//挂单功能
    	 if(""!=_put_upList&&null!=_put_upList){
    	 	this.setData({
	     	 put_upList:_put_upList
	       })
    	 }else{
    	 	this.setData({
    	 		errorDis:"errors"
    	 	});
    	 }
	     
    },
    Settlement:function(e){
    	//结算挂单
    	var _put_upList = this.data.put_upList
    	for(var i=0;i<_put_upList.length;i++){
    		if(e.currentTarget.dataset.id==_put_upList[i].vip.id){
    			wx.setStorageSync('shoppingCart',_put_upList[i].shopCart);
				app.globalData.vipno = _put_upList[i].vip;
				_put_upList.splice(i,1); 
				wx.setStorageSync('put_upList',_put_upList);
				wx.navigateBack();
         	}
    	}
    },
    delete:function(e){
    	//删除挂单
    	var _put_upList = this.data.put_upList
    	for(var i=0;i<_put_upList.length;i++){
    		if(e.currentTarget.dataset.id==_put_upList[i].vip.id){
    			_put_upList.splice(i,1); 
    		}
    	}
    	wx.setStorageSync('put_upList',_put_upList);
        this.setData({
	      	put_upList:_put_upList,
	      	errorDis  : _put_upList.length>0? '':'errors' 
        });
    }
})