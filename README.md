# 一个原生js+ajax写的轮播图图

##效果展示
![](demo.png)

##封装原生ajax
```js
function ajax(url,fuSucss,fnFailer){
	var xhr;
	//1.创建一个ajax对象
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
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

```
##原生封装move函数
```js
function move(obj,json,fun,time,step){
		//取消定时器
		if(obj.timer){
			clearInterval(obj.timer);
		}
		//给形参赋默认值
		if(!time){ 
		  time=10
		}
		if(!step){
			step =10;
		}
		//console.log(step);
		obj.timer=setInterval(function(){
			var bStop = true;
			//获取属性当前的值
			//大小，宽高，位移
			for(var attr in json){
				 var target= json[attr];
				 
				 var iCur= getStyle(obj,attr);
				//去掉样式的单位
				iCur = parseInt(getStyle(obj,attr));
				//添加一个变量，用来记录当前值和目标值之间的差
				var speed=  (target-iCur)/step;
				speed= speed>0?Math.ceil(speed):Math.floor(speed);
				//console.log(iCur+ " "+speed);
				//修改当前值
				if(iCur!=target){
					bStop = false;
				}
				if(attr=="opacity"){
					obj.style[attr]= (iCur+ speed)/100;
					obj.style.filter= "alpha(opacity:"+(iCur+ speed)+")";
					//console.log(iCur+ step);
					//console.log(attr+" "+(iCur+ step)+" "+obj.style[attr]);
				}else{
					obj.style[attr]= iCur+ speed +"px";
				}
				
				
				
			}  // end of for in loop
			if(bStop){
				clearInterval(obj.timer);
				if(fun){
					fun();
				}  //end if(fun)
			}//end of else (iCur!=target)
			
		},time);
}
```

##具体请看源文件