/*
 * 移动端上传js
 *
 * by huqr
 */

(function(window) {
	var _url, _token, _path, _ajax = function(params, paramsIsStr, afert, backFun) {
		var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
		if (!paramsIsStr) {
			contentType = 'application/json';
			params = JSON.stringify(params);
		}
		$.ajax({
			url : _url + afert,
			type : "POST",
			data : params,
			contentType : contentType,
			dataType : "json",
			headers : {
				Authorization : 'Bearer ' + _token
			},
			success : function(ret, status) {
				if (status === 'success') {
					backFun(ret);
				} else {
					backFun();
				}
			},
			error : function(XHR, textStatus) {
				//console.log(XHR, textStatus);
				console.log(JSON.stringify(XHR));
				backFun();
			}
		});
	};

	var d = {};

	/*
	 *  初化始赋值
	 *	url  主机地址
	 *  token  认证令牌值
	 */
	d.init = function(url, token) {
		_url = url;
		_token = token;
		_path = 'widget://res/media';

		var fs = api.require('fs');
		//判断多媒体文件夹是否存在
		var ret = fs.existSync({
			path : _path
		});
		if (!ret.exist) {
			var res = fs.createDirSync({
				path : _path
			});
			console.log(ret.status ? '创建成功！' : '创建文件夹失败！');
		}
	};

	/*
	 *  在线获取多媒体列表(根据模块Id及业务id)
	 *	moduleId  模块Id  string
	 *  fkey 业务id  string
	 */
	d.getMultimediaList = function(moduleId, fkey, callback) {
		var str = '/api/fileImage/FindFileInfos';
		var _params = {
			moduleId : moduleId,
			belongObjectId : fkey
		};
		_ajax(_params, false, str, callback);
	}
	/*
	 *  在线根据模块Id及业务id移除与文件的关联关系
	 *	moduleId  模块Id  string
	 *  fkey 业务id  string
	 */
	d.removeMultimediaRelate = function(moduleId, fkey, callback) {
		var str = '/api/fileImage/BusinessFileinfoRemoveAllRelate';
		var _params = {
			moduleId : moduleId,
			belongObjectId : fkey
		};
		_ajax(_params, false, str, callback);
	}
	/*
	 *  在线根据文件Id移除与业务id的关联关系
	 *	moduleId  模块Id string
	 *  fileGuid  文件Id 数组
	 */
	d.delMultimediaRelates = function(moduleId, fileGuid, callback) {
		var str = '/api/fileImage/BusinessFileinfoRemoveRelates';
		var _params = {
			moduleId : moduleId,
			businessFileimageGuids : fileGuid
		};
		_ajax(_params, false, str, callback);
	}
	/*
	 * 摄影
	 * typeCode 多媒体类型id
	 * typeName 多媒体类型名称
	 * fkey 外键
	 * backFun 回调函数
	 */
	d.getCameraVideo = function(typeCode, typeName, fkey, beforUploadFun, backFun) {
		getPicture(2, typeCode, typeName, fkey, beforUploadFun, backFun);
	}
	//拍照
	d.getCameraPic = function(typeCode, typeName, fkey, beforUploadFun, backFun) {
		getPicture(3, typeCode, typeName, fkey, beforUploadFun, backFun);
	}
	//选择视频
	d.getAlbumVideo = function(typeCode, typeName, fkey, beforUploadFun, backFun) {
		getPicture(4, typeCode, typeName, fkey, beforUploadFun, backFun);
	}
	//选择相册
	d.getAlbumPic = function(typeCode, typeName, fkey, beforUploadFun, backFun) {
		getPicture(5, typeCode, typeName, fkey, beforUploadFun, backFun);
	}
	//选择手机本地文件
	d.getFile = function(modelId, typeCode, typeName, fkey, beforUploadFun, backFun) {
		getLocalMedia(modelId, typeCode, typeName, fkey, beforUploadFun, backFun);
	}
	/*
	 * 将文件信息保存到数据库
	 * TypeCode 多媒体类型id
	 * TypeName 多媒体类型名称
	 * fkey 多媒体对应的外键
	 * path 保存文件路径
	 * backFun 回调函数
	 * */
	function addToLocal(TypeCode, TypeName, fkey, path, backFun) {
		var names = path.split('/');
		var name = names[names.length - 1];
		var filenames = name.split('.');
		var extname = '.' + filenames[filenames.length - 1];
		var filename = name.substring(0, name.length - extname.length);

		var f = api.require('fs');
		f.getAttribute({
			path : path
		}, function(ret, err) {
			if (!ret.status) {
				toast('系统错误,请重试！');
				return;
			}
			var size = ret.attribute.size;

			var fs = api.require('fs');

			//将文件copy到指定目录
			fs.copyTo({
				oldPath : path,
				newPath : _path + '/'
			}, function(ret, err) {
				if (ret.status) {
					console.log(JSON.stringify(ret));
					var localData = {
						FILEINFOGUID : NewGuid(),
						BUSSNISSFILEINFOGUID : fkey,
						FILENAME : filename,
						ExtName : extname,
						TYPECODE : TypeCode,
						TYPENAME : TypeName,
						PATH : _path + '/' + name,
						SIZE : size
					}
					console.log(JSON.stringify(localData));
					$mediaLocal.add(localData, function(a) {
						console.log(JSON.stringify(a));
						if (a) {
							backFun(a);
						} else {
							backFun();
						}
					});
				} else {
					console.log(JSON.stringify(err));
				}
			});

		});
	}

	/*
	 * 从拍照摄像等获取多媒体文件
	 * type 多媒体类型
	 * TypeCode 多媒体类型id
	 * TypeName 多媒体类型名称
	 * fkey 多媒体对应的外键
	 * beforUploadFun 上传之前回调函数
	 * backFun 回调函数
	 * */
	function getPicture(type, TypeCode, TypeName, fkey, beforUploadFun, backFun) {

		var sourceType = '';
		var encodingType = 'jpg';
		var mediaValue = '';

		switch(type) {
			case 1:
				sourceType = 'library';
				mediaValue = 'video';
				break;
			case 2:
				sourceType = 'camera';
				mediaValue = 'video';
				break;
			case 3:
				sourceType = 'camera';
				mediaValue = 'pic';
				break;
			case 4:
				sourceType = 'album';
				mediaValue = 'video';
				break;
			case 5:
				sourceType = 'album';
				mediaValue = 'pic';
				break;
			default:
				break;
		}
		//选择图片文件
		api.getPicture({
			sourceType : sourceType,
			encodingType : encodingType,
			mediaValue : mediaValue,
			destinationType : 'base64',
			allowEdit : false,
			quality : 100,
			saveToPhotoAlbum : true
		}, function(ret, err) {
			if (ret && !!ret.data) {
				if (isOnline) {
					//调用上传接口，传递base64编码
					getOnlineMedia(ret, beforUploadFun, backFun);
				} else {
					beforUploadFun();
					addToLocal(TypeCode, TypeName, fkey, ret.data, backFun);
				}
			}else if (ret && !ret.data) {
				backFun(99);
			}else {
				toast('系统错误,请重试！');
			}
		});
	}

	/*
	 * 选择手机本地文件
	 * TypeCode 多媒体类型id
	 * TypeName 多媒体类型名称
	 * fkey 多媒体对应外键
	 * beforUploadFun 上传之前回调函数
	 * backFun 回调函数
	 */
	function getLocalMedia(modelId, TypeCode, TypeName, fkey, beforUploadFun, backFun) {
		//选择文件
		var fileBrowser = api.require('fileBrowser');
		//打开文件管理器
		fileBrowser.open(function(ret, err) {
			fileBrowser.close();

			beforUploadFun();

			var names = ret.url.split('/');
			var name = names[names.length - 1];
			if (isOnline) {
				var ajaxData = {
					files : {
						Filedata : ret.url
					},
					values : {
						Filename : name,
						ASPSESSID : 'qp2javfpteijpwnqhpajpdhw',
						filename : name,
						Upload : 'Submit Query'
					}
				}
				$api.post(_url + '/page/upload.aspx', ajaxData, function(ret) {
					var ajaxData2 = {
						values : {
							fileTempName : ret,
							storageMethod : '文件夹',
							description : name,
							fullname : name,
							creator : 'huqr',
							guid : ''
						}
					}
					$api.post(_url + '/AjaxHandler.ashx?class=FileImageInfoAjax&method=addFileImage', ajaxData2, function(res) {
						var ajaxData3 = {
							values : {
								typeCode : TypeCode + '.' + TypeName,
								modelId : modelId,
								belongObjectGuid : NewGuid(),
								fileinfoGuid : res
							}
						}
						$api.post(_url + '/AjaxHandler.ashx?class=FileImageInfoAjax&method=addFileImage', ajaxData3, function(rets) {
							backFun(rets);
						}, 'text');
					}, 'text');
				}, 'text');

			} else {
				addToLocal(TypeCode, TypeName, fkey, ret.url, backFun);
			}
		});
	}

	//在线提交文件
	//params 文件对象
	//backFun 回调函数
	function getOnlineMedia(params, beforUploadFun, backFun) {
		var url = params.data.split('/');
		var filename = url[url.length - 1];

		var splitarr = filename.split('.');
		var fileExt = '.' + splitarr[splitarr.length - 1];

		var result = params.base64Data.split('64,');
		console.log(result[0]);
		result = result[1];
		var totalLen = result.length;

		var fs = api.require('fs');
		fs.getAttribute({
			path : params.data
		}, function(ret, err) {
			console.log(JSON.stringify(ret));
			if (ret.status) {
				var partNum = parseInt(ret.attribute.size) / 204800;
				//总长数
				var eachSize = Math.floor(totalLen / partNum);
				//每段长度

				var blobFrom = 0, blobTo = eachSize;
				//起止长数

				var data = result.substring(blobFrom, blobTo);

				var i = Math.ceil(totalLen / eachSize);
				//总段数

				var str = '/api/fileImage/UplodaFile';

				console.log(partNum);
				var _params = {
					name : filename, //文件名
					content : data, //文件分段的BASE64编码
					len : i, //文件分段的总段数
					ext : fileExt, //扩展名 例：".txt"
					size : totalLen //文件大小
				};

				var callback = function(a) {
					i--;
					if (a && i > 0) {
						blobFrom = blobTo, blobTo = (eachSize + blobTo) > totalLen ? totalLen : (eachSize + blobTo);
						data = result.substring(blobFrom, blobTo);
						a.content = data;

						//第i次调用
						_ajax(a, false, str, callback);

						var per = (_params.len - i) / _params.len * 100;
						beforUploadFun(per);
					} else if (a && i === 0) {
						//上传成功
						backFun({
							data : a,
							status : true
						});
						//alert(1);
					}

				};

				//第一次调用
				_ajax(_params, false, str, callback);
			} else {
				console.log(JSON.stringify(err));
			}
		});
	}


	window.$mediaUpload = d;
})(window);
