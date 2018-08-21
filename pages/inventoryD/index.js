var app = getApp();
var data1 = new Array();
var _url = require('../../utils/url.js');
var _bar_code;//商品条码
var defaultdata ="";//默认库存
Page({
  data: {
  	bar_code:'',
  	list:'',
  	goodsName:'',
  	tabq:{
  		ac1:"",
  		ac2:"active",
  	}
  },
   onLoad: function (options) {
   var _obj = JSON.parse(options.dataObj);//解析得到对象 
    //var _obj = {"code":0,"msg":null,"data":{"bar_code":"4892864102305","goods_name":null,"StockList":[{"floor_price":0.00,"bar_code":"4892864102305","status":0,"remain_num":500,"in_warehouse_name":"合兴店仓库","vip_price":168.00,"goods_name":"圣马龙大宽口PPSU印花自动奶瓶240Ml","warehouse_num":210,"made_date":"2018-06-21","in_warehouse_id":"0101"},{"bar_code":"4892864102305","status":1,"remain_num":2,"in_warehouse_name":"鹿苑店仓库","vip_price":142.80,"goods_name":"圣马龙大宽口PPSU印花自动奶瓶240Ml","warehouse_num":2,"in_warehouse_id":"0401"},{"bar_code":"4892864102305","status":1,"remain_num":4,"in_warehouse_name":"妙桥店仓库","vip_price":142.80,"goods_name":"圣马龙大宽口PPSU印花自动奶瓶240Ml","warehouse_num":4,"in_warehouse_id":"2101"},{"bar_code":"4892864102305","status":1,"remain_num":4,"in_warehouse_name":"锦丰店仓库","vip_price":142.80,"goods_name":"圣马龙大宽口PPSU印花自动奶瓶240Ml","warehouse_num":4,"in_warehouse_id":"0301"},{"bar_code":"4892864102305","status":1,"remain_num":16,"in_warehouse_name":"人民店仓库","vip_price":142.80,"goods_name":"圣马龙大宽口PPSU印花自动奶瓶240Ml","warehouse_num":16,"in_warehouse_id":"0801"},{"bar_code":"4892864102305","status":1,"remain_num":5,"in_warehouse_name":"塘市店仓库","vip_price":142.80,"goods_name":"圣马龙大宽口PPSU印花自动奶瓶240Ml","warehouse_num":5,"in_warehouse_id":"1401"},{"bar_code":"4892864102305","status":1,"remain_num":3,"in_warehouse_name":"吉麦隆店仓库","vip_price":142.80,"goods_name":"圣马龙大宽口PPSU印花自动奶瓶240Ml","warehouse_num":3,"in_warehouse_id":"2601"},{"bar_code":"4892864102305","status":1,"remain_num":3,"in_warehouse_name":"东莱茁茁店仓库","vip_price":142.80,"goods_name":"圣马龙大宽口PPSU印花自动奶瓶240Ml","warehouse_num":3,"in_warehouse_id":"2501"},{"bar_code":"4892864102305","status":1,"remain_num":5,"in_warehouse_name":"乐余店仓库","vip_price":142.80,"goods_name":"圣马龙大宽口PPSU印花自动奶瓶240Ml","warehouse_num":5,"in_warehouse_id":"0501"}]}}
     _bar_code =_obj.data.bar_code;
    var _list = _obj.data.StockList;
    var _goodsName = _obj.data.item_name;
    
    
   	
   	this.setData({
   		bar_code:_list.bar_code,
  	  list:_list.StockList,
  	  goodsName:_goodsName
   	});
   	
   },
   onShow: function () {
  },onready:function(){
  	wx.hideLoading();
  },
  tabq:function(e){
  	wx.showLoading({
				  title: '加载中',
			});
  	var _this = this;
    this.setData({
    	tabq:{
  		ac1:e.currentTarget.dataset.flag==2?"":"active",
  		ac2:e.currentTarget.dataset.flag==1?"":"active",
     	}
    });
    if(e.currentTarget.dataset.flag==1){
    	 wx.request({
	            url:_url.local()+"/xcx/platform/goodssearchbranchstock/list.shtml",
	            data:{bar_code:_bar_code,branch_no:app.globalData.empno.user_branch_no},
	            success:function(e){
	            	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
	            	 wx.hideLoading();
	            	 if(e.data.data.StockList.length>0){
	            	   _bar_code =e.data.data.bar_code;
							    var _list = e.data.data.StockList;
							    var _goodsName;
							    if(_list.length>0){
							    	_goodsName =_list[0].goods_name;
							    }
							   	_this.setData({
							   		bar_code:_bar_code,
							  	  list:_list,
							  	  goodsName:_goodsName
							   	});
	            	}else{
	            		_this.setData({bar_code:defaultdata.bar_code,
														  	  list:"",
														  	  goodsName:defaultdata.goodsName});
	            		wx.showToast({
				            title: '没有该商品库存',
				            icon: 'succes',
				            duration: 2000,
				            mask:true
				         });
	              }
	            }
	            	}
           });
    }else{
      _this.setData(defaultdata);
    	wx.hideLoading();
    }
  	
  }
})
