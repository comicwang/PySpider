var userUrl = 'http://121.8.170.150:8181/GDSSO/WebServices/PassportService.asmx?op=';
var userInfoUrl = 'http://192.168.200.100:8055/GDSSO/admin/data/UserData.ashx?action=GetDetail&';
var baseUrl = 'http://192.168.200.100:8055/GeoWeb/AjaxHandler.ashx?';
var mediaUrl = 'http://192.168.200.100:8055/multimediawebsite/AjaxHandler.ashx?';
var xqUrl = 'http://192.168.200.100:8055/YaanYJZSWeb/AjaxHandler.ashx?';
var addImgInfo='http://192.168.200.100:8055/multimediawebsite/AjaxHandler.ashx?class=FileImageInfoAjax&method=addFileImage';
var uploadImg='http://192.168.200.100:8055/multimediawebsite/page/upload.aspx'
function userData(url, arg) {
	var data = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body>' + arg + '</soap:Body>' + '</soap:Envelope>';
	$.ajax({
		type : "POST",
		url : userUrl + url,
		dataType : "xml",
		contentType : "text/xml; charset=utf-8",
		data : data,
		complete : function(xmlHttpRequest, status) {
		console.log(arg)
			//console.log($api.jsonToStr(xmlHttpRequest))
			if (status == 'success' && xmlHttpRequest.status == 200 && xmlHttpRequest.statusText == 'OK') {
				var trans = api.require('trans');
				trans.parse({
					data : xmlHttpRequest.responseText
				}, function(ret, err) {
				console.log($api.jsonToStr(ret))
					if (ret) {
						var result = ret["soap:Envelope"]["soap:Body"]["ValidateUserResponse"]["ValidateUserResult"];
						console.log(result);
						if (result == '-1') {
							alert('请输入正确的用户名及密码')
						} else {
							disponseUserData(result);
						}
					}
				})
			}
		}
	});
}

function getUserInfo(url) {
	//console.log(userInfoUrl + url)
	api.ajax({
		url : userInfoUrl + url,
		method : 'get'
	}, function(ret, err) {
		if (ret) {
			disponseData(ret);
		} else {
			alert('个人信息加载错误，请重试');
		}
	});
}

function upLoadImg(url){

}

function addImgInfo(imgName,Token,imgId) {

	$.ajax({
		url : addImgInfo+'&Token='+Token,
		data:{
		   fileTempName:imgId,
		   storageMethod:'数据库',
		   description:'pad',
		   fullname:imgName,
		   creator:'pad'
		},
		success : function(msg) {
			alert('msg='+msg)
			//disponseData(msg);
		},
		error:function(err){
		  alert('err='+$api.jsonToStr(err))
		}
	});
}
function getDataResult(url,urlCount, times)
{
	api.ajax({
		url : baseUrl + url,
		method : 'get'
	}, function(ret, err) {

	//alert(JSON.stringify(ret));
		if (ret) {
			api.ajax({
				url:baseUrl+urlCount,
				method:'get',
				dataType:'text'
			},function (retC, errC){

				var result = {
					list:ret,
					total:retC
				};

				disponseData(result, times);
			});
			//disponseData(ret, times);
		} else {
		//alert($api.jsonToStr(err))
		console.log(baseUrl + url)
//			alert('数据加载错误，请重试');
		}
	});
}
function getData(url, times) {
	//alert(JSON.stringify(baseUrl + url));
	api.ajax({
		url : baseUrl + url,
		method : 'get'
	}, function(ret, err) {

	//alert(JSON.stringify(ret));
		if (ret) {
			disponseData(ret, times);
		} else {
		//alert($api.jsonToStr(err))
		console.log(baseUrl + url)
//			alert('数据加载错误，请重试');
		}
	});
}
//如果返回空，则api.ajax会报错
function jcGetData(url,times) {
/*
	$.ajax({
		type : "GET",
		url : baseUrl + url,
		success : function(msg) {
			//console.log($api.jsonToStr(msg))
			disponseData(msg, times);
		}
	});
	*/
}
function rlGetData(url,times) {
	$.ajax({
		type : "GET",
		url : xqUrl + url,
		success : function(msg) {
			//console.log($api.jsonToStr(msg))
			disponseData(msg, times);
		},
		error:function(err){
		    alert(err)
		}
	});
}

