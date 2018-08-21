var app = getApp();
var loginActive = require('../../utils/loginActive.js');
Page( {
  data: {
    cartImg: '',
    tipWords: '',
    page_flag:'danger'
  },
    onShow: function (e){
     var open_id = wx.getStorageSync('storageOpen_id');
     if(open_id!=null&&open_id!=""){
     	loginActive.loginRenovate(wx,open_id,this.data.page_flag);
     }
    }
})
