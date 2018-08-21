//获取应用实例
var loginActive = require('../../utils/loginActive.js');
var _url = require('../../utils/url.js');
var app = getApp();
var flag = true;
Page({
    data: {
       page_flag:'index',
       indexObj:{
       	register_num:"0",//今日注册
       	total_num:"0",//今日收款笔数
       	sale_amt:"0",//今日销售
       	today_recharge:"0",//今日注册【暂时是假数据】
       	user_emp_name:"获取中",//员工名字
       	user_branch_name:"获取中",//员工所在店
       	actual_amt:"0",//今日收款
       	user_emp_no:"",//员工编码
       	user_branch_no:""//员工所在门店编码
       },
    },
    //事件处理函数
    swiperchange: function(e) {
        //console.log(e.detail.current)
    },
    onLoad: function(e) {
    	flag = false;
    	var _this = this;
        this.setData({
        	open_id:e.open_id!=null&&e.open_id==undefined?e.data.open_id :wx.getStorageSync('storageOpen_id')
        });
        var that = this;
        wx.request({
	            url:_url.local()+"/xcx/platform/index/info.shtml",
	            data:{user_openid:this.data.open_id==null?wx.getStorageSync('storageOpen_id'):this.data.open_id},
	            success:function(e){
	            	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
	            	if(e.data.data!=null||e.data.data!=""){
					       _this.setData({
					       	 indexObj:e.data.data
					       });
					 //设置全局的营业员信息     
		            app.globalData.empno = e.data.data;//存储数据到app对象上 
	            	}else{
	            		 wx.showToast({
				            title: '信息获取失败',
				            icon: 'succes',
				            duration: 1000,
				            mask:true
				        });
	            	}
	            }
	            	}
           });
        //index页面数据填充
           wx.request({
	            url:_url.local()+"/xcx/platform/index/getPayMent.shtml",
	            data:{},
	            success:function(e){
	            	if(e.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
			           wx.setStorageSync('paymentObj',e.data.data);//不判断直接更新缓存支付方式
	                 }
	            	},
	            fail:function(e){
	            	wx.showToast({
				            title: '支付方式获取失败',
				            icon: 'succes',
				            duration: 1000,
				            mask:true
				        });
	            }
           });
            //调用应用实例的方法获取全局数据
        wx.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            });
        });
    },
    onShow: function (e){
     var _this = this;
     var open_id = wx.getStorageSync('storageOpen_id');
     if(open_id!=null&&open_id!=""){
     	loginActive.loginRenovate(wx,open_id,this.data.page_flag);
     }
     if(flag==true){
     	wx.request({
	            url:_url.local()+"/xcx/platform/index/info.shtml",
	            data:{user_openid:this.data.open_id==null?wx.getStorageSync('storageOpen_id'):this.data.open_id},
	            success:function(e){
	            	if(e.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
	            	if(e.data.data!=null||e.data.data!=""){
					       _this.setData({
					       	 indexObj:e.data.data
					       });
					 //设置全局的营业员信息     
		            app.globalData.empno = e.data.data;//存储数据到app对象上 
	            	}else{
	            		 wx.showToast({
				            title: '信息获取失败',
				            icon: 'succes',
				            duration: 1000,
				            mask:true
				        });
	            	}
	            }
	            	}
           });
     }
     flag=true;
    },onPullDownRefresh: function () {
    	var _this = this;
        wx.showNavigationBarLoading();
    	wx.request({
	            url:_url.local()+"/xcx/platform/index/info.shtml",
	            data:{user_openid:this.data.open_id==null?wx.getStorageSync('storageOpen_id'):this.data.open_id},
	            success:function(e){
	            	if(e.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
	            	if(e.data.data!=null||e.data.data!=""){
					       _this.setData({
					       	 indexObj:e.data.data
					       });
					 //设置全局的营业员信息     
		            app.globalData.empno = e.data.data;//存储数据到app对象上 
	            	}else{
	            		 wx.showToast({
				            title: '信息获取失败',
				            icon: 'succes',
				            duration: 1000,
				            mask:true
				        });
	            	}
	            	// 隐藏导航栏加载框
			        wx.hideNavigationBarLoading();
			        // 停止下拉动作
			        wx.stopPullDownRefresh();
	            }
	          }
           });
    }
})