function getDisasterData(url, times) {
	api.ajax({
		url : baseUrl + url,
		method : 'get'
	}, function(ret, err) {
		if (ret) {
			disponseData(ret, times);
		} else {
			alert('数据加载错误，请重试');
		}
	});
}

function getDisasterCount(url, times) {
	api.ajax({
		url : baseUrl + url,
		method : 'get',
		dataType : 'text',
	}, function(ret, err) {
		if (ret) {
			disponseData(ret, times);
		} else {
			alert('数据加载错误，请重试');
		}
	});
}

function getxqData(url, times) {
/*
	api.ajax({
		url : xqUrl + url,
		method : 'get'
	}, function(ret, err) {
		if (ret) {
		ret = [
			{GUID:"49499dd7-aefb-4dbc-a496-eadf7d18636d",LOCATION:"怀集县桥头镇新平村委会金和经济合作社滑坡",UnifiedCode:"4412240001340001",DISASTERNAME:"肇庆市怀集县桥头镇新平村委会金和经济合作社滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"灾情",Longitude:112.00194444,Latitude:
23.72416667},
			{GUID:"33897a95-c280-48b4-874b-ab55cdc463d2",LOCATION:"广东省白云区太和镇兴丰村黄麻塘组",UnifiedCode:"4401110000080002",DISASTERNAME:"广州市白云区黄麻塘崩塌",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:
113.4825,Latitude:23.28611111},
			{GUID:"a2b01dbb-b028-4ea9-95ba-04e3baa030c4",LOCATION:"天河区龙洞街龙洞森林公园",UnifiedCode:"4401060000010002",DISASTERNAME:"广州市天河区龙洞街龙洞森林公园龙洞山庄大街13号西侧边坡",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:113.35472222,Latitude:
23.20444444},
{GUID:"b1f83aa2-99de-44e7-86bd-21e735d45273",LOCATION:"广州市越秀区登峰街",UnifiedCode:"4401040000030002",DISASTERNAME:"广州市越秀区登峰街象岗山西侧边坡",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:113.26861111,Latitude:
23.14555556},
			{GUID:"d323dbe9-d27b-4ed9-96cf-100ff047ed0c",LOCATION:"广州市白云区白山村白良路段良洞滑坡",UnifiedCode:"4401110000060001",DISASTERNAME:"广州市白云区白山村白良路段良洞滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"险情",Longitude:
113.41305556,Latitude:23.28111111},
			{GUID:"d71d8645-d62e-424f-a244-986f35acc314",LOCATION:"广东省中山市沙溪镇濠涌村瑞王家具厂",UnifiedCode:"4420000000550001",DISASTERNAME:"中山市瑞王家具厂滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"险情",Longitude:
113.30527778,Latitude:22.48222222}
		];
			disponseData(ret, times);
		} else {
			//alert('数据加载错误，请重试');
		}
	});
	*/
	var	ret = [
			{GUID:"49499dd7-aefb-4dbc-a496-eadf7d18636d",LOCATION:"怀集县桥头镇新平村委会金和经济合作社滑坡",UnifiedCode:"4412240001340001",DISASTERNAME:"肇庆市怀集县桥头镇新平村委会金和经济合作社滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"灾情",Longitude:112.00194444,Latitude:
23.72416667},
			{GUID:"33897a95-c280-48b4-874b-ab55cdc463d2",LOCATION:"广东省白云区太和镇兴丰村黄麻塘组",UnifiedCode:"4401110000080002",DISASTERNAME:"广州市白云区黄麻塘崩塌",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:
113.4825,Latitude:23.28611111},
			{GUID:"a2b01dbb-b028-4ea9-95ba-04e3baa030c4",LOCATION:"天河区龙洞街龙洞森林公园",UnifiedCode:"4401060000010002",DISASTERNAME:"广州市天河区龙洞街龙洞森林公园龙洞山庄大街13号西侧边坡",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:113.35472222,Latitude:
23.20444444},
{GUID:"b1f83aa2-99de-44e7-86bd-21e735d45273",LOCATION:"广州市越秀区登峰街",UnifiedCode:"4401040000030002",DISASTERNAME:"广州市越秀区登峰街象岗山西侧边坡",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:113.26861111,Latitude:
23.14555556},
			{GUID:"d323dbe9-d27b-4ed9-96cf-100ff047ed0c",LOCATION:"广州市白云区白山村白良路段良洞滑坡",UnifiedCode:"4401110000060001",DISASTERNAME:"广州市白云区白山村白良路段良洞滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"险情",Longitude:
113.41305556,Latitude:23.28111111},
			{GUID:"d71d8645-d62e-424f-a244-986f35acc314",LOCATION:"广东省中山市沙溪镇濠涌村瑞王家具厂",UnifiedCode:"4420000000550001",DISASTERNAME:"中山市瑞王家具厂滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"险情",Longitude:
113.30527778,Latitude:22.48222222}
		];
			//disponseData(ret, times);
			setTimeout(disponseData,3000,ret,times);
}

