var app = getApp();
Page({
  data: {
    _memberdata:"",
    goodsObj:""
  },
   onLoad: function (options) {
   	 var _obj = JSON.parse(options.dataObj);//解析得到对象 
    this.setData({
    	goodsObj:_obj.data
    });
   }
})
