var app = getApp();
var data1=[{commodityPickUp:0,commodityStock:"0",commodityTotal:"0",description:
"数据初始中...",flag:true,goodsid:"0",img:"gactive",num:"0",price:"0.00",
total_amt_small:"0.00",vip_point:0}];//初始化数据
var obj;
var _url = require('../../utils/url.js');
var _paymentObjTotal=[
  {paymentId:'08',checkedState:false,description:"余额支付",total:0},
  {paymentId:'06',checkedState:false,description:"微信支付",total:0},
  {paymentId:'01',checkedState:false,description:"现金支付",total:0},
  {paymentId:'07',checkedState:false,description:"支付宝",total:0}
];//页面定义支付类型
var _givegoodsList=[{
   	item_name:'',//赠送商品名字
   	barcode:'',//商品条码
   	give_itemCount:'',//商品数量
   	item_sale_price:''
   }];
Page({
  data: {
  balance_footer:0,//收款定位为
  modec:"removemode",
  control:{
  	type1:"",//促销活动多选控制
  	type2:"" //礼券多选控制
  },
  givegoodsList:'',//显示赠送商品集合
  BackstageGiveGoodsList:"",//后台的赠送的商品集合
   vipinfo:{
   	id:'',
   	point:'',
   	save_amt:'',
   	vip_name:'',
   	vip_tel:''
   },//会员信息
   givegoods:{
   	item_name:'',//赠送商品名字
   	barcode:'',//商品条码
   	give_itemCount:'',//商品数量
   	item_sale_price:''
   },//赠送商品对象
   givepromotional:{
   	StampType_name:'',//礼劵名字
   	give_couponCount:'',//礼券数量
   },//赠送礼券对象
   givepromotionalList:"",//赠送礼券集合
   paymentObj:"",//支付类型
   paymentObjTotal:0,//支付类型总价
   zhankai:"zhankai",
   goodsHeight:"height115",
   fudD:"收起",
   goodsList:data1,//商品集合
   more:"",//促销劵的数量判断
   order_amt:0,//订单总价
   promotional_price:0,//促销优惠金额
   total_amt:0,//商品总价
   total_point:0,//赠送总积分
   promotional:"",//优惠卷集合
   paymentTotal:"",//实际付款的金额
   orderTotlaz:0,//订单折扣率
   lq:'',//礼券集合
   lq_price:0,//礼券优惠金额,
   total_qty:0,//订单商品总数
   print:1//1.手动打印 0.自动打印
  },
   onLoad: function (options) {
   	 //obj =JSON.parse(options.options);
   	 obj = app.globalData.orderObj
   	/* console.log(options.options,obj);
   	this.onShow(obj);*/
   },
   paymentjsu:function(paymentObj,price){
   	   for(var i=0;i<paymentObj.length;i++){
   	   	if(paymentObj[i].paymentId=="01"){
   	   		 paymentObj[i].total = price+"";
   	   		 paymentObj[i].checkedState = "true";
   	   	}
   	   }
   	   return paymentObj;
   }
   ,
   onShow: function () {
    var _total_qty = 0;
     for(var i =0;i<obj.data.goodsList.length;i++){
     	 _total_qty+=parseInt(obj.data.goodsList[i].commodityTotal);
     }
    //重新设置
     wx.setStorageSync('shoppingCart',obj.data.goodsList);
     //测试数据的绑定
    this.setData({
   	 	goodsList:obj.data.goodsList,//商品集合
   	 	paymentObj:this.paymentjsu(wx.getStorageSync('paymentObj'),obj.data.order_amt),
      //more:obj.data.more,促销劵的数量判断
      order_amt:obj.data.order_amt,//订单总价
      promotional_price:obj.data.promotional_price,//促销优惠金额
      total_amt:obj.data.total_amt,//商品总价
      BackstageGiveGoodsList:obj.data.giftsList,//后台的赠送的商品集合
      total_point:obj.data.total_point,//赠送总积分
      paymentTotal:obj.data.order_amt,//订单总价
      promotional:obj.data.promotional,//促销集合
      lq_price:obj.data.lq_price,
      control:{type1:obj.data.control[0].is_use,type2:obj.data.control[1].is_use},//促销和礼券是否可多选
      vipinfo:{
		   	id:obj.data.vipinfo.id,
		   	point:obj.data.vipinfo.point,
		   	save_amt:obj.data.vipinfo.save_amt,
		   	vip_name:obj.data.vipinfo.vip_name,
		   	vip_tel:obj.data.vipinfo.vip_tel
		   },
		   lq:obj.data.lq,
		   total_qty:_total_qty
   	 });
  },
  closeMode2:function(e){
  	 this.setData({modeFlag:"none"});
  	
  },
  goods_zhan:function(){
  	this.setData({
    		 zhankai:this.data.zhankai=='zhankai'?'zhankai0':'zhankai',
    		 goodsHeight:this.data.goodsHeight=='height115'?'height0':'height115',
    		 fudD:this.data.fudD=='收起'?'展开':'收起',
  	})
  },//计算支付类型总价
  paymentObjTotalFc:function(){
  	 var _paymentList = this.data.paymentObj;
  	 var _total = 0;
  	 for(var i=0;paymentList.length>i;i++){
  	 	  if(paymentList[i].checkedState){
  	 	  	_total = +paymentList[i].total;
  	 	  }
  	 }
  	 paymentObjTotal = _total;
  	 //支付类型总价
  },
  bindManual1:function(e){
  	var _paymentList = this.data.paymentObj;
  	 for(var i=0;_paymentList.length>i;i++){
  	 	  if(_paymentList[i].paymentId==e.currentTarget.dataset.paymentid){
  	 	  	_paymentList[i].total = e.detail.value;
  	 	  }
  	 }
  	  this.setData({
  	  	paymentObj:_paymentList
  	  });
  	  
  },//支付方式的选中状态
  paymentchecked:function(e){
  	 var _paymentList = this.data.paymentObj;
  	 for(var i=0;_paymentList.length>i;i++){
  	 	  if(_paymentList[i].paymentId==e.currentTarget.dataset.paymentid){
  	 	  	_paymentList[i].checkedState = _paymentList[i].checkedState=="true" ? "false":"true";
  	 	  	//余额的选中状态
  	 	  	if(_paymentList[i].checkedState&&e.currentTarget.dataset.paymentid=='10'){
  	 	  	 if(_paymentList[i].total<=this.data.vipinfo.save_amt){
  	 	  	 }else{
  	 	  	 	_paymentList[i].checkedState = false;
  	 	  	 	  wx.showToast({
			            title: '余额不够',
			            icon: 'error',
			            duration: 2000,
			            mask:true
			       });
  	 	  	 }
  	 	    }
  	 	  }
  	 }
  	  this.setData({
  	  	paymentObj:_paymentList
  	  });
  },//促销活动选中事件
  promotionalclick:function(e){
  	var _promotionalList = this.data.promotional;
  	var _givepromotional={};var _givegoods={};var _promotional_price;
  	var _guopromotionalList = [];//合法促销活动集合
  	this.setData({
  		givegoods:{
   	  item_name:'',//赠送商品名字
    	barcode:'',//商品条码
   	  give_itemCount:''//商品数量
      },//赠送商品对象
      givepromotional:{
     	StampType_name:'',//礼劵名字
   	  give_couponCount:'',//礼券数量
     },//赠送
   // promotional_price:0
  	});
  	//当前促销的类型
  	var  _promotionalflag= e.currentTarget.dataset.item.flag
  	for(var i = 0,l=0;i<_promotionalList.length;i++){
  		  if(this.data.control.type1=='1'){
  		  	//1不同类型可以多选
  		  	 if(_promotionalflag==_promotionalList[i].flag){
  		  	 	 if(e.currentTarget.dataset.item.sheet_no==_promotionalList[i].sheet_no){
  		  	 	 	   //当前要选中状态；
  		  	 	 	   if(_promotionalList[i].active=='true'){
  		  	 	 	   	  _promotionalList[i].active = 'false';
  		  	 	 	   }else{
  		  	 	 	   	   _promotionalList[i].active = 'true';
  		  	 	 	   //活动添加
  		  	 	 	   if(_promotionalList[i].StampType_name&&(_promotionalList[i].StampType_name!=""&&_promotionalList[i].give_couponCount!="")){
			  			 	 	  //_givepromotional={StampType_name:_promotionalList[i].StampType_name,give_couponCount:_promotionalList[i].give_couponCount};
			  			 	   	this.setData({
			  			 	   		givepromotional:{StampType_name:_promotionalList[i].StampType_name,give_couponCount:_promotionalList[i].give_couponCount}
							    	});
			  			 	 }
			  			 	 if(_promotionalList[i].item_name&&(_promotionalList[i].item_name!=""&&_promotionalList[i].give_itemCount!="")){
			  			 	 	 // _givegoods={item_name:_promotionalList[i].item_name,barcode:_promotionalList[i].barcode,give_itemCount:_promotionalList[i].give_itemCount};
			  			 	    	this.setData({
								  		givegoods:{item_sale_price:_promotionalList[i].item_sale_price,item_name:_promotionalList[i].item_name,barcode:_promotionalList[i].barcode,give_itemCount:_promotionalList[i].give_itemCount},
								    	});
			  			 	 }
			  			 	 //优惠价格计算
			  			 	 if(_promotionalList[i].send_money&&(_promotionalList[i].send_money!="")){
			  			 	 	  //_promotional_price = _promotionalList[i].send_money;
			  			     	/*this.setData({
							  		promotional_price:_promotionalList[i].send_money+this.data.promotional_price
							    	});*/
							    	 
			  			 	 }
  		  	 	 	   }
  		  	 	 }else{
  		  	 	 	   //除当前要非选中状态；
  		  	 	 	   _promotionalList[i].active = 'false';
  		  	 	 	   
  		  	 	 	   
  		  	 	 }
  		  	 }else{
  		  	 	   
  		  	 }
  		  }else{
  		  	//2不同类型不可以多选
  		    //判断选中id
		  		if(e.currentTarget.dataset.item.sheet_no==this.data.promotional[i].sheet_no){
		  			 if(_promotionalList[i].active =='false'){
		  			 	_promotionalList[i].active = 'true';
		  			 	//选中状态
		  			 	 
		  			 	 if(_promotionalList[i].StampType_name&&(_promotionalList[i].StampType_name!=""&&_promotionalList[i].give_couponCount!="")){
		  			 	 	  //_givepromotional={StampType_name:_promotionalList[i].StampType_name,give_couponCount:_promotionalList[i].give_couponCount};
		  			 	   
		  			 	    //单个促销活动的选择数组
		  			 	   var _array = [];
		  			 	   	 _array[0] = {StampType_name:_promotionalList[i].StampType_name,give_couponCount:_promotionalList[i].give_couponCount,give_couponType:_promotionalList[i].give_couponType};
		  			 	   this.setData({
		  			 	   		givepromotionalList:_array
						    	});
		  			 	 }
		  			 	 if(_promotionalList[i].item_name&&(_promotionalList[i].item_name!=""&&_promotionalList[i].give_itemCount!="")){
		  			 	 	 // _givegoods={item_name:_promotionalList[i].item_name,barcode:_promotionalList[i].barcode,give_itemCount:_promotionalList[i].give_itemCount};
		  			 	    	this.setData({
							  		givegoods:{item_sale_price:_promotionalList[i].item_sale_price,item_name:_promotionalList[i].item_name,barcode:_promotionalList[i].barcode,give_itemCount:_promotionalList[i].give_itemCount},
							    	});
		  			 	 }
		  			 	 if(_promotionalList[i].send_money&&(_promotionalList[i].send_money!="")){
		  			 	 	  //_promotional_price = _promotionalList[i].send_money;
		  			     	this.setData({
						  		promotional_price:_promotionalList[i].send_money
						    	});
						    	
		  			 	 }
		  			 }else{
		  			 		_promotionalList[i].active ='false';
		  			 		
		  			 }
		  		}else{
		  			_promotionalList[i].active = 'false';
		  		}
  		  }
  	  //合法的促销活动集合
  	  if(_promotionalList[i].active=='true'&&(_promotionalList[i].StampType_name!=null&&_promotionalList[i].StampType_name!="")){
  	  	 _guopromotionalList[l++] = {StampType_name:_promotionalList[i].StampType_name,give_couponCount:_promotionalList[i].give_couponCount,give_couponType:_promotionalList[i].give_couponType};
  	  }
  	}
  	//计算选中的促销活动金额
  	var  _promotional_price = 0;
  	var  _giveGoodsList =[];//合法的商品集合
  	var  _depositRatelist = [];//pj全部
  	var  _depositRateActive =[];//pj选中
  	var  _Commoditybinding = [];//商品绑定促销参数
  	for(var i =0,j=0,r=0,p=0,k=0;i<_promotionalList.length;i++){
  		if(_promotionalList[i].active=="true"){
  			_Commoditybinding[k++] = _promotionalList[i];//商品绑定促销参数数组赋值
  			 _promotional_price = _promotional_price + _promotionalList[i].send_money;
  			 if(_promotionalList[i].item_name&&_promotionalList[i].item_name!=""){
  			 	_giveGoodsList[j++] = _promotionalList[i];
  			 }
  		}/*else{
  			conosle.log("false");
  		}*/
  		//pj类型判断&&_promotionalList[i].active=="true"
  		if(_promotionalList[i].flag=="PJ"){
  			  _depositRatelist[r++] = _promotionalList[i];
  		};
  		if(_promotionalList[i].flag=="PJ"&&_promotionalList[i].active=="true"){
  			  _depositRateActive[p++] = _promotionalList[i];
  		}
  	}
  		this.setData({
  		promotional:_promotionalList,
  		promotional_price:_promotional_price
    	});
    	
    	this.giveShowFuc(_giveGoodsList);//赠送商品计算
    	this.favourableFcu(_guopromotionalList);//优惠劵计算
    	this.depositRateNew(_depositRatelist,_depositRateActive);//新的折扣率计算方法
    	this.Commoditybinding(_Commoditybinding);//商品绑定促销参数
    	this.compute();//计算商品订单总价
    	
  },
  depositRateNew:function(depositRatelist,depositRateActive){//新的折扣率计算方式
  	this.setData({
  			 	 	orderTotlaz:0
  			 	 });
  	var _dataGoodsList = this.data.goodsList;//商品集合
  	if(depositRateActive.length>0){
  		   var depositRate = this.depositRate(depositRateActive);//折扣基数数组
  	//折扣基数最大值
  	var maxdepositRate;
  	for(var i=depositRate.length-1;i>-1;i--){
  		if(depositRate[i].step_num!="0"){
  			 maxdepositRate = depositRate[i];
  			 break;
  		}
  	}
  	if(depositRateActive.length>0){//是否有选中(是)默认数组长度为1 [0]
  		if(depositRateActive[0].item_type=="全部"){
  			 if(depositRateActive[0].is_priceWay=="Y"){
  			 	 this.setData({
  			 	 	orderTotlaz:maxdepositRate.step_rate
  			 	 });
  			 }else{
  			 	 this.setData({
  			 	 	orderTotlaz:parseFloat(this.data.total_amt - maxdepositRate.step_rate*this.data.total_amt).toFixed(2)
  			 	 })
  			 }
  		}else{
  			var  Brank=0;//品牌数量
  			var  Class=0;//类别数量
  			var  zPrice =0;//当前商品单价
  			for(var i=0;i<_dataGoodsList.length;i++){
  				if(depositRateActive[0].item_type =="单品"&&_dataGoodsList[i].num==depositRateActive[0].bar_code){
  					 //判断减去金额 还是折扣
  					 if(depositRateActive[0].is_priceWay=="Y"){
  					 	//减金额
  					 	this.setData({
		  			 	 	orderTotlaz:maxdepositRate.step_rate
		  			 	 });
  					 }else{
  					 	this.setData({
		  			 	 	orderTotlaz:parseFloat(_dataGoodsList[i].total_amt_small -(maxdepositRate.step_rate*_dataGoodsList[i].total_amt_small)).toFixed(2)
		  			 	 });
  					 }
  				}else if(depositRateActive[0].item_type =="品牌"&&_dataGoodsList[i].item_brand==depositRateActive[0].use_brand){
  					 	Brank+=_dataGoodsList[i].commodityTotal;
  					  zPrice = _dataGoodsList[i].total_amt_small;
  				}else if(depositRateActive[0].item_type =="类别"&&_dataGoodsList[i].item_class==depositRateActive[0].use_class){
  					 Class+=_dataGoodsList[i].commodityTotal;
  					 zPrice = _dataGoodsList[i].total_amt_small;
  				}
		    	
		    }
  		  if(Brank>maxdepositRate.step_rate){
  		  	if(depositRateActive[0].is_priceWay=="Y"){
  					 	//减金额
  					 	this.setData({
		  			 	 	orderTotlaz:maxdepositRate.step_rate
		  			 	 });
  					 }else{
  					 	this.setData({
		  			 	 	orderTotlaz:parseFloat(_dataGoodsList[i].total_amt_small -(maxdepositRate.step_rate*_dataGoodsList[i].total_amt_small)).toFixed(2)
		  			 	 });
  					 }
  		  }
  		  if(Class>maxdepositRate.step_rate){
  		  	 if(depositRateActive[0].is_priceWay=="Y"){
  					 		this.setData({
		  			 	 	orderTotlaz:maxdepositRate.step_rate
		  			 	 });
  					 	//减金额
  					 	
  					 }else{
  					 	this.setData({
		  			 	 	orderTotlaz:parseFloat(zPrice -(maxdepositRate.step_rate*zPrice)).toFixed(2)
		  			 	 });
  					 	
  					 }
  		  }
  		}
  	}
  	}else{
  		 
  	}
  },
  compute:function(){
  	var _order_amt,_promotional_price,_total_amt,_orderTotlaz;
  	 //_order_amt = this.data.order_amt;//订单总价
  	 _promotional_price = this.data.promotional_price;//促销优惠金额
  	 _total_amt = this.data.total_amt;//商品总价
  	 _orderTotlaz= this.data.orderTotlaz;//折扣计算总价
  	 var _lq_price = this.data.lq_price;//礼券总价
     _order_amt =  parseFloat(_total_amt - _promotional_price).toFixed(2);
     _order_amt = parseFloat(_order_amt - _lq_price).toFixed(2);
      _order_amt = parseFloat(_order_amt - _orderTotlaz).toFixed(2);
     var _paymetsL = this.data.paymentObj;
     var _total=0;
     for(var i =0;i<_paymetsL.length;i++){
     	  if(_paymetsL[i].checkedState=="true"){
     	  	if(_paymetsL[i].total!=""){
     	  		_total= (parseFloat(_total) + parseFloat(_paymetsL[i].total)).toFixed(2);
     	  	}
     	  }
     }
     this.setData({
      	order_amt:_order_amt,//商品订单总价
      	paymentTotal:_order_amt//实际支付总价
      });
     if(_total==_order_amt){
     	  return {flag:true,content:'正确'};
     }else if(parseFloat(_total)>parseFloat(_order_amt)){
     	  return {flag:false,content:'超了('+(parseFloat(_total-_order_amt)).toFixed(2)+'元)'};
     }else if(parseFloat(_total)<parseFloat(_order_amt)){
     	  return {flag:false,content:'缺了('+(parseFloat(_total-_order_amt)).toFixed(2)+'元)'};
     }
     
      
  },
  promotionalclicktwo:function(e){//礼券选择
  	var _lq = this.data.lq;
  	var _lq_price =0;
  	if(this.data.control.type2=='0'){
  		for(var i =0;i<_lq.length;i++){
  		if(_lq[i].lq_id==e.currentTarget.dataset.lq.lq_id){
  			 if(_lq[i].active=='false'){
  			 	 _lq[i].active = 'true';
  			 	 	_lq_price= _lq[i].stamp_amt
  			 }else{
  			 	 _lq[i].active = 'false';
  			 }
  		}else{
  			 _lq[i].active = 'false';
  		}
  	}
  	this.setData({lq:_lq,lq_price:_lq_price});
  	}else{
  		for(var i =0;i<_lq.length;i++){
  		if(_lq[i].lq_id==e.currentTarget.dataset.lq.lq_id){
  			 if(_lq[i].active=='false'){
  			 	 _lq[i].active = 'true';
  			 }else{
  			 	 _lq[i].active = 'false';
  			 }
  		}
  	}
  		for(var i =0;i<_lq.length;i++){
  		if(_lq[i].active=='true'){
  			 	 _lq_price = _lq_price+_lq[i].stamp_amt;
  			 }
  		}
  		this.setData({lq:_lq,lq_price:_lq_price});
  	}
  	
  	
  	this.compute();//计算商品订单总价
  },
  paymentfc:function(){
  	var _this = this;
  	//设置打印状态
  	 var printFlg = 0; 
  	 var orderObj={
  		vipinfo:{},//用户信息
  		goodslist:[],//商品集合
  		paymentlist:[],//支付方式
  		promotional:[],//促销活动集合
  		lq:[],
  		total_point:'',//礼券集合
  	  empObj:{},
  	  orderdetails:{},//订单总计 优惠明细
  	  giveGoods:[],//赠送商品集合
  	  givepromotionalList:[]//赠送礼券集合
  	};
  	 
				if(_this.compute().flag){
					wx.showActionSheet({
							itemList: ['打印订单', '不打印订单'],
							success: function(res) {
								printFlg = res.tapIndex;
								orderObj.vipinfo = _this.data.vipinfo;
  		 orderObj.goodslist = _this.data.goodsList;
  		 //支付方式
  		
  		 for(var i =0,j=0;i<_this.data.paymentObj.length;i++){
  		 	if(_this.data.paymentObj[i].checkedState){
  		 		orderObj.paymentlist[j++]=_this.data.paymentObj[i];
  		 	}
  		 }
  		 //礼券
  		 if(_this.data.lq!=null){
  		 	  for(var i =0,j=0;i<_this.data.lq.length;i++){
  		 	if(_this.data.lq[i].active=='true'){
  		 		orderObj.lq[j++]=_this.data.lq[i];
  		 	}
  		 }
  		 }
  		  
  		  //促销劵
  		  if(_this.data.promotional!=null){
  		  for(var i =0,j=0;i<_this.data.promotional.length;i++){
	  		 	if(_this.data.promotional[i].active=='true'){
	  		 		orderObj.promotional[j++]=_this.data.promotional[i];
	  		 	}
	  		 }
  		  }
  		  orderObj.total_point =_this.data.total_point;
  		  orderObj.empObj = app.globalData.empno;
  		  orderObj.giveGoods = _this.data.givegoodsList;
  		  orderObj.orderdetails ={
  		  	 order_amt:_this.data.order_amt="",//订单总价
           promotional_price:_this.data.promotional_price+"",//促销优惠金额
           total_amt:_this.data.total_amt+"",//商品总价
           total_point:_this.data.total_point+"",//赠送总积分
           paymentTotal:_this.data.paymentTotal+"",//实际付款的金额
           orderTotlaz:_this.data.orderTotlaz+"",//订单折扣率
           lq_price:_this.data.lq_price+"",//礼券优惠金额
           total_qty:_this.data.total_qty+"",//商品总数
           print:printFlg//打印标记
  		  };
  		  orderObj.givepromotionalList =_this.data.givepromotionalList//赠送礼券
  		 _this.req(orderObj);
							},
			fail: function(res) {
			}
		});
					
  		 
  	}else{
  		wx.showModal({
						title: '金额错误提示',
						content: _this.compute().content,
						success: function(res) {
							if (res.confirm) {
							console.log('用户点击确定');
							} else if (res.cancel) {
							console.log('用户点击取消');
							}
						}
					});
  	}
				
			
  	
  	
  },
  req:function(orderObj){
  	wx.showLoading({
				  title: '订单生成中...',
			});
			 wx.request({
            url:_url.local()+"/xcx/platform/index/insertOrder.shtml",
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            data:{orderObj:JSON.stringify(orderObj)},
            success:function(e){
            	if(e.data.code=="-1"){wx.showToast({title: '网络延时',icon: 'error',duration: 2000,mask:true});}else{
                    wx.showModal({
									title: '订单预览',
									content: '订单号:'+e.data.data.code+',订单总价:￥'+e.data.data.total_amount+'元,收款金额：￥'+e.data.data.actual_amt+'元，收款人:'+e.data.data.create_by,
									success: function(res) {
										if (res.confirm) {
										     wx.request({
								            url:_url.local()+"/xcx/platform/index/previewOrder.shtml",
								            data:{order_code:e.data.data.code},
								            success:function(e){
								            	     if(e.code!=-1){
								            	     	 wx.setStorageSync('shoppingCart',[]);//goods设置空
								            	     	 app.globalData.vipno ="";//vipno设置空
								            	     	 wx.redirectTo({
																		  url:"../orderD/index?dataObj="+JSON.stringify(e.data)
																		});
								            	     }else{
								            	     	  wx.showToast({
															            title: e.msg,
															            icon: 'error',
															            duration: 2000,
															            mask:true
															       });
								            	     }
								            	     
								            }
								         });
										
										} else if (res.cancel) {
										  wx.setStorageSync('shoppingCart',[]);//goods设置空
								      app.globalData.vipno ="";//vipno设置空
										  wx.redirectTo({
																		  url:"../sales/index"
																		});
										}
									}
								});
				        wx.hideLoading();
                }   
            }
         });
  },inputbind:function(e){
  	 this.setData({
  	 	 balance_footer:'0'
  	 });
  	//余额联合查询值针对余额支付
  	if(e.detail.value!=""&&e.currentTarget.dataset.paymentid=="10"){
       if(e.detail.value<=this.data.vipinfo.save_amt){
       	  
       }else{
       	  wx.showToast({
			            title: '余额不够',
			            icon: 'error',
			            duration: 2000,
			            mask:true
			       });
			       var _paymentObj = this.data.paymentObj;
			       for(var i=0;_paymentObj.length>i;i++){
			       	  if(e.currentTarget.dataset.paymentid==_paymentObj[i].paymentId){
			       	  	_paymentObj[i].checkedState =  false;
			       	  	_paymentObj[i].total =e.detail.value;
			       	  }
			       }
			       this.setData({
			       	 paymentObj:_paymentObj
			       });
       }
  	}
  },inputfocus:function(){
    	this.setData({
  	 	 balance_footer:'1'
  	 });
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
    if(this.data.vipinfo.vip_name!="(散客)"){
    	 this.setData({
  		 modec:"addmode",
  		 goodsid:e.currentTarget.dataset.goodsid
  	   });
    }else{
    	wx.showToast({
			            title: '散客无法操作',
			            icon: 'error',
			            duration: 2000,
			            mask:true
			       });
    }
  	
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
    e.detail.value.commodityPickUp
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
			      });
    }  	 
  },Calculation:function(shoppData1){
  	var shoppData = wx.getStorageSync('shoppingCart');
  	  this.setData({
    	goodsList:shoppData,
    });
  },depositRate:function(depositRatelist){//折扣率计算
  	//var _goodsList = this.data.goodsList;//商品集合
  	//var _rightGoodsList = [];//符合折扣率的商品的集合合并对象
  	var depositRateObj = depositRatelist[0]//目前一个促销阶梯[0]
  	var _depositRate = [];//梯度参数
				  			//var str = step_num+(i+1);
				  		for(var r=0;r<6;r++){
				  			var stepObj;
				  			if(r==0){stepObj = {step_num:depositRateObj.step_num1,step_rate:depositRateObj.step_rate1};_depositRate[r] = stepObj;continue;};
				  			if(r==1){stepObj = {step_num:depositRateObj.step_num2,step_rate:depositRateObj.step_rate2};_depositRate[r] = stepObj;continue;};
				  			if(r==2){stepObj = {step_num:depositRateObj.step_num3,step_rate:depositRateObj.step_rate3};_depositRate[r] = stepObj;continue;};
				  			if(r==3){stepObj = {step_num:depositRateObj.step_num4,step_rate:depositRateObj.step_rate4};_depositRate[r] = stepObj;continue;};
				  			if(r==4){stepObj = {step_num:depositRateObj.step_num5,step_rate:depositRateObj.step_rate5};_depositRate[r] = stepObj;continue;};
				  			if(r==5){stepObj = {step_num:depositRateObj.step_num6,step_rate:depositRateObj.step_rate6};_depositRate[r] = stepObj;continue;};
				  		}
				  		return _depositRate;
				  		
  },giveShowFuc:function(giveGoodsList){//赠送商品计算
  	var giveList = [];
  	var _BackstageGiveGoodsList = this.data.BackstageGiveGoodsList;
  	for(var i=0,q=0;i<_BackstageGiveGoodsList.length;i++){
       for(var j=0;j<giveGoodsList.length;j++){
       	if(_BackstageGiveGoodsList[i].sheet_no==giveGoodsList[j].sheet_no){
       		 giveList[q++] = _BackstageGiveGoodsList[i];
       	}
       }
  	}
  	//console.log(giveList);赠送商品集合
  		 this.setData({
  		 	givegoodsList:giveList
  		 });
  },favourableFcu:function(guopromotionalList){
  	//console.log(guopromotionalList);
  	//礼券计算集合
  	this.setData({
  			 	   		givepromotionalList:[]//重置集合
				    	});
  	var _array = [];
  	for(var i =0;i<guopromotionalList.length;i++){
  		//数组为空时
  		 if(_array.length==0){
  		 	_array[0] = guopromotionalList[i];
  		 }else{
  		 	for(var l=0;l<_array.length;l++){
  		 		  if(_array[l].give_couponType==guopromotionalList[i].give_couponType){
  		 		  	 _array[l]= {StampType_name:guopromotionalList[i].StampType_name,give_couponCount:(_array[l].give_couponCount+guopromotionalList[i].give_couponCount),give_couponType:guopromotionalList[i].give_couponType};
  		 		  }else{
  		 		  	_array[++l]=guopromotionalList[i];
  		 		  }
  		 	}
  		 }
  	}
  	 this.setData({givepromotionalList:_array});
  },Commoditybinding:function(Commoditybindingdata){//商品绑定促销参数
  	var  _goodsList = this.data.goodsList;
  		for(var i=0;i<_goodsList.length;i++){
  		for(var j=0;j<Commoditybindingdata.length;j++){
  			if(Commoditybindingdata[j].item_type=="单品"&&Commoditybindingdata[j].use_barcode==_goodsList[i].num){ //单品
  				if(Commoditybindingdata[j].flag=="PJ"){
  					  _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'N',my_flag:'N',jt_flag:'Y'});
  				 }else if(Commoditybindingdata[j].flag=="PY"){
  				 	 _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'N',my_flag:'Y',jt_flag:'N'});
  				 }else{
  				 	 _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'Y',my_flag:'N',jt_flag:'N'});
  				 }
  				 break;
  			}else if(Commoditybindingdata[j].item_type=="品牌"&&Commoditybindingdata[j].use_brand==_goodsList[i].item_brand){ //品牌
  				if(Commoditybindingdata[j].flag=="PJ"){
  					  _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'N',my_flag:'N',jt_flag:'Y'});
  				 }else if(Commoditybindingdata[j].flag=="PY"){
  				 	 _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'N',my_flag:'Y',jt_flag:'N'});
  				 }else{
  				 	 _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'Y',my_flag:'N',jt_flag:'N'});
  				 }
  				 break;
  			}else if(Commoditybindingdata[j].item_type=="类别"&&Commoditybindingdata[j].use_class==_goodsList[i].item_class){ //类别
  				 if(Commoditybindingdata[j].flag=="PJ"){
  					  _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'N',my_flag:'N',jt_flag:'Y'});
  				 }else if(Commoditybindingdata[j].flag=="PY"){
  				 	 _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'N',my_flag:'Y',jt_flag:'N'});
  				 }else{
  				 	 _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'Y',my_flag:'N',jt_flag:'N'});
  				 }
  				 break;
  			}else if(Commoditybindingdata[j].item_type=="全部"){
  				if(Commoditybindingdata[j].flag=="PJ"){
  					  _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'N',my_flag:'N',jt_flag:'Y'});
  				 }else if(Commoditybindingdata[j].flag=="PY"){
  				 	 _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'N',my_flag:'Y',jt_flag:'N'});
  				 }else{
  				 	 _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'Y',my_flag:'N',jt_flag:'N'});
  				 }
  				 break;
  			}else{
  				 	 _goodsList[i] = Object.assign(_goodsList[i],{mb_flag:'N',my_flag:'N',jt_flag:'N'});
  			}
  		}
  	}
  	//console.log(_goodsList);
  	this.setData({
  		goodsList:_goodsList//选择促销劵更新商品中的 pj pb py
  	});
  }
})
