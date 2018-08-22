var app = getApp();
var _url = require('../../utils/url.js');
Page({
  data: {
   goodsList:"",//商品集合
   order:"",//order详情
   giveLqNameList:"",//礼券集合
   depositList:"",//库存变动
   orderGivePoint:""//积分
  },
   onLoad: function (options) {
   	 var _obj = JSON.parse(options.dataObj);//解析得到对象 
   	 this.setData({
    	goodsList:_obj.data.orderDetailList,
    	order:_obj.data.order,
    	giveLqNameList:_obj.data.giveLqNameList,
    	depositList:_obj.data.depositList,
    	orderGivePoint:_obj.data.orderGive.give_point
    });
   },
   
   onShow: function () {
    /*console.log(objdata);//objdata.orderDetailList
    this.setData({
    	goodsList:objdata.orderDetailList,
    	order:objdata.order
    });*/
  },
 
  req:function(orderObj){
  
  }
})