function getDanger(url,times)
{
	api.ajax({
		url : baseUrl + url,
		method : 'get'
	}, function(ret, err) {
		if (ret) {

			disponseData(ret, times);
		} else {
			//alert('数据加载错误，请重试');
		}
	});
}

//应急调查模拟数据
function getYjdcData(url,times)
{
/*
	api.ajax({
		url : xqUrl + url,
		method : 'get'
	}, function(ret, err) {
		if (ret) {
		ret = [
			{GUID:"49499dd7-aefb-4dbc-a496-eadf7d18636d",LOCATION:"怀集县桥头镇新平村委会金和经济合作社滑坡",UnifiedCode:"4412240001340001",DISASTERNAME:"肇庆市怀集县桥头镇新平村委会金和经济合作社滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"灾情",Longitude:112.00194444,Latitude:
23.72416667},
			{GUID:"33897a95-c280-48b4-874b-ab55cdc463d2",LOCATION:"广东省白云区太和镇兴丰村黄麻塘组",UnifiedCode:"4401110000080002",DISASTERNAME:"广州市白云区黄麻塘崩塌",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:
113.4825,Latitude:23.28611111},
			{GUID:"a2b01dbb-b028-4ea9-95ba-04e3baa030c4",LOCATION:"天河区龙洞街龙洞森林公园",UnifiedCode:"4401060000010002",DISASTERNAME:"广州市天河区龙洞街龙洞森林公园龙洞山庄大街13号西侧边坡",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:113.35472222,Latitude:
23.20444444},
{GUID:"b1f83aa2-99de-44e7-86bd-21e735d45273",LOCATION:"广州市越秀区登峰街",UnifiedCode:"4401040000030002",DISASTERNAME:"广州市越秀区登峰街象岗山西侧边坡",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:113.26861111,Latitude:
23.14555556},
			{GUID:"d323dbe9-d27b-4ed9-96cf-100ff047ed0c",LOCATION:"广州市白云区白山村白良路段良洞滑坡",UnifiedCode:"4401110000060001",DISASTERNAME:"广州市白云区白山村白良路段良洞滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"险情",Longitude:
113.41305556,Latitude:23.28111111},
			{GUID:"d71d8645-d62e-424f-a244-986f35acc314",LOCATION:"广东省中山市沙溪镇濠涌村瑞王家具厂",UnifiedCode:"4420000000550001",DISASTERNAME:"中山市瑞王家具厂滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"险情",Longitude:
113.30527778,Latitude:22.48222222}
		];
		var result = {
			list:ret,
			total:10
		};
			disponseData(result, times);
		} else {
			//alert('数据加载错误，请重试');
		}
	});

	*/
	var	ret = [
			{GUID:"49499dd7-aefb-4dbc-a496-eadf7d18636d",LOCATION:"怀集县桥头镇新平村委会金和经济合作社滑坡",UnifiedCode:"4412240001340001",DISASTERNAME:"肇庆市怀集县桥头镇新平村委会金和经济合作社滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"灾情",Longitude:112.00194444,Latitude:
23.72416667},
			{GUID:"33897a95-c280-48b4-874b-ab55cdc463d2",LOCATION:"广东省白云区太和镇兴丰村黄麻塘组",UnifiedCode:"4401110000080002",DISASTERNAME:"广州市白云区黄麻塘崩塌",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:
113.4825,Latitude:23.28611111},
			{GUID:"a2b01dbb-b028-4ea9-95ba-04e3baa030c4",LOCATION:"天河区龙洞街龙洞森林公园",UnifiedCode:"4401060000010002",DISASTERNAME:"广州市天河区龙洞街龙洞森林公园龙洞山庄大街13号西侧边坡",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:113.35472222,Latitude:
23.20444444},
{GUID:"b1f83aa2-99de-44e7-86bd-21e735d45273",LOCATION:"广州市越秀区登峰街",UnifiedCode:"4401040000030002",DISASTERNAME:"广州市越秀区登峰街象岗山西侧边坡",DISASTERTYPE:"崩塌",REPORTTYPE:"灾情",Longitude:113.26861111,Latitude:
23.14555556},
			{GUID:"d323dbe9-d27b-4ed9-96cf-100ff047ed0c",LOCATION:"广州市白云区白山村白良路段良洞滑坡",UnifiedCode:"4401110000060001",DISASTERNAME:"广州市白云区白山村白良路段良洞滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"险情",Longitude:
113.41305556,Latitude:23.28111111},
			{GUID:"d71d8645-d62e-424f-a244-986f35acc314",LOCATION:"广东省中山市沙溪镇濠涌村瑞王家具厂",UnifiedCode:"4420000000550001",DISASTERNAME:"中山市瑞王家具厂滑坡",DISASTERTYPE:"滑坡",REPORTTYPE:"险情",Longitude:
113.30527778,Latitude:22.48222222}
		];
		var result = {
			list:ret,
			total:10
		};
		setTimeout(disponseData,3000,result);

}
function demo() {

}

