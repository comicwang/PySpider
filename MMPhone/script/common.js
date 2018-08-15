//var siteUrl="http://dz.infoearth.com:8000/geoenv/";
var siteUrl = "http://192.168.200.100:8055/geoenv/";
/**********枣庄中心点坐标**********/
var zzLogLat = {
	lon : 117.30951,
	lat : 34.82114
};

/**********测试数据**********/
var userScope = {
	lbLon : 117.1806,
	lbLat : 34.6224,
	rtLon : 117.4734,
	rtLat : 34.9396
}

//轨迹测试数据
//var myPath = [{
//	lon : 117.32242,
//	lat : 34.81413
//}, {
//	lon : 117.32462,
//	lat : 34.81619
//}, {
//	lon : 117.32791,
//	lat : 34.81674
//}, {
//	lon : 117.32929,
//	lat : 34.81715
//}, {
//	lon : 117.33258,
//	lat : 34.8166
//}, {
//	lon : 117.33505,
//	lat : 34.81647
//}, {
//	lon : 117.34,
//	lat : 34.81619
//}, {
//	lon : 117.34453,
//	lat : 34.81633
//}]

/**************打开某一个frame窗口**********************/
function openLeftgroup(frmName, frmUrl, param) {
	//var thridHeader = $api.byId('aui-header');
	//var thridHeader = $api.offset(thridHeader);
	if (param == undefined || param == null) {
		param = null;
	}
	fixStatusBar('aui-header', function(headerPos) {
		var body_h = $api.offset($api.dom('body')).h;
		var footer_h = $api.offset($api.byId('aui-footer')).h;
		var hVal = body_h - headerPos.h - footer_h;
		api.openFrame({
			name : frmName,
			url : frmUrl,
			rect : {
				x : 0,
				y : headerPos.h,
				w : 'auto',
				h : hVal
			},
			pageParam : {
				y : headerPos.h,
				h : hVal,
				param : param
			},
			bounces : false,
			delay : 200
		});
	});

}

/**********返回到主窗口*******************/
function navigateToMain(winName) {
//	api.closeToWin({
//		name : winName,
//		animation : {
//			type : 'push',
//			subType : 'from_left',
//			duration : 500
//		}
//	});

	api.closeWin();
}

function navigateToWin(winName) {
	api.closeToWin({
		name : winName,
		animation : {
			type : 'push',
			subType : 'from_left',
			duration : 500
		}
	});
}

/**************打开某一个Window窗口**********************/
function openNewWin(winName, winUrl) {
	api.openWin({
		name : winName,
		url : winUrl,
		rect : {
			x : 0,
			y : 0,
			w : 'auto',
			h : 'auto'
		},
		bounces : false,
		delay : 300,
		animation : {
			type : 'push',
			subType : 'from_right',
			duration : 300
		}
	});
}

/*******************百度地图相关****************************/
function loadBmap(map, mapType, zoomLev) {
	if (zoomLev == null || zoomLev == undefined) {
		zoomLev = 18;
	}

	map.open({
		rect : {
			x : 0,
			y : api.pageParam.y,
			w : 'auto',
			h : api.pageParam.h
		},
		center : {
			lon : zzLogLat.lon,
			lat : zzLogLat.lat
		},
		zoomLevel : zoomLev,
		showUserLocation : true,
		fixedOn : '',
		fixed : true
	}, function(ret) {
		if (ret.status) {
			//addAnnotations(map);
			//			autoLocation(map);
		}
	})
	if (mapType) {
		map.setMapAttr({
			type : mapType
		});
	}
}

function addMobileAnnotations(map) {
	map.addMobileAnnotations({
		annotations : [{
			id : 10,
			lon : 116.297,
			lat : 40.109,
			icon : 'widget://image/bug.png'
		}, {
			id : 11,
			lon : 116.98,
			lat : 40.109,
			icon : 'widget://image/car.png'
		}]
	})
}

function addBillboard(map) {
	map.addBillboard({
		id : 4,
		coords : {
			lon : 117.233,
			lat : 34.748
		},
		bgImg : 'widget://image/bMapTest.png',
		content : {
			title : '双蛋=完蛋',
			subTitle : '同志们，朋友们，双旦快乐',
			illus : ''
		},
		styles : {
			titleColor : '#000',
			titleSize : 14,
			subTitleColor : '#999',
			subTitleSize : 12,
			illusAlign : 'left'
		}
	}, function(ret) {
		if (ret) {

		}
	});
}

