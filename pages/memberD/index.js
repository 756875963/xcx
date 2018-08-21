var app = getApp();
var _url = require('../../utils/url.js');
Page( {
  data: {
    _memberdata:
    {
    	save_amt:'数据加载中',
			vip_bbbirth:'数据加载中',
			vip_bbname:'数据加载中',
			vip_bbsex:'数据加载中',
			vip_name:'数据加载中',
			vip_no:'数据加载中',
			vip_point:'数据加载中',
			vip_tel1:'数据加载中',
			vip_type1:'数据加载中'
    }
  },
   onLoad: function (options) {
   	var _this = this;
   	if(options.vipno !=""){
   		   wx.request({
			        url:_url.local()+"/xcx/platform/vipnosearchdetail/list.shtml",
			        data:{vip_no:options.vipno},
			        success:function(e){
			        	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
			        	 if(e.data.data){
			        	 	  _this.setData({
			        	     	 _memberdata:e.data.data
			        	    });
			        	 }
			        	}
			        }
			    });
   	}else{
   		
   	}
   	
   }
})