function getCount(url, times) {
	api.ajax({
		url : xqUrl + url,
		method : 'get',
		dataType : 'text',
	}, function(ret, err) {
		if (ret) {
			disponseData(ret, times);
		} else {
			alert('数据加载错误，请重试');
		}
	});
}

function postXqData(url, info) {
	//console.log(baseUrl + url);
	//console.log($api.jsonToStr(info))
	api.ajax({
		url : xqUrl + url,
		method : 'post',
		data : {
			values : info
		}
	}, function(ret, err) {
		if (ret) {
			//console.log($api.jsonToStr(ret))
			disponseBackData(ret);
		} else {
			//console.log($api.jsonToStr(err))
			alert($api.jsonToStr(err))
		}
	});
}

function getMediaList(url, times) {
	//console.log(mediaUrl+ url)
	api.ajax({
		url : mediaUrl + url,
		method : 'get'
	}, function(ret, err) {
		if (ret) {
			disponseData(ret, times);
		} else {
			alert('数据加载错误，请重试');
		}
	});
}

function getDoc(url, times) {
	api.ajax({
		url : mediaUrl + url,
		method : 'get',
		dataType : 'text',
	}, function(ret, err) {
		if (ret) {
			disponseData(ret, times);
		} else {
			alert('数据加载错误，请重试');
		}
	});
}

function postData(url, info, type) {
	//console.log(baseUrl + url);
	//console.log($api.jsonToStr(info))
	api.ajax({
		url : baseUrl + url,
		method : 'post',
		data : {
			values : info
		}
	}, function(ret, err) {
		if (ret) {
			//console.log($api.jsonToStr(ret))
			disponseBackData(ret, type);
		} else {
			//console.log($api.jsonToStr(err))
			alert($api.jsonToStr(err))
		}
	});
}

function openFrame(name, url, x, data) {
	api.openFrame({
		name : name,
		url : url,
		bounces : false,
		rect : {
			x : x,
			y : 0,
			w : 'auto',
			h : 'auto'
		},
		pageParam : {
			info : data
		}
	});
}

function getDate(index, nub) {
	api.openPicker({
		type : 'date',
		date : '2014-05-01 12:30',
		title : '选择时间'
	}, function(ret, err) {
		if (ret) {
			var date = ret.year + '-' + (ret.month < 10 ? ('0'.concat(ret.month)) : ret.month ) + '-' + (ret.day < 10 ? ('0'.concat(ret.day)) : ret.day);
			if (nub == 1) {
				vm.date = date;
			} else if (nub > 1) {
				backDate(date, index);
			}
		} else {
			alert('获取时间失败，请重试！');
		}
	});
}

function getLocation(value) {
	if (value == undefined) {
		api.openFrame({
			name : 'map_location',
			url : '../map_location.html',
			rect : {
				x : 65,
				y : 0,
				w : 'auto',
				h : 'auto'
			}
		});
	} else {
		return
	}
}

