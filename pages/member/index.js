var app = getApp();
var _url1 = require('../../utils/url.js');
var data1;
Page( {
  data: {
    user:data1,
    errorDis:"",
    height:'',
    top:'',
    toViewe:'',
    focusState:true,//input焦点状态
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
			    if(res.result!=""){
			    	 wx.request({
           url:_url1.local()+"/xcx/platform/vipnosearch/list.shtml",
            data:{vip_no:res.result},
            success:function(e){
            	
            	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
            	 var _data = e.data.data;
            	 var _array = new Array();
	            	 if(_data!=null&&_data!=""){
	            	 	 _array[0] ={vip_birth:_data[0].vip_birth,vip_no:_data[0].vip_no,vip_name:_data[0].vip_name,vip_tel1:_data[0].vip_tel1,integral:_data[0].give_amt,balance:_data[0].vip_point,type_id:_data[0].type_id}
	            	 	 _this.setData({user:_array,errorDis:"",top:0, titleS:{upperText:'loading-1-',upperState:false,downText:'loading-3-',downState:false,}});
	            	   _this.setData({
	            	  	 titleS:{
								      upperText:'loading-1-',
								      upperState:false,
								      downText:'没有更多记录',
								      downState:true,
								     }
	            	  });
	            	 }else{
	            	 	 //么有数据返回的散客数据
        	  	    //么有数据返回的散客数据
        	  	       var fit;
		        	  	   if(_this.data.focusState){
		        	  	   	 fit= [{vip_no:"000000000000",vip_name:'(散客)',vip_tel1:"暂无",integral:0,balance:"0.00"}]
		        	  	   }else{
		        	  	   	 fit= [];
		        	  	   }
	            	 	 _this.setData({errorDis:"errors",user:fit
	            	 	 , titleS:{
								      upperText:'loading-1-',
								      upperState:false,
								      downText:'没有更多记录',
								      downState:false,
								     }});
	            	 	
	            	 }
            		  wx.hideLoading();
             }
            	}
            })
			    }
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
   	data1 = [
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
			var vip_name,vip_no,vip_tel1; 
  	  ({vip_name} = val);
  	  ({vip_no} = val);
  	  ({vip_tel1} = val);
			//判断搜索条件  还是获取条件
  	 if(flag=='se'){
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
     	 
  	 var vip_name;
  	 ({vip_name} = val);
  	 //url和data的设定
     var _url="";
  	 if(_this.data.focusState){
  	 	 //会员查询入口
  	 	 _url=_url1.local()+"/xcx/platform/vipsearch/list.shtml";
  	 }else{
  	 	 //会员管理入口
  	 	 _url=_url1.local()+"/xcx/platform/empvipsearch/list.shtml";
  	 	  paging = Object.assign(paging,{emp_no:getApp().globalData.empno.user_emp_no});
  	 	
  	 }
  	  wx.request({
        url:_url,
        data:paging,
        success:function(e){
        	 var _data = e.data.data;
        	 var _array = new Array();
        	 var  _toView;
        	  	//初始化分-
            	 paging.limit = e.data.limit;
				    	 paging.current = e.data.page;
				    	 paging.totalPages = e.data.totalPages;
				    	 //判断分页类型
				    	 if(_this.data.feiC.vip_name!= undefined){paging.vip_name = _this.data.feiC.vip_name;}
				    	 if(_this.data.feiC.vip_no!= undefined){paging.vip_no = _this.data.feiC.vip_no;}
				    	 if(_this.data.feiC.vip_tel1!= undefined){paging.vip_tel1 = _this.data.feiC.vip_tel1;}
				       paging.searchState =true;
        	  if(_data.length>0){
        	  	for(var i=0;i<_data.length;i++){
        	  	_array[i] = {vip_birth:_data[i].vip_birth,vip_no:_data[i].vip_no,vip_name:_data[i].vip_name,vip_tel1:_data[i].vip_tel1,integral:_data[i].save_amt,balance:_data[i].vip_point,type_id:_data[i].type_id}
        	    if(i==0){
            		 	  	//用于跳转指定分-的位置
            		 	  	_toView ="x"+_data[i].vip_no;
            		 	  }
        	  	}
        	  	 //判断查询还是分-
            		 if(flag=='se'){
            		 	 _this.setData({user:_array,errorDis:"",feiC:paging,toViewe:_toView,top:0});
            		 	 if(e.data.page>e.data.totalPages){
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
            		 	 _this.setData({user:_this.data.user.concat(_array),errorDis:"",feiC:paging,toViewe:_toView});
            		 	 if(e.data.page>e.data.totalPages){
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
        	  	
            	 /* _this.setData({
            	  	 user:_array,
            	  	 errorDis:"",
            	  	 feiC:paging
            	  });*/
        	  }else{
        	  	   //么有数据返回的散客数据
        	  	     var fit;
        	  	   if(_this.data.focusState){
        	  	   	 fit= [{vip_no:"000000000000",vip_name:'(散客)',vip_tel1:"暂无",integral:0,balance:"0.00"}]
        	  	   }else{
        	  	   	 fit= [];
        	  	   }
        	  	   _this.setData({
	            	  	 user:fit,
	            	  	 errorDis:"errors",
	            	  	 titleS:{
								      upperText:'loading-1-',
								      upperState:false,
								      downText:'没有更多记录',
								      downState:true,
								     }
	            	  });
        	  }
        		wx.hideLoading();
        		
         }
       })
  },
  addCustomer:function(e){
  	var app = getApp();
		app.globalData.vipno = {id:e.currentTarget.dataset.vipno,name:e.currentTarget.dataset.vipname,type_id:e.currentTarget.dataset.type_id,vip_birth:e.currentTarget.dataset.vip_birth};  //存储数据到app对象上
		wx.navigateBack();
  },
  onReady: function () {
  	wx.hideLoading();
  },
  memberDh:function(options){
  	  var _vipno =  options.currentTarget.dataset.vipno;
      wx.navigateTo({url:"../memberD/index?vipno="+_vipno});
  }
})