function setBubble(map) {
	map.setBubble({
		id : 2,
		bgImg : 'widget://res/bubble_bg.png',
		content : {
			title : '山亭区高庄镇大尧村采空区治理项目',
		},
		styles : {
			titleColor : '#000',
			titleSize : 12,
		}
	}, function(ret) {
		if (ret) {
			map.popupBubble({
				id : 2
			});
			$.t
		}
	});
}

//设置中心点位置
function setCenter(map, lon, lat) {
	map.setCenter({
		coords : {
			lon : lon,
			lat : lat
		},
		animation : true
	});
}

function setCenterLocation(map,arrLonlat) {
	var minValue = [];
	var maxValue = [];
	var minLongitude = 0;
	var maxLatitude = 0;
	for (var i = 0; i < arrLonlat.length; i++) {
		if (arrLonlat[i] != null) {
			if (i == 0) {
				if (arrLonlat[i].lon != 0 && arrLonlat[i].lat != 0) {
					minValue = arrLonlat[i];
					maxValue = arrLonlat[i];
					minLongitude = arrLonlat[i].lon;
					maxLatitude = arrLonlat[i].lat;
				}
			} else {
				if (arrLonlat[i].lon != 0 && arrLonlat[i].lat != 0) {
					if (minLongitude < arrLonlat[i].lon) {
						minValue = arrLonlat[i];
						minLongitude = arrLonlat[i].lon;
					}
					if (maxLatitude > arrLonlat[i].lat) {
						maxValue = arrLonlat[i];
						maxLatitude = arrLonlat[i].lat;
					}
				}
			}

		}
	}

    var avgLon = (minValue.lon + maxValue.lon) / 2.0;
    var avgLat = (minValue.lat + maxValue.lat) / 2.0;

    setCenter(map,avgLon,avgLat);
}

//自动寻找位置
function autoLocation(map) {
	map.getLocation({
		accuracy : '100m',
		autoStop : true,
		filter : 1
	}, function(ret, err) {
		if (ret.status) {
			setCenter(map, ret.lon, ret.lat);
			//alert(JSON.stringify(ret));
		} else {

		}
	});
}

/****************退出App************************/
function exit_app() {
	api.addEventListener({
		name : 'keyback'
	}, function(ret, err) {
		api.toast({
			msg : '再按一次退出应用',
			duration : 2000,
			location : 'bottom'
		});

		api.addEventListener({
			name : 'keyback'
		}, function(ret, err) {
			api.closeWidget({
				id : 'A6905117633314',
				retData : {
					name : 'closeWidget'
				},
				animation : {
					type : 'flip',
					subType : 'from_bottom',
					duration : 500
				},
				silent : true
			});
		});
		setTimeout(function() {
			exit_app();
		}, 3000);
	});
}

function sendEventTobMap(eventName, data) {
	api.showProgress({
		style : 'default',
		animationType : 'fade',
		title : '努力加载中...',
		text : '请稍后...',
		modal : false
	});
	data = ( typeof arguments[1] == "undefined" || arguments[1] == null) ? {} : arguments[1];
	api.sendEvent({
		name : eventName,
		extra : data
	});
	api.hideProgress();
}

// 监听来自func页面的事件
function addEventListenerFromFunc(eventName, callback) {
	api.addEventListener({
		name : eventName
	}, function(ret) {
		if (ret && ret.value) {
			var obj = ret.value;
			if ( typeof callback == "function") {
				callback(obj);
			}
		}
	});
}

// 生成guid,主要用于生成随机文件名
function NewGuid() {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// 获取当前的时间，拼接成2015-11-09这样的格式，主要用于对图片进行时间分类
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate
	return currentdate;
}

function formatDate(value) {
	if (value != null && String(value) != "") {
		var dt = new Date(parseJsDateTime(value));
		var dateString = dt.getFullYear() + "-" + fixZero(dt.getMonth() + 1) + "-" + fixZero(dt.getDate()) + " " + fixZero(dt.getHours()) + ":" + fixZero(dt.getMinutes()) + ":" + fixZero(dt.getSeconds());
		return dateString;
	} else {
		return "";
	}
}

function parseJsDateTime(jsTime) {
	if (isNaN(jsTime)) {
		return parseInt(jsTime.replace("/Date(", "").replace(")/", ""));
	} else {
		return jsTime;
	}
}

function fixZero(num) {
	if (num.toString().length == 1) {
		return "0" + num.toString();
	}
	return num.toString();
}

