/*
 * 移动端上传js --------环境监测上传附件
 *
 * by huqr
 */

(function(window) {
	"use strict";

	var d = {},_url;

	d.init=function(url){
		_url=url;
	};

	/*-----------------私有方法------------------------------------------------------------------------------------start*/
	function _upload(filedata,modelId, fkey, TypeCode, TypeName,  backFun){
		var names = filedata.split('/');
		var name = names[names.length - 1];
		var ajaxData = {
			files : {
				Filedata : filedata
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
					creator : 'EM',
					guid : ''
				}
			}
			$api.post(_url + '/AjaxHandler.ashx?class=FileImageInfoAjax&method=addFileImage', ajaxData2, function(res) {
				//	console.log(res);
					backFun(res);
				var ajaxData3 = {
					values : {
						typeCode : TypeCode + '.' + TypeName,
						modelId : modelId,
						belongObjectGuid : fkey,
						fileinfoGuid : res
					}

				}
				$api.post(_url + '/AjaxHandler.ashx?class=FileImageInfoAjax&method=addFileImage', ajaxData3, function(rets) {
				//	console.log(rets);

				}, 'text');
			}, 'text');
		}, 'text');
	}

	function _getPicture(type, modelId, TypeCode, TypeName, fkey, beforUploadFun, backFun) {

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
				//调用上传接口
				beforUploadFun();
				_upload(ret.data, modelId,  fkey,TypeCode, TypeName, backFun);
			} else if (ret && !ret.data) {
				backFun(99);
			} else {
				toast('系统错误,请重试！');
			}
		});
	}

	function _getFile(modelId, TypeCode, TypeName, fkey, beforUploadFun, backFun) {
		//选择文件
		var fileBrowser = api.require('fileBrowser');
		//打开文件管理器
		fileBrowser.open(function(ret, err) {
			fileBrowser.close();
			beforUploadFun();
			_upload(ret.url, modelId,  fkey,TypeCode, TypeName, backFun);
		});
	}

	/*-----------------私有方法------------------------------------------------------------------------------------end*/


	/*
	 * 摄影
	 * modelId  模块id
	 * fkey 业务主键id  对应 于  belongObjectGuid
	 * typeCode 多媒体类型id
	 * typeName 多媒体类型名称
	 * backFun 回调函数 返回 true false 和   99  为按返回键的回调判断
	 */
	d.getCameraVideo = function(modelId, fkey, typeCode, typeName, beforUploadFun, backFun) {
		_getPicture(2, modelId, typeCode, typeName, fkey, beforUploadFun, backFun);
	}
	//拍照
	d.getCameraPic = function(modelId, fkey, typeCode, typeName,  beforUploadFun, backFun) {
		_getPicture(3, modelId, typeCode, typeName, fkey, beforUploadFun, backFun);
	}
	//选择视频
	d.getAlbumVideo = function(modelId, fkey, typeCode, typeName,  beforUploadFun, backFun) {
		_getPicture(4, modelId, typeCode, typeName, fkey, beforUploadFun, backFun);
	}
	//选择相册
	d.getAlbumPic = function(modelId, fkey, typeCode, typeName,  beforUploadFun, backFun) {
		_getPicture(5, modelId, typeCode, typeName, fkey, beforUploadFun, backFun);
	}
	//选择手机本地文件
	d.getFile = function(modelId, fkey, typeCode, typeName,  beforUploadFun, backFun) {
		_getFile(modelId, typeCode, typeName, fkey, beforUploadFun, backFun);
	}
	//环境监测上传附件全局变量
	window.$mediaUploadForEM = d;
})(window);
