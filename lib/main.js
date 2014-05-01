var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;

var ss = require("sdk/simple-storage");
if(ss.storage.ueid == null){
	ss.storage.ueid = new Date().getTime();
	// console.log("==setup ueid==",ss.storage.ueid );
}

var handler =  function(worker) {
	// console.log("===register start===");
	worker.port.on("sendMessage",function(param){
		// console.log("get message ",param);
		param.data = param.data || {};
		param.data.ueid = ss.storage.ueid;
		param.data.clientType = "ff";

		// console.log("send",param.data);
		var Request = require("sdk/request").Request;
	    Request({
	      url: param.url,
	      content: param.data,
	      onComplete: function (response) {
	      	// console.log("post finished:")
	        console.log("post result:"+response.text,param.requestID);
	        worker.port.emit("gotMessage",{requestID:param.requestID,params:response.text});
	      }
	    }).post();
	    // console.log("posted ");

	});
	// console.log("===register end");
};

pageMod.PageMod({
  include: "https://www.facebook.com/plugins/comments.php*",
  contentScriptFile: data.url("antispite-fb.js"),
  onAttach:handler
});

pageMod.PageMod({
  include: "https://tw.news.yahoo.com/*",
  contentScriptFile: data.url("antispite-yahoo.js"),
  onAttach:handler
});

