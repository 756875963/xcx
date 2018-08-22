var app = getApp();
var _url = require('../../utils/url.js');
Page( {
  data: {
    cartImg: '',
    tipWords: '',
    shopc:null,
    priceZ:0,
    sum:0,
    vip:{
    	id:"",
    	name:""
    },
    _image:"gactive",
     modec:"removemode",
     sumS:{numZ:1,numT:1,numC:0},
     goodsid:0
  },
  onLaunch: function () {
    
  },
  onLoad:function(e){
  	if(e.flag&&e.flag=='1'){
  		app.globalData.vipno="";
  	}
  	 wx.showLoading({
				  title: '加载中',
			});
  },
  tapClick:function(e){
  	if(e.currentTarget.dataset.flag=='true'){
  			wx.navigateTo({url:"../goodsSearch/index?open=true"});
  	}else{
  		  wx.navigateTo({url:"../goodsSearch/index?open=false&openInput=true"});
  	}
  
  },
  custapClick:function(e){
  	if(e.currentTarget.dataset.flag=='true'){
  			wx.navigateTo({url:"../member/index?open=true"});
  	}else{
  		  wx.navigateTo({url:"../member/index?open=false&openInput=true"});
  	}
  },
  onShow: function (e) {
  	wx.showLoading({
				  title: '数据加载中',
			});
  	var _this = this;
  	//读取会员选择页面的数据 要做判定的
		if(app.globalData.vipno!=null&&app.globalData.vipno!=""){
			 this.setData({
			 	vip:app.globalData.vipno
			 })
		}
		
    var shoppingCartStorage = wx.getStorageSync('shoppingCart');
    //计算总额
    //if(shoppingCartStorage[0].img)
    setTimeout(function(){_this.Calculation(shoppingCartStorage);},1000);
    
    	/*wx.getSystemInfo({
			  success: function(res) {
			    
			  }
     });*/
   
  },
  onHide: function () {
  },
  onReady:function () {
  },
  globalData:{
    userInfo:null
  },
  Calculation:function(shoppData1){
  	var shoppData = wx.getStorageSync('shoppingCart');
  	var priceZ =0;
  	var sum1 = 0;
  	var imgC = new Array();
  	//判断是否会员的
  	if(undefined!=app.globalData.vipno&&null!=app.globalData.vipno){
  		  if(app.globalData.vipno.id=="000000000000"){
  		  	 for(var i = 0; i<shoppData.length;i++){
				  		shoppData[i] = Object.assign(shoppData[i],{total_amt_small:(shoppData[i].commodityTotal*shoppData[i].price).toFixed(2)});
				  		if(shoppData[i].flag == true){
				  			priceZ= parseFloat(priceZ)+parseFloat(shoppData[i].commodityTotal*shoppData[i].price);
				  		}
				  	 	shoppData[i].flag? sum1++:"";
				  	 }
  		  }else{
		  		   for(var i = 0; i<shoppData.length;i++){
			  		shoppData[i] = Object.assign(shoppData[i],{total_amt_small:(shoppData[i].commodityTotal*shoppData[i].item_vip_price).toFixed(2)});
			  		if(shoppData[i].flag == true){
			  			priceZ= parseFloat(priceZ)+parseFloat(shoppData[i].commodityTotal*shoppData[i].item_vip_price);
			  		}
			  	 	shoppData[i].flag? sum1++:"";
	  	 }
	  	 }
  	}else{
  		 for(var i = 0; i<shoppData.length;i++){
	  		shoppData[i] = Object.assign(shoppData[i],{total_amt_small:(shoppData[i].commodityTotal*shoppData[i].price).toFixed(2)});
	  		if(shoppData[i].flag == true){
	  			priceZ= parseFloat(priceZ)+parseFloat(shoppData[i].commodityTotal*shoppData[i].price);
	  		}
	  	 	shoppData[i].flag? sum1++:"";
	  	 }
  	
  	}
  	
  	   wx.hideLoading();
  	  this.setData({
    	shopc:shoppData,
    	priceZ:priceZ.toFixed(2),
    	sum:sum1,
    	_image:sum1==shoppData.length ? 'gactive':'gnact1'
    	
    });
  },
  radioClick:function(e){
  	//判断选中状态
  	var _shopc = wx.getStorageSync('shoppingCart');
  	if(e.currentTarget.dataset.rli=="1"){
  		var sum = 0;
  		for(var i = 0 ; i < _shopc.length; i++){
	  		if(_shopc[i].goodsid == e.currentTarget.dataset.goodsid){
	  			 _shopc[i].img  = _shopc[i].img  == 'gactive' ? 'gnact1' : 'gactive';
	  			 _shopc[i].flag = _shopc[i].flag == true ? false : true;
	  			 
	  		}
	  		if(_shopc[i].flag==false){
	  			sum++;
	  		}
	  	}
  		
  		
  			this.setData({
  			_image: sum>0 ?'gnact1': 'gactive'
  		});
  		
  	}else{
  		if(e.currentTarget.dataset.qh =="gnact1"){
  			for(var i = 0 ; i < _shopc.length; i++){
             _shopc[i].img  =  'gactive' ;
		  			 _shopc[i].flag =  true ;
		  		
		  	}
  			
  		}else{
  			for(var i = 0 ; i < _shopc.length; i++){	  		
		  			 _shopc[i].img  =  'gnact1' ;
		  			 _shopc[i].flag =  false ;
		  		
		  	}
  		}
  		this.setData({
  			_image:e.currentTarget.dataset.qh=="gnact1"? 'gactive' : "gnact1"
  		});
  	}
  	this.setData({
  			shopc:_shopc
  		})
  	
  	 wx.setStorageSync('shoppingCart',_shopc);
  	 this.Calculation(_shopc);
  	 var _shopc1 = wx.getStorageSync('shoppingCart');
  	 var sum1 = 0;
  	 for(var i = 0 ;i < _shopc1.length;i++){
  	 	
  	 	_shopc1[i].flag? sum1++:"";
  	 }
  	 this.setData({
  			sum:sum1
  		})
  },
  bianjian:function(e){
  	var _shopc1 = wx.getStorageSync('shoppingCart');
    for(var i = 0 ;i < _shopc1.length;i++){
  		if(_shopc1[i].goodsid == e.currentTarget.dataset.goodsid){
  			 this.setData({
  			 	sumS:{
  			 		numZ:_shopc1[i].commodityTotal,
  			 		numC:_shopc1[i].commodityStock,
  			 		numT:_shopc1[i].commodityPickUp}
  			 })
  		}else{
  			 
  		}
  	}
    
  	this.setData({
  		 modec:"addmode",
  		 goodsid:e.currentTarget.dataset.goodsid
  	});
  },
  closeMode:function(e){
  	
  	this.setData({
  	 modec:"removemode"
  	 })
  },
  closeMode1:function(e){
  	
  },
  //事件处理函数
  /*点击减号*/
  bindMinus: function(e) {
  	var minusStatus = numZ>1 ? 'normal':'disable';
    var numZ = this.data.sumS.numZ;
    var numT = this.data.sumS.numT;
    var numC = this.data.sumS.numC;
     
 
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
			      sumS:{numZ:numZ,numT:numT,numC:numC},
	          minusStatus: minusStatus
			   });
  },
  /*点击加号*/
  bindPlus: function(e) {
  	var minusStatus = numZ > 1 ? 'normal' : 'disable';
    var numZ = this.data.sumS.numZ;
    var numT = this.data.sumS.numT;
    var numC = this.data.sumS.numC;
    if(e.currentTarget.dataset.flag=='z'){
    	   numZ++;
    	   numT++;
    	   this.setData({
			      sumS:{numZ:numZ,numT:numT,numC:numC},
	          minusStatus: minusStatus
			   });
    }else if(e.currentTarget.dataset.flag=='c'){
    	
    	    numT>0?++numC&&--numT:"";
    	    this.setData({
			      sumS:{numZ:numZ,numT:numT,numC:numC},
	          minusStatus: minusStatus
			   });
    	   
    }else if(e.currentTarget.dataset.flag=='t'){
    	     numC>0?++numT&&--numC:"";
    	    this.setData({
			      sumS:{numZ:numZ,numT:numT,numC:numC},
	          minusStatus: minusStatus
			   });
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
   var numZ = this.data.sumS.numZ;
   var numT = this.data.sumS.numT;
   var numC = this.data.sumS.numC;
             numT = numv;
    	       numZ = numv;
    	       numC = 0;

    this.setData({
			      sumS:{numZ:numZ,numT:numT,numC:numC},
	          minusStatus: minusStatus
			   });
  },
  /*提交事件*/
   formSubmit: function(e) {
    if(e.detail.value.commodityTotal!=""&&parseInt(e.detail.value.commodityTotal)>0){
    	//同步加入缓存购物车信息
    var shoppingCart = this.data.shopc;
    //读取购物车缓存信息
    var _shopc1 = wx.getStorageSync('shoppingCart');
    for(var i = 0 ;i < _shopc1.length;i++){
  		if(_shopc1[i].goodsid == e.detail.value.goodsid){
  			_shopc1[i].commodityTotal  = e.detail.value.commodityTotal;
  			_shopc1[i].commodityStock  = e.detail.value.commodityStock;
  			_shopc1[i].commodityPickUp = e.detail.value.commodityPickUp;
  		}
  	}
       this.setData({
       	shopc:_shopc1
       });
       wx.setStorageSync('shoppingCart',_shopc1);
       this.Calculation(shoppingCart);
    	 this.closeMode();
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
  Settlement:function(e){
  	 //1.提取商品信息    2.提取会员信息  3商品信息和会员信息绑定
  	 //1提取商品信息
  	 var _shopCart= wx.getStorageSync('shoppingCart');
  	 var _effective = new Array();
  	 for(var i=0,j=0;i<_shopCart.length;i++){
  	 	  if(_shopCart[i].flag){
  	 	  	_effective[j++]=_shopCart[i];
  	 	  }
  	 }
  	 if(_effective<1){
  	 	wx.showToast({
			            title: '未选择商品',
			            icon: 'error',
			            duration: 2000,
			            mask:true
			       });
  	 	return;
  	 }
  	 
  	 //2.提取会员信息 
  	  var vipno = app.globalData.vipno;
  	 if(vipno==undefined||(vipno==""||vipno==null)){
  	 		wx.showToast({
			            title: '未选择会员',
			            icon: 'error',
			            duration: 2000,
			            mask:true
			       })
  	 	return;
  	 }
  	
  	 //3商品信息和会员信息绑定
  	 var orderObj= {goodsList:_effective,vipinfo:vipno};
  	 wx.showLoading({
				  title: '优惠计算中',
			});
			wx.request({
            url:_url.local()+"/xcx/platform/index/calculation.shtml",
            header: { "Content-Type": "application/x-www-form-urlencoded"},
            method: 'POST',
            data:{orderObj:JSON.stringify(orderObj)},
            success:function(e){
            	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
            		 wx.navigateTo({url:"../balance/index?options="+JSON.stringify(e.data)});
            		 app.globalData.orderObj = e.data;
            		 wx.hideLoading();
            	}
            }
          })
  },put_upFcn:function(){
  	
  	var _this = this;
  	//挂单
  	var vipno = app.globalData.vipno;//当前会员信息
  	var shoppingCartStorage = wx.getStorageSync('shoppingCart');//当前商品信息
  	
  	wx.showActionSheet({
			itemList: ['订单挂单', '查看挂单'],
			success: function(res) {
				if(res.tapIndex==0){
					var _shopCart= wx.getStorageSync('shoppingCart');
					if(_shopCart.length>0){
					
  	       if(vipno==""||vipno==null){
  	 		     wx.showToast({
			            title: '未选择会员',
			            icon: 'error',
			            duration: 2000,
			            mask:true
			        });
  	 		    
				   }else{
				   	  var _put_upList= wx.getStorageSync('put_upList');//挂单功能
				   	  var  exist=true;
				   	  if(""!=_put_upList&&null!=_put_upList){
				   	  	for(var i = 0; i<_put_upList.length;i++){
				   	  		 if(_put_upList[i].vip.id==vipno.id){
				   	  		 	exist = false;
				   	  		 	break;
				   	  		 }
				   	  	}
				   	  	if(exist){
				   	  		_put_upList.push({vip:vipno,shopCart:shoppingCartStorage});
				   	  		 wx.setStorageSync('put_upList',_put_upList);
				   	  		 wx.setStorageSync('shoppingCart',"");
				   	  		 app.globalData.vipno = "";
				   	  		 _this.setData({
				   	  		 	 shopc:[],
				   	  		 	 vip:{
									    	id:"",
									    	name:""
									    }
				   	  		 });
				   	  		 wx.showToast({
			            title: '挂单成功',
			            icon: 'error',
			            duration: 2000,
			            mask:true
			             });
				   	  	}else{
				   	  		wx.showToast({
			            title: '会员挂单重复',
			            icon: 'error',
			            duration: 2000,
			            mask:true
			             });
				   	  	}
				   	 /* _array.push({vip:vipno,shopCart:_shopCart});
				   	  console.log(_array);*/
				   	  
				   	  }else{
				   	  	//第一次挂单
				   	  	var  _array = [];
				   	    _array.push({vip:vipno,shopCart:shoppingCartStorage});
				   	    wx.setStorageSync('put_upList',_array);
				   	    wx.setStorageSync('shoppingCart',"");
				   	  		 app.globalData.vipno = "";
				   	  		 _this.setData({
				   	  		 	 shopc:[],
				   	  		 	 vip:{
									    	id:"",
									    	name:""
									    }
				   	  		 });
				   	  		 wx.showToast({
			            title: '挂单成功',
			            icon: 'error',
			            duration: 2000,
			            mask:true
			             });
				   	  }
				   }
				 }else{
				   	 wx.showToast({
			            title: '未选择商品',
			            icon: 'error',
			            duration: 2000,
			            mask:true
			        })
				   }
				}else{
					wx.navigateTo({
								     url:"../suspend/index"
							  	});
				}
			},
			fail: function(res) {
			}
			})

  },
  deleteShop:function(e){//删除商品
  	var goods_list = wx.getStorageSync('shoppingCart');
  	for(var i=0;i<goods_list.length;i++){
  		 if(e.currentTarget.dataset.id==goods_list[i].goodsid){
  		 	  goods_list.splice(i,1);
  		 }
  	}
  	wx.setStorageSync('shoppingCart',goods_list);
     this.Calculation(wx.getStorageSync('shoppingCart'));
     this.closeMode();
  }
})