//转换日期格式
function transformDate(date) {
	if (date != null) {
		return new Date(parseInt(date.substr(6, 13))).toLocaleDateString()
	}
}
function transformDatea(date) {
	return moment(new Date(parseInt(date.substr(6, 13)))).format('YYYY-MM-DD hh:mm:ss')
}
//给返回的数据加上相对应的font_icon
function transIcon(data, attr) {
	data.forEach(function(each) {
		switch (each[attr]) {
			case '崩塌':
				each.icon = 'icon-tanta-30';
				each.iconText = '\ue936'
				break;
			case '滑坡':
				each.icon = "icon-huapo-30";
				each.iconText = '\ue933'
				break;
			case '斜坡':
				each.icon = "icon-xiepo-30";
				each.iconText = '\ue935'
				break;
			case '泥石流':
				each.icon = "icon-nsl-30";
				each.iconText = '\ue92c'
				break;
			case '地裂缝':
				each.icon = "icon-leif-30";
				each.iconText = '\ue93f'
				break;
			case '地面塌陷':
				each.icon = "icon-taxian-30";
				each.iconText = '\ue945'
				break;
			case '地面沉降':
				each.icon = "icon-cj-30";
				each.iconText = '\ue940'
				break;
		}
	})
}

function backFun(name) {
	api.closeFrame({
		name : name
	});
}

//调用手机相机
var pica = [], picb = [], picturesa = [], picturesb = [], isShow = false, images = [];
var fs;
function camFunction() {
	api.getPicture({
		sourceType : 'camera',
		mediaValue : 'all',
		allowEdit : true,
		destinationType : 'url',
		targetWidth : 100,
		targetHeight : 100,
		saveToPhotoAlbum : true
	}, function(ret, err) {
		if (ret && ret.data) {
			var picsObj = {};
			//$api.prepend($api.dom('#picture'), '<div class="imgbox"><img src="' + ret.data + '"></div>');
			//console.log(ret.data);
			path = ret.data;
			pica.push(ret.data);
			//codePics.push(ret.data);
			picsObj.path = ret.data;
			picturesa.push(picsObj);
			getPicturesa(picturesa)
			if (pica.length > 8) {
				$api.css($api.dom('.add-picture'), 'display:none');
			}
		};

	});
}

//调取手机相册
var UIMediaScanner, systemType;
function albumFunction() {
	//if(systemType == 'iOS'){
	UIMediaScanner.transPath({
		path : '../../../iosImages'
	}, function(ret, err) {
		if (ret) {
			//alert(JSON.stringify(ret));
		} else {
			//alert(JSON.stringify(err));
		}
	});
	//}
	UIMediaScanner.open({
		type : 'all',
		column : 4,
		classify : true,
		max : 9 - picb.length,
		sort : {
			key : 'time',
			order : 'desc'
		},
		texts : {
			stateText : '已选择*项',
			cancelText : '取消',
			finishText : '完成'
		},
		styles : {
			bg : '#fff',
			mark : {
				icon : '',
				position : 'bottom_left',
				size : 20
			},
			nav : {
				bg : '#eee',
				stateColor : '#000',
				stateSize : 18,
				cancelBg : 'rgba(0,0,0,0)',
				cancelColor : '#000',
				cancelSize : 18,
				finishBg : 'rgba(0,0,0,0)',
				finishColor : '#000',
				finishSize : 18
			}
		},
		scrollToBottom : {
			intervalTime : 3,
			anim : true
		},
		exchange : true,
		rotation : true
	}, function(ret, err) {
		if (ret) {
			//alert($api.jsonToStr(ret.list)+87);
			var paths = ret.list;
			for (var i in paths) {
				var picsObj = {};
				var lastIndex = paths[i].path.lastIndexOf('.');
				var format = paths[i].path.substring(lastIndex + 1);
				if (format == 'avi' || format == 'mp4' || format == 'asf' || format == 'wmv' || format == 'mov' || format == 'flv' || format == 'f4v') {
					picsObj.videoPath = paths[i].path;
				} else {
					picsObj.path = paths[i].path;
					images.push(paths[i].path);
				}
				//console.log(paths[i].path);
				picb.push(paths[i].path);
				picturesb.push(picsObj);
				//console.log($api.jsonToStr(pictures));
				//api.clearCache();
			};
			//console.log($api.jsonToStr(picturesb));
			getPicturesb(picturesb);
			if (picb.length > 8) {
				$api.css($api.dom('.add-picture'), 'display:none');
			}
		}
	});
}
