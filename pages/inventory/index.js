var app = getApp();
var data1 = new Array();
var _url = require('../../utils/url.js');
Page({
  data: {
  	invH:'',
    data1: data1,
    tipWords: '',
    mode:'',
    modeFlag:'none',
    goodsSum:'0',
    numZ:1,
    numT:1,
    numC:0,
    modec:"removemode",
    bg:'white',
    toView:'',
    shopc:null,
    errorDis:"",
    top:'',
    feiC:{
    	current:'',//当前-数
    	totalPages:'',//总-数
    	limit:'10',//分-条数
    	result:'',//搜索值
    	searchState:true 
    },
    titleS:{
      upperText:'loading-1-',
      upperState:false,
      downText:'loading-3-',
      downState:false,
    }
  },openScanning:function(e){
  	//扫描
   	var _this = this;
   	wx.scanCode({
			  success: (res) => {
			    wx.showLoading({
			        title: '加载中',
			      })
			    if(res.result!=""){
			    	 wx.request({
            url:_url.local()+"/xcx/platform/barCodeKuCunSearch/list.shtml",
            data:{item_barcode:res.result,user_branch_no:app.globalData.empno.user_branch_no},
            success:function(e){
            	 var _data = e.data.data;
            	 var _array = new Array();
	            	 if(_data!=null){
	            	 	 _array[0] = {index:0,goodsId:_data.item_no,
            		 	  	          num:_data.item_barcode,
            		 	  	          description:_data.item_name,
            		 	  	          remain_num:_data.remain_num,
            		 	  	          item_sale_price:_data.item_sale_price,
            		 	  	          image:null,
            		 	  	          price:_data.item_in_price
	            	 	              };
	            	 	 _this.setData({data1:_array,errorDis:"",top:0, titleS:{upperText:'loading-1-',upperState:false,downText:'loading-3-',downState:false,}});
	            	 }else{
	            	 	 _this.setData({errorDis:"errors"});
	            	 }
            		  wx.hideLoading();
             }
            })
			    }
			     
			  }
			})
   },
   onLoad: function (options) {
   	var _this = this;
   	  wx.getSystemInfo({
		  success: function(res) {
		  	var _invH = parseInt(res.windowHeight*0.8)-102;
		    _this.setData({height:res.windowHeight-40,invH:_invH});
		  }
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
   
   
   onShow: function () {
   
  },
  imgclick:function(e){
  	var _number = e.currentTarget.dataset.nubmer;
  	if(_number!=null&&_number!=""){
  		 var that = this;
       WxParse.wxParse('article', 'html', newbarcode.code128(_number,'B'), that, 5);
       this.setData({modeFlag:"block"});
  	}else{
  		
  	}
  },
  closeMode2:function(e){
  	 this.setData({modeFlag:"none"});
  	
  },
  query_inventoryD:function(e){
  	     //查询全部库存的方法
  	     wx.showLoading({
			        title: '加载中',
			      })
  	   if(null!=e.currentTarget.dataset.num&&""!=e.currentTarget.dataset.num){
  	   	   //全部门店的库存方法
  	   	    /*wx.request({
	            url: 'https://xcx.juelun.net/xcx1/xcx/platform/goodssearchinwarehouse/list.shtml',
	            data:{bar_code:e.currentTarget.dataset.num},
	            success:function(e){
	            	 wx.hideLoading();
	            	if(e.data.data.StockList.length>0){
	            		wx.navigateTo({
								     url:"../inventoryD/index?dataObj="+JSON.stringify(e.data) 
							  	})
	            	}else{
	            		wx.showToast({
				            title: '没有该商品库存',
				            icon: 'succes',
				            duration: 2000,
				            mask:true
				         });
	              }
	            }
           });*/
           //本店的库存方法
           wx.request({
	            url:_url.local()+"/xcx/platform/goodssearchinwarehouse/list.shtml",
	            data:{bar_code:e.currentTarget.dataset.num,item_name:e.currentTarget.dataset.description},
	            success:function(e){
	            	 wx.hideLoading();
	            	if(e.data.data.StockList.StockList.length>0){
	            		wx.navigateTo({
								     url:"../inventoryD/index?dataObj="+JSON.stringify(e.data)
							  	})
	            	}else{
	            		wx.showToast({
				            title: '没有该商品库存',
				            icon: 'succes',
				            duration: 2000,
				            mask:true
				         });
	              }
	            }
           });
  	   }else{
  	   	   wx.showToast({
			            title: '操作异常',
			            icon: 'succes',
			            duration: 1000,
			            mask:true
			        })
  	   }
  },
  black_y:function(e){
  	wx.navigateBack({ changed: true });
  },
  openScanningC:function(){
  	this.openScanning();
  },
   
  inputSearch:function(e){
  	//搜索方法
  	wx.showLoading({
			  title: '加载中',
		});
  	var _this = this;
  	var _e = e;
  	if(e.detail.value!=null||e.detail.value!=""){
  		  //分-调用方法；(this,e){}
  		  this.pagingFunction({superthis:_this,supere:_e},'se');
  	}else{
  		 wx.showToast({
			            title: '查询条件有误',
			            icon: 'error',
			            duration: 1000,
			            mask:true
			        })
  	}
  	
            
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
  		this.pagingFunction({superthis:_this,supere:_e},'fe');
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
  scrolltoupper:function(e){
  	//上拉
  },
  //分-方法
  pagingFunction:function(se,flag){
  	 var _this = se.superthis;
  	 var _e =  se.supere;
  	 var paging  = this.data.feiC;
  	 var _toView ;
  	 //判断搜索条件  还是获取条件
  	 if(flag=='se'){
  	 	paging = {result:_e.detail.value,current:1,limit:10,searchState:true,totalPages:''};
  	    this.setData({
  	    	feiC:paging
  	    });
  	 }else{
  	 	
  	 }
  	  wx.showLoading({
        title: '加载中',
      });
  	 wx.request({
            url:_url.local()+"/xcx/platform/kucunList/list.shtml",
            data:{item_name:paging.result,   
                  page:paging.current,
                  limit:paging.limit,
                  user_branch_no:app.globalData.empno.user_branch_no
            },
            success:function(e){
            	var _data = e.data.data;
            	var _array1 = new Array();
            	//初始化分-
            	 paging.limit = e.data.limit;
				    	 paging.current = e.data.page;
				    	 paging.totalPages = e.data.totalPages;
				       paging.result = _this.data.feiC.result;
				       paging.searchState =true;
            	if(_data.length>0){
            		 for(var i =0;i<_data.length;i++){
            		 	  _array1[i]={index:i,goodsId:_data[i].item_no,
            		 	  	num:_data[i].item_barcode,
            		 	  	description:_data[i].item_name,
            		 	  	remain_num:_data[i].remain_num,
            		 	  	item_sale_price:_data[i].item_sale_price,
            		 	  	image:null,price:_data[i].item_in_price};
            		 	  if(i==0){
            		 	  	//用于跳转指定分-的位置
            		 	  	_toView ="x"+_data[i].item_barcode;
            		 	  }
            		 }
            		 //判断查询还是分-
            		 if(flag=='se'){
            		 	 _this.setData({data1:_array1,errorDis:"",feiC:paging,toViewe:_toView,top:0});
            		 }else{
            		 	 _this.setData({data1:_this.data.data1.concat(_array1),errorDis:"",feiC:paging,toViewe:_toView});
            		 }
                 wx.hideLoading();
            	}else{
            		_this.setData({
            			errorDis:"errors",
            			data1:[],
            			titleS:{
							      upperText:'loading-1-',
							      upperState:false,
							      downText:'loading-3-',
							      downState:false,
							    }
            		});
            		 wx.hideLoading();
            	}
            }
            });
  },onready:function(){
  	wx.hideLoading();
  },
  query_goodsObj:function(e){
  	wx.showLoading({
        title: '加载中',
      });
  	 wx.request({
            url:_url.local()+"/xcx/platform/barcodesearch/list.shtml",
            data:{item_barcode:e.currentTarget.dataset.goodsobj.num},
            success:function(e){
            	if(e.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
            	if(e.data.data!=null){
            		wx.hideLoading();
            		wx.navigateTo({
								     url:"../goodsD/index?dataObj="+JSON.stringify(e.data)
							  	});
            	}
            	}
            	
            }
         });
  }
})