//格式化日期
function formatDateToStandard(sValue, sStyle) {
	if (sValue != undefined && sValue != null && sValue != "") {
		var dt = new Date(sValue);
		var sYear = dt.getFullYear().toString();
		var sMonth = fixZero(dt.getMonth() + 1).toString();
		var sDay = fixZero(dt.getDate()).toString();
		var sHour = fixZero(dt.getHours()).toString();
		var sMinute = fixZero(dt.getMinutes()).toString();
		var sSecond = fixZero(dt.getSeconds()).toString();
		var sMSecond = dt.getMilliseconds().toString();
		if (sHour.length < 2)
			sHour = "0" + sHour;
		if (sMinute.length < 2)
			sMinute = "0" + sMinute;
		if (sSecond.length < 2)
			sSecond = "0" + sSecond;
		if (sMSecond.length < 2)
			sMSecond = "0" + sMSecond;
		if (sMSecond.length < 3)
			sMSecond = "0" + sMSecond;
		if (sStyle == "120" || sStyle == "yyyy-MM-dd hh:mm:ss") {
			//2013-09-05 11:38:28
			return sYear + "-" + sMonth + "-" + sDay + " " + sHour + ":" + sMinute + ":" + sSecond;
		} else if (sStyle == "121" || sStyle == "yyyy-MM-dd hh:mm:ss.fff") {
			//2013-09-05 11:38:28.963

			return sYear + "-" + sMonth + "-" + sDay + " " + sHour + ":" + sMinute + ":" + sSecond + "." + sMSecond;
		} else if (sStyle == "8" || sStyle == "hh:mm:ss") {
			//11:38:28
			return sHour + ":" + sMinute + ":" + sSecond;
		} else if (sStyle == "14" || sStyle == "hh:mm:ss.fff") {
			//11:38:28.963
			return sHour + ":" + sMinute + ":" + sSecond + "." + sMSecond;
		} else if (sStyle == "yyyy-MM-dd") {
			//2013-09-05 11:38:28.963
			return sYear + "-" + sMonth + "-" + sDay;
		} else {
			return ""
		}
	} else {
		return "";
	}
}

function formatDate2(dt) {
	var dateString = dt.getFullYear() + "-" + fixZero(dt.getMonth() + 1) + "-" + fixZero(dt.getDate()) + " " + fixZero(dt.getHours()) + ":" + fixZero(dt.getMinutes()) + ":" + fixZero(dt.getSeconds());
	return dateString;
}

/***********************扩展Date方法****************/
Date.prototype.add = function(milliseconds) {
	var m = this.getTime() + milliseconds;
	return new Date(m);
}

Date.prototype.addSeconds = function(second) {
	return this.add(second * 1000);
}

Date.prototype.addMinutes = function(minute) {
	return this.addSeconds(minute * 60);
}

Date.prototype.addHours = function(hour) {
	return this.addMinutes(hour * 60);
}

Date.prototype.addDays = function(day) {
	return this.addHours(day * 24);
}
/***********************结束*************************/

// 获取文件拓展名
function getExt(fileName) {
	return fileName.substring(fileName.lastIndexOf('.') + 1);
}

// 图片压缩
// imgsrc：源图片的路径
// quality：图片压缩质量，一般建议0.5
// scale：图片压缩比例，也是建议0.5
// ext：源图片拓展名
// callback：转换成功之后回调函数
function imgCompress(imgsrc, quality, scale, ext, callback) {
	// 压缩文件的保存目录
	var savePath = api.cacheDir + "/" + getNowFormatDate() + "/";
	// 压缩文件生成的随机文件名称
	var savename = NewGuid() + "." + ext;
	imageFilter.compress({
		img : imgsrc,
		quality : quality,
		scale : quality,
		save : {
			album : false,
			imgPath : savePath,
			imgName : savename
		}
	}, function(ret, err) {
		if (ret) {
			callback(savePath + savename);
		} else {
			alert(JSON.stringify(err));
		}
	});
}

// 打开图片浏览
// imgs：需要预览的图片集合
function openImageBrowser(imgs) {
	imageBrowser.openImages({
		imageUrls : imgs,
		showList : false,
		activeIndex : 0
	});
}

// 添加长按方法
function addPress(obj, index) {
	// 获取目前长按的对象
	var hammertime = new Hammer(obj[0]);
	// 绑定长按对象
	hammertime.on("press", function(e) {
		api.confirm({
			title : '温馨提示',
			msg : '您确定要删除该图片吗？',
			buttons : ['确定', '取消']
		}, function(ret, err) {
			if (ret.buttonIndex == 1) {
				// 移除自己
				$(obj).remove();
				api.toast({
					msg : '删除成功！'
				});
			}
		});
	});
}

