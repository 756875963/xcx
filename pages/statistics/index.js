var loginActive = require('../../utils/loginActive.js');
var _url = require('../../utils/url.js');
var app = getApp();
var _data0;
Page({
  data: {
    currentTab: 0,
    height:"",//分页下拉高度的参考设定
    data0:[],//今日数据
    data1:[],//本月数据
    data2:[],//上月数据
    data3:[],//今年数据
    total:0.00,
    toView:"",
    actual_amt:"",//今日收款
    total_order:"",//今日订单数量
    feiC:{
    	current:1,//当前-数
    	totalPages:'',//总-数
    	limit:'10',//分-条数
    	searchState:true,
    	emp_no:""//营业员no
    },
    	result:{
    		emp_name:"",//员工编号
    		dateMark:"",//数据类型
    		emp_no:""//员工编号
    	},//搜索值
    titleS:{
      upperText:'loading-1-',
      upperState:false,
      downText:'loading-3-',
      downState:false,
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
   	  wx.getSystemInfo({
		  success: function(res) {
		    _this.setData({height:res.windowHeight-40});
		  }
		  });
		  //console.log(app.globalData.empno.user_emp_no);
		  var _user_emp_no = app.globalData.empno.user_emp_no;
		   var _user_emp_name = app.globalData.empno.user_emp_name;
		  var _dateMark =0;
		  this.setData({
		  	result:{emp_name:_user_emp_name,dateMark:_dateMark,emp_no:_user_emp_no}
		  });
		  
		  //设置查询条件
		  this.req('se');
		  this.req2(_user_emp_no,0);
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.detail.current){
      return false;
    } else {
      that.setData({
        currentTab: e.detail.current,
        result:{
    		emp_name:app.globalData.empno.user_emp_name,//员工编号
    		dateMark:e.detail.current,//数据类型
    		emp_no:app.globalData.empno.user_emp_no
    	}
      });
        this.req('se');
		    this.req2(app.globalData.empno.user_emp_no,e.detail.current);
    }
    
  },
  scrolltolower:function(e){
  	var _this = this;
  	var _e = e;
  	var _titleS = _this.data.titleS;
  	var _feiC = _this.data.feiC;
  	if(_this.data.feiC.searchState==true){
  		if(_feiC.current<_feiC.totalPages){
  		 _feiC.current = _feiC.current+1;
  		 _feiC.searchState=false;
  		 _titleS.downState=true;
  		 _titleS.downText="loading-"+_feiC.current+"-";
  		 _this.setData({
  		 	feiC:_feiC,
  		 	titleS:_titleS
  		 });
  		 this.req('fe');
  	  }
  	}else{
  	  	_this.setData({
    	  	 titleS:{
			      upperText:'loading-1-',
			      upperState:false,
			      downText:'没有更多记录',
			      downState:true,
			     }
    	  });
  	  }
  },
  //点击切换
  clickTab: function (e) {
  	console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current){
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        result:{
    		emp_name:app.globalData.empno.user_emp_name,//员工编号
    		dateMark:e.target.dataset.current,//数据类型
    		emp_no:app.globalData.empno.user_emp_no
    	}
      });
       /* this.req('se');
		    this.req2(app.globalData.empno.user_emp_no,e.target.dataset.current);*/
    }
  },
  req:function(flag){
  	  var _this = this;
  	  var paging;
	  	wx.showLoading({
				  title: '加载中',
			});
			if(flag=='se'){
				 paging= {
				    	current:'1',//当前-数
				    	totalPages:'',//总-数
				    	limit:'10',//分-条数
				    	result:'',//搜索值
				    	searchState:true,
				    	emp_no:""//营业员no
				    };
					this.setData({
						titleS:{
					      upperText:'loading-1-',
					      upperState:false,
					      downText:'loading-3-',
					      downState:false,
					    }
					});
							    
					paging = Object.assign(paging,this.data.result);   
			}else{
					paging = Object.assign(Object.assign(this.data.feiC,this.data.result),{page:this.data.feiC.current});
			}
			
  	  wx.request({
        url:_url.local()+"/xcx/platform/statisticalquery/list.shtml",
        data:paging,
        success:function(e){
        	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
        	 var _data = e.data.data;
        	 var _array = new Array();
        	 var  _toView;
        	   	  //初始化分-
            	 paging.limit = e.data.data.limit;
				    	 paging.current = e.data.data.page;
				    	 paging.totalPages = e.data.data.totalPages;
				         paging.searchState =true;
				       
				       _this.setData({
				       	feiC:paging
				       });
        	  if(_data.data.length>0){
        	  	var _timestamp = Date.parse(new Date());
                    _timestamp = _timestamp / 1000;
        	  	for(var i=0;i<_data.data.length;i++){
        	    	_array[i] = { total_amount:_data.data[i].total_amount,
        	    		          total:_data.data[i].total,
        	    		          discount:_data.data[i].discount,
        	    		          actual_amt:_data.data[i].actual_amt,
        	    		          note1:_data.data[i].note1,
        	    		          num:"x"+_data.data[i].note1,
        	    		          vip_name:_data.data[i].vip_name,
        	    		          create_time:_data.data[i].create_time,
        	    		          in_name:_data.data[i].in_name,
        	    	              timestamp:_timestamp}
        	    if(i==0){
            		 	  	//用于跳转指定分-的位置
            		 	  	_toView ="x"+_data.data[i].deal_no;
            		 	  }
        	  	}
        	  
        	  	 //判断查询还是分-
        	  	   if(flag=='se'){
        	  	   	  if(_this.data.result.dateMark==0){
	            		 	 _this.setData({data0:_array,errorDis:"",toViewe:_toView,top:0});
        	  	   	  }else if(_this.data.result.dateMark==1){
        	  	   	  	_this.setData({data1:_array,errorDis:"",toViewe:_toView,top:0});
        	  	   	  }else if(_this.data.result.dateMark==2){
        	  	   	  	_this.setData({data2:_array,errorDis:"",toViewe:_toView,top:0});
        	  	   	  }else if(_this.data.result.dateMark==3){
        	  	   	  	_this.setData({data3:_array,errorDis:"",toViewe:_toView,top:0});
        	  	   	  }
	            		 }else{
	            		 	 if(_this.data.result.dateMark==0){
	            		 	_this.setData({data0:_this.data.data0.concat(_array),errorDis:"",toViewe:_toView});
        	  	   	  }else if(_this.data.result.dateMark==1){
        	  	   	  _this.setData({data1:_this.data.data1.concat(_array),errorDis:"",toViewe:_toView});
        	  	   	  }else if(_this.data.result.dateMark==2){
        	  	   	  	_this.setData({data2:_this.data.data2.concat(_array),errorDis:"",toViewe:_toView});
        	  	   	  }else if(_this.data.result.dateMark==3){
        	  	   	  	_this.setData({data3:_this.data.data3.concat(_array),errorDis:"",toViewe:_toView});
        	  	   	  }
	            		 }
        	  	if(_data.data.length!="10"){
        	  		_this.setData({
	            	  	 titleS:{
						      upperText:'loading-1-',
						      upperState:false,
						      downText:'没有更多记录',
						      downState:true,
						     }
	            	  });
        	  	}
        	  }else{
        	  	   //么有数据返回的散客数据
        	  	   var fit = [];
        	  	   _this.setData({
	            	  	 user:fit,
	            	  	 errorDis:"errors",
	            	  	 titleS:{
						      upperText:'loading-1-',
						      upperState:false,
						      downText:'loading-3-',
						      downState:false,
						     }
        	            });
        	  }
        		wx.hideLoading();
         }
        	}
       })
  },req2:function(emp_no,flag){
  	 var _this = this;
  	 _this.setData({
        		total:"计算中..."
             	});
  	 wx.request({
        url:_url.local()+"/xcx/platform/statisticalquerytotal/list.shtml",
        data:{emp_no:emp_no,dateMark:flag},
        success:function(e){
        	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
        	if(e.data.data!=null&&e.data.data!=""){
        		_this.setData({
        		total:e.data.data.total_amount_all,
        		actual_amt:e.data.data.actual_amt?e.data.data.actual_amt:0,
        		total_order:e.data.data.total_order
             	});
        	}else{
        		 _this.setData({
        		total:"0.00"
             	});
        	}
        }
        	}
     });
  },
  orderDetails:function(e){//订单详情
  	wx.showLoading({
				  title: '加载中',
			});
  	wx.request({
        url:_url.local()+"/xcx/platform/queryorderdetail/list.shtml",
        data:{note1:e.currentTarget.dataset.store.note1,
        	   discount:e.currentTarget.dataset.store.discount,
        	   total_amount:e.currentTarget.dataset.store.total_amount
            },
        success:function(e){
        	if(e.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
        	wx.navigateTo({url:"../orderD2/index?dataObj="+JSON.stringify(e.data)})
        	wx.hideLoading();
        	}
        }
     });
  }
})