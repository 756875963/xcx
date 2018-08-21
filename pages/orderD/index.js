var app = getApp();
var _url = require('../../utils/url.js');
Page({
    data: {
        obj:""//订单对象
    },
    onLoad: function(options) {
        var that = this;
         var _obj = JSON.parse(options.dataObj);//解析得到对象 
        if(_obj!=null&&_obj!=""){
        	this.setData({
        		obj:_obj
        	})
        }else{
        	
        }
    },
    
onShow: function () {
  },
  index:function(){
  	wx.redirectTo({
           url:"../index/index"
      });
  },goods:function(){
  	wx.redirectTo({
           url:"../sales/index?flag=1"
      });
  }
})