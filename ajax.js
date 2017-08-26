function ajax(url,fuSucss,fnFailer){
	var xhr;
	//1.创建一个ajax对象
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// console.log(url);json.json?page=1---json1.json
	//
	/*  if(url.indexOf("?")>-1){
		var fileName = url.substring(0,url.indexOf("."));
		var num      = url.substring(url.indexOf("=")+1);
		var houzhui  = url.substring(url.indexOf("."),url.indexOf("?"));
		url = fileName+num+houzhui;
		// console.log(url);
	}  */
	
	//2.连接服务器
	//open(方法，文件名，异步传输)；
	xhr.open("get",url,true);
	//3.发送请求
	xhr.send();
	//4.处理请求（接收返回）
	xhr.onreadystatechange = function(){
		//判断状态
		if(xhr.readyState==4 && xhr.status==200){
			// alert(xhr.responseText);
			fuSucss(xhr.responseText);
		}else{
			// console.log(xhr.readyState +""+ xhr.status);
			if(fnFailer){
				fnFailer(xhr.status);
			}
		}
	}
}
/* ajax("ajax.txt",function(str){
	alert(str);
});	 */