var app = getApp();
var _url1 = require('../../utils/url.js');
Page( {
  data: {
  	hiddenmodalput:true,  
    user:"",
    errorDis:"",
    height:'',
    top:'',
    toViewe:'',
    focusState:true,//input焦点状态
    dataSum:0,
    dataZsum:0,
    val12:'',
    feiC:{
    	current:'',//当前-数
    	totalPages:'',//总-数
    	limit:'10',//分-条数
    	result:'',//搜索值
    	searchState:true,
    	emp_no:""//营业员no
    },
    titleS:{
      upperText:'loading-1-',
      upperState:false,
      downText:'loading-3-',
      downState:false,
    }
  },openScanning:function(e){
   	var _this = this;
   	wx.scanCode({
			  success: (res) => {
			    wx.showLoading({
			        title: '加载中',
			      });
			      this.req({vip_no:res.result},'se');
			  }
			})
   },
   onLoad: function (options) {
   	var _this = this;
   	if(options.flag =="Administration"){
   		   wx.setNavigationBarTitle({
			      title: '会员管理',
			      success: function(res) {
			         _this.setData({
			        	focusState:false
			        })
			         _this.req({},'se');
			      }
			    })
   	}else{
   		
   	}
   	var _this = this;
   	  wx.getSystemInfo({
		  success: function(res) {
		    _this.setData({height:res.windowHeight-40});
		  }
		  })
		  
   	//测试数据
   	var data1 = [
   	   /*{vip_no:1,vip_name:'武广波1',vip_tel1:"18994422123",integral:123456,balance:"1000.00"},
   	   {vip_no:2,vip_name:'武广波2',vip_tel1:"18994422123",integral:123456,balance:"1000.00"}*/
   	]
   	this.setData({
   		 user:data1
   	});
   	var _this = this;
    if(options.open=='true'){
   		setTimeout(function(){
   			_this.openScanning();
   			},500);
   	}
    if(options.openInput=='true'){
    }
   },
   
   inputSearch:function(e){
   	 var _value = e.detail.value;
   	 if(_value!=null&&_value!=""){
   	 		var regPos = /^[0-9]*$/; // 非负整数
   	 	if(regPos.test(_value)){
   	 		//手机号查询
   	 		 this.req({vip_tel1:_value},'se');
   	 	}else{
   	 		//会员名查询
   	 		this.req({vip_name:_value},'se');
   	 	}
   	 }
   },
   onShow: function () {
  },
  openScanningC:function(e){
  	this.openScanning();
  },
  scrolltolower:function(e){
  	//下拉
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
  		 
  		this.req(_feiC,'fe');
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
  	}
  	
  },
  req:function(val,flag){
  	  var _this = this;
  	  var paging= {
							    	current:'',//当前-数
							    	totalPages:'',//总-数
							    	limit:'10',//分-条数
							    	result:'',//搜索值
							    	searchState:true,
							    	emp_no:""//营业员no
							    };
	  	wx.showLoading({
				  title: '加载中',
			});
			
			//判断搜索条件  还是获取条件
  	 if(flag=='se'){
  	 	var vip_name,vip_no,vip_tel1; 
  	  ({vip_name} = val);
  	  ({vip_no} = val);
  	  ({vip_tel1} = val);
  	 	   //判断搜索类型
  	 	   (vip_name!= undefined) && (paging = {vip_name:vip_name,current:1,limit:10,searchState:true,totalPages:''});
  	 	   (vip_no!= undefined) &&  (paging = {vip_no:vip_no,current:1,limit:10,searchState:true,totalPages:''});
  	 	   (vip_tel1!= undefined) &&  (paging = {vip_tel1:vip_tel1,current:1,limit:10,searchState:true,totalPages:''});
  	    this.setData({
  	    	feiC:paging
  	    });
  	 }else{
  	 	    paging = Object.assign(this.data.feiC,{page:this.data.feiC.current});
  	 }
     	 
  	
  	 //url和data的设定
     var _url="";
  	 if(_this.data.focusState){
  	 	 //会员查询入口
  	 	 _url=_url1.local()+"/xcx/platform/goodsdepositandout/list.shtml";
  	 }else{
  	 	 //会员管理入口
  	 	_url=_url1.local()+"/xcx/platform/goodsdepositandout/list.shtml";
  	 	  paging = Object.assign(paging,{emp_no:getApp().globalData.empno.user_emp_no});
  	 	
  	 }
  	  wx.request({
        url:_url,
        data:paging,
        success:function(e){
        	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
        	 var _data = e.data.data.data;
        	 var _array = new Array();
        	 var  _toView;
        	  	//初始化分-
            	 paging.limit = e.data.data.limit;
				    	 paging.current = e.data.data.page;
				    	 paging.totalPages = e.data.data.totalPages;
				    	 //判断分页类型
				    	 if(_this.data.feiC.vip_name!= undefined){paging.vip_name = _this.data.feiC.vip_name;}
				    	 if(_this.data.feiC.vip_no!= undefined){paging.vip_no = _this.data.feiC.vip_no;}
				    	 if(_this.data.feiC.vip_tel1!= undefined){paging.vip_tel1 = _this.data.feiC.vip_tel1;}
				       paging.searchState =true;
        	  if(_data.length>0){
        	  	for(var i=0;i<_data.length;i++){
        	  	_array[i] = {in_fact_count:_data[i].in_fact_count,//寄存数量
        	  		           in_emp_man:_data[i].in_emp_man,//寄存营业员
        	  		           in_item_name:_data[i].in_item_name,//寄存商品的名称
        	  		           vip_name:_data[i].vip_name,//会员姓名
        	  		           sheet_no:_data[i].sheet_no,//寄存单号
        	  		           in_item_barcode:_data[i].in_item_barcode,//寄存商品的条形码
        	  		           put_time:_data[i].put_time,//寄存时间
        	  		           in_left_num:_data[i].in_left_num,//寄存剩余数量
        	  		           out_item_name:_data[i].out_item_name,//提取商品名称
        	  		           vip_no:_data[i].vip_no,//会员编号
        	  		           out_emp_name:_data[i].out_emp_name,//提取营业员
        	  		           out_num:_data[i].out_num,//提取数量
        	  		           out_time:_data[i].out_time,//提取时间
        	  		           vip_tel:_data[i].vip_tel,//会员电话
        	  		           out_item_code:_data[i].out_item_code//提取商品条形码
        	  		          }
        	    if(i==0){
            		 	  	//用于跳转指定分-的位置
            		 	  	_toView ="x"+_data[i].vip_no;
            		 	  }
        	  	}
        	  	 //判断查询还是分-
            		 if(flag=='fe'){
            		 	_this.setData({user:_this.data.user.concat(_array),errorDis:"",feiC:paging,toViewe:_toView});
            		 	 
            		 }else{
            		 	 _this.setData({user:_array,errorDis:"",feiC:paging,toViewe:_toView,top:0});
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
  },
  addCustomer:function(e){
  	var app = getApp();
		app.globalData.vipno = {id:e.currentTarget.dataset.vipno,name:e.currentTarget.dataset.vipname};  //存储数据到app对象上
		wx.navigateBack();
  },
  onReady: function () {
  	wx.hideLoading();
  },
  memberDh:function(options){
  	   //var _vipno =  options.currentTarget.dataset.vipno;
  	   wx.navigateTo({url:"../inventoryManageD/index?options="+JSON.stringify(options)+'&qieflag='+options.currentTarget.dataset.flag});
  },
  tihoumain:function(e){
  	  if(e.currentTarget.dataset.inleftnum>0){
  	  	 this.setData({  
           hiddenmodalput: !this.data.hiddenmodalput ,
           dataSum:e.currentTarget.dataset.inleftnum,
           shootNo:e.currentTarget.dataset.shootno,
           in_item_barcode:e.currentTarget.dataset.in_item_barcode,
           val12:''
       });
  	  }
  	 
  },
   //点击按钮痰喘指定的hiddenmodalput弹出框  
   
    //取消按钮  
    cancel: function(){  
        this.setData({  
            hiddenmodalput: true  
        });  
    },  
    //确认  
    confirm: function(){  
    	  //输入数量和库存数量比较
    	  var s_sum = this.data.dataZsum;
    	  var c_sum = this.data.dataSum;//提取库存数量
    	  var _this = this;
    	  if(s_sum<=c_sum&&s_sum>0){
    	  	this.setData({  
            hiddenmodalput: true  
          });
           // 请求修改 
           var shoot_no = this.data.shootNo;//shootno
           var empObj_u = app.globalData.empno.user_emp_no;//营业员no
           var empObj_n = app.globalData.empno.user_branch_no;//门店no
           var in_item_barcode = this.data.in_item_barcode;//入库条形码编号
            wx.request({
			        url:_url1.local()+"/xcx/platform/updategoodsdepositandout/list.shtml",
			        data:{
			        	sheet_no:shoot_no,
			        	in_item_barcode:in_item_barcode,
			        	out_num:s_sum,
			        	branch_no:empObj_n,
			        	emp_no:empObj_u
			        },
			        success:function(e){
			        	if(e.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
			        	  var _content = e.data.data.success? e.data.data.messasge:e.data.data.messasge+e.data.data.sheet_no
			        	  var _success =  e.data.data.success?'成功提示':'失败提示'
			        	 wx.showModal({
											title: _success,
											content: _content,
											success: function(res) {
												if (res.confirm) {
												_this.req(_this.data._feiC,'fe1');
												} else if (res.cancel) {
												}
											}
										})
                 }
			        } 
						});
           
    	  }else{
    	  	 wx.showToast({
			            title: '提货数量有误',
			            icon: 'error',
			            duration: 1000,
			            mask:true
			       });
    	  }
        
    },
    bindManual:function(e){
    	//输入存货数量判断
    	if(e.detail.value>0){
    		  this.setData({
    		  	dataZsum:parseInt(e.detail.value)
    		  });
    	}else{
    		 this.setData({
    		  	dataZsum:-1
    		  });
    	}
    }
})
