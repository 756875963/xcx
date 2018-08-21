var app = getApp();
var loginActive = require('../../utils/loginActive.js');
var _url = require('../../utils/url.js');
Page( {
  data: {
    cartImg: '',
    tipWords: '',
    page_flag:'under'
  },
   onShow: function (e){
     var open_id = wx.getStorageSync('storageOpen_id');
     if(open_id!=null&&open_id!=""){
     	 loginActive.loginRenovate(wx,open_id,this.data.page_flag);
     }
    }
})