// 上传图片
// url：上传的url地址
// data：上传的文件
// callback：上传成功返回地址
function uploadFile(url, data, callback) {
	api.ajax({
		url : url,
		method : 'post',
		timeout : 30,
		dataType : 'json',
		returnAll : false,
		data : {
			files : {
				"pic" : data
			}
		}
	}, function(ret, err) {
		if (ret) {
			if (ret.statu == 1) {
				callback(ret.fileGuid);
			} else if (ret.statu == 0) {
				alert("上传失败");
			}
		} else {
			api.alert({
				msg : ('错误码：' + err.code + '；错误信息：' + err.msg + '；网络状态码：' + err.statusCode)
			});
		}
	});
}

// 解决状态栏重合，并优化fixStatusBar代码,Android4.4版本以上添加25px
function fixStatusBar(headerid, callback) {
	var header = $api.byId(headerid);
	var systemType = api.systemType;
	var systemVersion = parseFloat(api.systemVersion);

	if (systemType == "ios" || (systemType == "android" && systemVersion >= 4.4)) {
		if (systemType == "android") {
			header.style.paddingTop = '25px';
		}
		$api.fixStatusBar(header);
	} else {
		$api.fixIos7Bar(header);
	}
	var headerPos = $api.offset(header);
	if ( typeof callback == "function") {
		callback(headerPos);
	}
}

function getAppKeyInSha1() {
	var now = Date.now();
	var appId = api.appId;
	var appKeySha1 = $.sha1(appId + "INFOEARTH" + now) + "." + now;
	return appKeySha1;
}


//获取url中参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

//json数据时间格式转换
Date.prototype.format = function (format) //author: meizz
	{
			var o = {
					"M+": this.getMonth() + 1, //month
					"d+": this.getDate(),    //day
					"h+": this.getHours(),   //hour
					"m+": this.getMinutes(), //minute
					"s+": this.getSeconds(), //second
					"q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
					"S": this.getMilliseconds() //millisecond
			}
			if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o) if (new RegExp("(" + k + ")").test(format))
					format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
			return format;
	}
function formatDate(val) {
		var re = /-?\d+/;
		var m = re.exec(val);
		var d = new Date(parseInt(m[0]));
		// 按【2012-02-13 09:09:09】的格式返回日期
		return d.format("yyyy-MM-dd");
}

//GUID生成
function GUID() {
  this.date = new Date();

  /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
  if (typeof this.newGUID != 'function') {

    /* 生成GUID码 */
    GUID.prototype.newGUID = function() {
      this.date = new Date();
      var guidStr = '';
        sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
        sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
      for (var i = 0; i < 9; i++) {
        guidStr += Math.floor(Math.random()*16).toString(16);
      }
      guidStr += sexadecimalDate;
      guidStr += sexadecimalTime;
      while(guidStr.length < 32) {
        guidStr += Math.floor(Math.random()*16).toString(16);
      }
      return this.formatGUID(guidStr);
    }

    /*
     * 功能：获取当前日期的GUID格式，即8位数的日期：19700101
     * 返回值：返回GUID日期格式的字条串
     */
    GUID.prototype.getGUIDDate = function() {
      return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
    }

    /*
     * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933
     * 返回值：返回GUID日期格式的字条串
     */
    GUID.prototype.getGUIDTime = function() {
      return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero( parseInt(this.date.getMilliseconds() / 10 ));
    }

    /*
    * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现
     * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串
     * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串
     */
    GUID.prototype.addZero = function(num) {
      if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
        return '0' + Math.floor(num);
      } else {
        return num.toString();
      }
    }

    /*
     * 功能：将y进制的数值，转换为x进制的数值
     * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10
     * 返回值：返回转换后的字符串
     */
    GUID.prototype.hexadecimal = function(num, x, y) {
      if (y != undefined) {
        return parseInt(num.toString(), y).toString(x);
      } else {
        return parseInt(num.toString()).toString(x);
      }
    }

    /*
     * 功能：格式化32位的字符串为GUID模式的字符串
     * 参数：第1个参数表示32位的字符串
     * 返回值：标准GUID格式的字符串
     */
    GUID.prototype.formatGUID = function(guidStr) {
      var str1 = guidStr.slice(0, 8) + '-',
        str2 = guidStr.slice(8, 12) + '-',
        str3 = guidStr.slice(12, 16) + '-',
        str4 = guidStr.slice(16, 20) + '-',
        str5 = guidStr.slice(20);
      return str1 + str2 + str3 + str4 + str5;
    }
  }
}
