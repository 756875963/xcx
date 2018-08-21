var app = getApp();
var  wxbarcode =  require('../../utils/index');
var  newbarcode =  require('../../utils/newBarCode');
var WxParse = require('../../wxParse/wxParse.js');
var _url = require('../../utils/url.js');
var data1 = new Array();
Page({
  data: {
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
            url:_url.local()+"/xcx/platform/barcodesearch/list.shtml",
            data:{item_barcode:res.result},
            success:function(e){
            	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
            	 var _data = e.data.data;
            	 var _array = new Array();
	            	 if(_data!=null&&_data!=""){
	            	 	 _array[0] = {index:1,
	            	 	 	class_name:_data.class_name,
	            	 	 	brand_name:_data.brand_name,
	            	 	 	item_class:_data.item_class,
	            	 	 	item_brand:_data.item_brand,
	            	 	 	goodsId:_data.item_no,
	            	 	 	num:_data.item_barcode,
	            	 	 	description:_data.item_name,
	            	 	 	fixed_point:_data.fixed_point,
	            	 	 	point_mode:_data.point_mode,
	            	 	 	image:null,
	            	 	 	price:_data.item_sale_price,
	            	 	 	unit_price:_data.item_sale_price,
	            	 	  item_vip_price:_data.item_vip_price};
	            	 	 _this.setData({data1:_array,errorDis:"",top:0, titleS:{upperText:'loading-1-',upperState:false,downText:'loading-3-',downState:false,}});
	            	 }else{
	            	 	 _this.setData({errorDis:"errors",data1:[]});
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
   	  wx.getSystemInfo({
		  success: function(res) {
		    _this.setData({height:res.windowHeight-40});
		  }
		});
   	  //同步读取缓存购物车信息
   	  try {
			  var value = wx.getStorageSync('shoppingCart');
			   this.setData({
	    	 	goodsSum:value.length
	    	 });
			  if (value) {
			      // Do something with return value
			      
			  }else{
			  }
			} catch (e) {
			  // Do something when catch error
			}
   	
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
  addgoods:function(e){
  	 this.setData({
			      numZ:1,
			      numT:1,
			      numC:0,
			      modec:"addmode",
			      shopc:e.currentTarget.dataset 	
			    })
  
  	
  	 
  	 
  	 
  	return;
  	//同步加入缓存购物车信息
    var shoppingCart = e.currentTarget.dataset;
    //读取购物车缓存信息
    var shoppingCartStorage = wx.getStorageSync('shoppingCart');
    if(shoppingCartStorage){
    	//正
    var _flag = 0;
    	 for(var i = 0;i<shoppingCartStorage.length;i++){
    	 	  if(shoppingCartStorage[i].goodsid==shoppingCart.goodsid){
    	 	  	  wx.showToast({
			            title: '购物车已存在该商品',
			            icon: 'succes',
			            duration: 1000,
			            mask:true
			        })
    	 	  	  _flag = 1;
    	 	  	  break;
    	 	  }
    	 }
    	 if(_flag==0){
    	 	 shoppingCartStorage[shoppingCartStorage.length] = shoppingCart;
    	 	 wx.setStorageSync('shoppingCart',shoppingCartStorage);
    	 	  this.setData({
	    	 	goodsSum:shoppingCartStorage.length
	    	 });
    	 }
    
    }else{
    	//反
    		var _array = new Array();
    	  _array[0] =  Object.assign(shoppingCart,{d:123});
    	  wx.setStorageSync('shoppingCart',_array);
    	  this.setData({
    	 	  goodsSum:_array.length
    	 });
    }
   /* try {
		    wx.setStorageSync('shoppingCart', shoppingCart)
		} catch (e) {    
		}*/
  },
  black_y:function(e){
  	wx.navigateBack({ changed: true });
  },
  openScanningC:function(){
  	this.openScanning();
  },
   //事件处理函数
  /*点击减号*/
  bindMinus: function(e) {
  	var minusStatus = numZ>1 ? 'normal':'disable';
    var numZ = this.data.numZ;
    var numT = this.data.numT;
    var numC = this.data.numC;
    if(e.currentTarget.dataset.flag=='z'){
    	if(numZ>1){
    		 --numZ;
    	   if(numT>0){
    	   	  --numT;
    	   }else{
    	   	  --numC;
    	   }
    	}
    	  
    }else if(e.currentTarget.dataset.flag=='c'){
    	    numC>0?--numC|++numT:"";
    }else if(e.currentTarget.dataset.flag=='t'){
    	     numT>0?--numT|++numC:"";
    }
    this.setData({
			      numZ:numZ,
			      numT:numT,
			      numC:numC,
			      minusStatus: minusStatus
			    })
  },
  /*点击加号*/
  bindPlus: function(e) {
  	var minusStatus = numZ > 1 ? 'normal' : 'disable';
    var numZ = this.data.numZ;
    var numT = this.data.numT;
    var numC = this.data.numC;
   
    if(e.currentTarget.dataset.flag=='z'){
    	   numZ++;
    	   numT++;
    	   this.setData({
			      numZ:numZ,
			      numT:numT,
			      minusStatus: minusStatus
			    })
    }else if(e.currentTarget.dataset.flag=='c'){
    	
    	    numT>0?++numC&&--numT:"";
    	    this.setData({
			      numC:numC,
			      numT:numT,
			      minusStatus: minusStatus
			    })
    	   
    }else if(e.currentTarget.dataset.flag=='t'){
    	     numC>0?++numT&&--numC:"";
    	    this.setData({
			      numC:numC,
			      numT:numT,
			      minusStatus: minusStatus
			    })
    }
    
     if(numZ!=""&&numZ>0){
    	this.setData({bg:'white'});
    }else{
    	this.setData({bg:'#f26363'});
    }
  },
  /*输入框事件*/
  bindManual: function(e) {
  	
    var numv = e.detail.value;
    var minusStatus = numv > 1 ? 'normal' : 'disable';
    if(numv!=""&&numv>0){
    	this.setData({bg:'white'});
    }else{
    	this.setData({bg:'#f26363'});
    }
    var numZ = this.data.numZ;
    var numT = this.data.numT;
    var numC = this.data.numC;
             numT = numv;
    	       numZ = numv;
    	       numC = 0;

    this.setData({
			      numZ:numZ,
			      numT:numT,
			      numC:numC,
			      minusStatus: minusStatus
			   });
  },
  /*提交事件*/
   formSubmit: function(e) {
    e.detail.value.commodityPickUp
    if(e.detail.value.commodityTotal!=""&&parseInt(e.detail.value.commodityTotal)>0){
    	//同步加入缓存购物车信息
     
    var shoppingCart = this.data.shopc;
    //读取购物车缓存信息
    var shoppingCartStorage = wx.getStorageSync('shoppingCart');
    if(shoppingCartStorage){
    	//console.log("正");	 
    var _flag = 0;
    	 for(var i = 0;i<shoppingCartStorage.length;i++){
    	 	  if(shoppingCartStorage[i].goodsid==shoppingCart.goodsid){
    	 	  	  wx.showToast({
			            title: '已存在该商品',
			            icon: 'succes',
			            duration: 1000,
			            mask:true
			        })
    	 	  	  _flag = 1;
    	 	  	  break;
    	 	  }
    	 }
    	 if(_flag==0){
    	 	 wx.showToast({
			            title: '数据处理中...',
			            icon: 'loading',
			            duration: 600,
			            mask:true
			        })
    	 	 shoppingCartStorage[shoppingCartStorage.length] = Object.assign(Object.assign(shoppingCart,e.detail.value),{img:'gactive',flag:true});
    	 	 wx.setStorageSync('shoppingCart',shoppingCartStorage);
    	 	  this.setData({
	    	 	goodsSum:shoppingCartStorage.length
	    	 });
	    	 
	    	  this.closeMode();
    	 }
    
    }else{
    	 wx.showToast({
			           title: '数据处理中...',
			            icon: 'loading',
			            duration: 600,
			            mask:true
			        })
    	 // console.log("反");
    		var _array = new Array();
    	  _array[0] =  Object.assign(Object.assign(shoppingCart,e.detail.value),{img:'gactive',flag:true});
    	  wx.setStorageSync('shoppingCart',_array);
    	  this.setData({
    	 	  goodsSum:_array.length
    	 });
    	 
    	 this.closeMode();
    }
   /* try {
		    wx.setStorageSync('shoppingCart', shoppingCart)
		} catch (e) {    
		}*/
   //console.log(wx.getStorageSync('shoppingCart'));
    	
    }else{
    	this.setData({bg:'#f26363'});
    	wx.showToast({
			            title: '提交数量不能为0',
			            icon: 'error',
			            duration: 1000,
			            mask:true
			        })
    	
    }
  },
  closeMode:function(e){
  	this.setData({
  	 modec:"removemode"
  	 })
  },
  closeMode1:function(e){
  	
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
			       });
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
      })
  	 wx.request({
            url:_url.local()+"/xcx/platform/goodssearch/list.shtml",
            data:{item_name:paging.result,   
                  page:paging.current,
                  limit:paging.limit
            },
            success:function(e){
            	var _data = e.data.data;
            	if(null!=_data&&""!=_data){
            		var _array1 = new Array();
            	//初始化分-
            	 paging.limit = e.data.limit;
				    	 paging.current = e.data.page;
				    	 paging.totalPages = e.data.totalPages;
				       paging.result = _this.data.feiC.result;
				       paging.searchState =true;
            	if(_data.length>0){
            		 for(var i =0;i<_data.length;i++){
            		 	  _array1[i]={index:1,
            		 	  	class_name:_data[i].class_name,
            		 	  	brand_name:_data[i].brand_name,
            		 	  	item_class:_data[i].item_class,
            		 	  	item_brand:_data[i].item_brand,
            		 	  	goodsId:_data[i].item_no,
            		 	  	num:_data[i].item_barcode,
            		 	  	description:_data[i].item_name,
            		 	  	image:null,price:_data[i].item_sale_price,
            		 	  	fixed_point:_data[i].fixed_point,
	            	 	 	point_mode:_data[i].point_mode,
            		 	  	unit_price:_data[i].item_sale_price,
            		 	    item_vip_price:_data[i].item_vip_price};
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
            }else{
            	 wx.showToast({
			            title: '查询结果为空',
			            icon: 'error',
			            duration: 1000,
			            mask:true
			       });
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
            	if(e.data.data!=null){
            		wx.hideLoading();
            		wx.navigateTo({
								     url:"../goodsD/index?dataObj="+JSON.stringify(e.data)
							  	});
            	}
            }
         });
  }
})
