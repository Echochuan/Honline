var fav=document.getElementsByName("fav");/*多选框取名为fav,获取所有的多选框对象*/
var nu=document.getElementsByName("nu");/*数量框取名为nu,获取所有的数量框对象*/
console.log(fav,nu);/*控制台查看对象*/

/*全选→单选*/
function checkTest1(th){
	var flag=th.checked;
	/*多选框是否被选中，true/false*/
	for(var i in fav){
		fav[i].checked=flag;}//i表示下标
}

/*单选→全选*/
function checkTest2(){
	var flag=true;
	for(var i=1;i<fav.length-1;i++){
		if(!fav[i].checked){
			flag=false;
			break;
		}/*只要出现一个商品的多选框未选中，则全选框为false，即不选，跳出循环*/
	}/*否则，即每个商品的多选框都被选中，全选框为true*/
	fav[0].checked=flag;
	fav[fav.length-1].checked=flag;

	/*统计所有商品的价格和数量*/
	tot=0;
	num=0;
	spnum=0;
	for(var i=1;i<fav.length-1;i++){
		if(fav[i].checked){
			num++;
			var par=fav[i].parentNode.parentNode;/*获得父节点(li)的父节点(ul)*/
			var li=par.getElementsByTagName("li");/*获得ul下的所有li标签*/
			var singleTotalPrice=li[6].innerHTML.split("¥")[1];/*获得单个商品的总价格,Array [ "", "37.60" ]*/
			/*console.log(singleTotalPrice);*/
			tot+=Number(singleTotalPrice);/*字符型转为数值型*/
			document.getElementById("tp").innerHTML="¥"+tot.toFixed(2);
			var conmodityInputs=li[5].getElementsByTagName("input");/*获得商品数量的标签*/
			var commodityNum=conmodityInputs[0].value;/*获得商品的数量*/
			spnum+=Number(commodityNum);
			document.getElementById("tn").innerHTML=spnum;
		}
	}
	if(num==0){
		document.getElementById("tp").innerHTML="¥"+"0.00";/*字符串的拼接，0.00不能少引号*/
		document.getElementById("tn").innerHTML=0;
	}
}

/*商品数量增减，数量和价格变动*/
function checkTest3(th,sig){
	var obj;
	if(sig=="1")/*减号*/
	{	
		obj=th.nextElementSibling;/*获得下一个节点对象*/
		if(obj.value>0){obj.value=Number(obj.value)-1;}/*获得节点的value值，注意string类型转换为Number类型*/
	}else/*加号*/
	{
		obj=th.previousElementSibling;/*获得上一个节点对象*/
		obj.value=Number(obj.value)+1;
	}
	var price=obj.parentNode.previousElementSibling.innerHTML;
	/*获得父节点(li)的上一个兄弟元素(li)的文本，即单价，注意只能是数字，不能有符号"¥"*/
	console.log(price);
	var total=(price*obj.value).toFixed(2);/*.tofixed(2)保留2位小数*/
	obj.parentNode.nextElementSibling.innerHTML="¥"+total;
}

/*删除节点*/
function checkTest4(th){
	var div=th.parentNode.parentNode.parentNode;/*a→li→ul→div*/
	div.remove();
}

/*直接在"数量"输入框中输入值，数量和价格变动*/
function checkTest5(th){
	var price=th.parentNode.previousElementSibling.innerHTML;
	var total=(price*Number(th.value)).toFixed(2);
	th.parentNode.nextElementSibling.innerHTML="¥"+total;
}

/*删除选中的商品。遍历多选框，若勾选则删除对应的div*/
function checkTest6(){
	console.log(fav);
 	for(var i=1;i<fav.length-1;i++){
 		if(fav[i].checked){checkTest4(fav[i])}
		}/*删除之后需再次遍历fav！*/
 	for(var i=1;i<fav.length-1;i++){
 		if(fav[i].checked){checkTest4(fav[i])}
		}
 }
/*当你删除选中的商品时，循环第一次删除一个商品，剩余被选中的商品的整个顺序就变了，
 * 剩下的就遍历不全了，每删除一个商品，都要重新获取一次剩余商品的顺序，重新删*/
 
 /*刷新页面时，清空选项和数量值*/
function checkTest7(){
 	for(var i=0;i<fav.length;i++){
		fav[i].checked=false;}
 	for(var i=0;i<nu.length;i++){
 		nu[i].value=0;
 	}
 }

/*鼠标置上，显示提示*/
function tips(){
	alert("不含运费及送装服务")
}


