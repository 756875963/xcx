var app = getApp();
Page( {
  data: {
  	user:"",//页面数据填充
  	menuFlag:"",
  },
   onLoad: function (options) {
   var obj =JSON.parse(options.options);
   	var _flag;
   	if(options.qieflag=="ti"){
   		  _flag = true;
   		  wx.setNavigationBarTitle({
				      title: "提货详情"//页面标题为路由参数
				});
   	}else{
   		  _flag = false;
   		  wx.setNavigationBarTitle({
				      title: "存货详情"//页面标题为路由参数
				});
   	}
    if(obj.currentTarget.dataset.obj!=null){
    	 this.setData({
    	 	 user:obj.currentTarget.dataset.obj,
    	 	 menuFlag:_flag,
    	 });
    }
   },
   onShow: function () {
  },
  onReady: function () {
  	wx.hideLoading();
  },
})
