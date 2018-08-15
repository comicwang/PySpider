/*
 * 移动端多媒体控件---
 * 注意：须依赖两个文件  mediaLocal.js 和  mediaUpload.js
 * @params fkey     -----外键
 * @params moduleid   -----业务模块ID
 */
Vue.component('mobile-media', {
	props : ["moduleid", "fkey"],
	data : function() {
		var h = $(window).height() - 150;
		var frameStyle = {
			width : "100%",
			height : h + "px"
		};
		var data = {
			frameStyle : frameStyle,
			loadData : function() {
				var fkey = this.fkey, moduleid = this.moduleid;
				if (!fkey || !moduleid) {
					console.error("Error:fkey和moudleid均不能为null或undefined,fkey='+fkey+',moduleid='+moduleid+'")
					return;
				}
				$.ajax({
					url : '../../js/directive/multimedia/typecode.json',
					type : "GET",
					dataType : "json",
					success : function(ret, status) {
						console.log(fkey);
						console.log(moduleid);
						var rets;
						for (var i in ret) {
							if (ret[i].moduleId === moduleid)
								rets = ret[i].item;
						}
						if (!rets) {
							rets = ret[ret.length - 1].item;
						}
						var callback = function(a) {
							console.log(JSON.stringify(a));
							for (k in rets) {
								for (var i in a) {
									if (rets[k].typecode === a[i].TYPECODE) {
										rets[k].children.push(a[i]);
									}
								}
							}
							data.fordata = rets;
							console.log(JSON.stringify(data.fordata));
						};
						console.log(isOnline);
						if (!isOnline) {//离线
							$mediaLocal.select(null, fkey, null, callback);
							return;
						}

						//在线
						$mediaUpload.getMultimediaList(moduleid, fkey, callback);
					}
				});
			},
			fordata : [],
			visible : false,
			iframeUrl : '',
			visible : false,
			visible2 : false,
			imageType : false,
			videoType : false,
			isfile : false,
			isUp : false,
			percent : 0,
			circlePercent : false,
			itemisshow : [],
			selectedIndex:-1,
			selectedItem : null
		}
		return data;
	},
	mounted : function() {
		this.loadData();
	},
	watch : {
		fkey : function(val, old) {
			this.loadData();
		},
		moduleid : function(val, old) {
			this.loadData();
		},
		fordata : function(val, old) {
			//console.log(JSON.stringify(val));
		}
	},
	methods : {
		//上传
		upload : function(item) {
			this.selectedItem = item;
			var type = item.typestr;
			if (type === "other") {
				this.imageType = true;
				this.isfile = true;
				this.videoType = true;
			} else if (type === "documentType") {
				this.isfile = true;
				this.imageType = false;
				this.videoType = false;
			} else if (type === "imageType") {
				this.isfile = false;
				this.imageType = true;
				this.videoType = false;
			}
			this.visible = true;
		},
		//删除
		deleteOne : function(obj) {
			var self = this;
			this.$Modal.confirm({
				title : '删除',
				content : '确定要删除吗?',
				onOk : function() {
					if (!isOnline) {//离线删除
						var inputFile = {
							FILEINFOGUID : obj.FILEINFOGUID
						};
						$mediaLocal.del(inputFile, function(a) {
							if (a) {
								self.loadData();
								self.$Message.success("删除成功！");
								var fs = api.require('fs');
								fs.remove({
									path : obj.PATH
								}, function(ret, err) {
									//if (ret.status) {
										////判断多媒体文件夹是否存在
										//var ret = fs.existSync({
										//	path : obj.PATH
										//});
										//console.log(132, JSON.stringify(ret));
									//}
								});
							} else {
								self.$Message.error("删除失败！");
							}
						});
						return;
					}

					//在线删除
					$mediaUpload.delMultimediaRelates(self.moduleid, [a.BUSSNISSFILEINFOGUID], function(a) {
						self.$Message.success("删除成功！");
						self.loadData();
					});
				}
			});
		},
		//相册
		getAlbumPic : function() {
			var self = this;
			self.percent = 0;
			$mediaUpload.getAlbumPic(this.selectedItem.typecode, this.selectedItem.typeName, this.fkey, function(a) {
				self.circlePercent = true;
				self.percent = a ? a : 0;
			}, function(a) {
				if(a===99){//点返回键了
				}else if (a) {
					self.percent = 100;
					self.visible = false;
					self.loadData();
					self.selected(self.selectedItem, self.selectedIndex, true);
					self.$Message.success("上传成功！");
				} else {
					self.$Message.error("上传失败！");
				}
				self.circlePercent = false;
			});
		},
		//拍照
		getCameraPic : function() {
			var self = this;
			self.percent = 0;
			$mediaUpload.getCameraPic(this.selectedItem.typecode, this.selectedItem.typeName, this.fkey, function(a) {
				self.circlePercent = true;
				self.percent = a ? a : 0;

			}, function(a) {
				if(a===99){//点返回键了
				}else if (a) {
					self.percent = 100;
					self.visible = false;
					self.loadData();
					self.selected(self.selectedItem, self.selectedIndex, true);
					self.$Message.success("上传成功！");
				} else {
					self.$Message.error("上传失败！");
				}
				self.circlePercent = false;
			});
		},
		//视频
		getAlbumVideo : function() {
			var self = this;
			self.percent = 0;
			$mediaUpload.getAlbumVideo(this.selectedItem.typecode, this.selectedItem.typeName, this.fkey, function(a) {
				self.circlePercent = true;
				self.percent = a ? a : 0;
			}, function(a) {
				if(a===99){//点返回键了
				}else if (a) {
					self.percent = 100;
					self.visible = false;
					self.loadData();
					self.selected(self.selectedItem, self.selectedIndex, true);
					self.$Message.success("上传成功！");
				} else {
					self.$Message.error("上传失败！");
				}
				self.circlePercent = false;
			});
		},
		//摄像
		getCameraVideo : function() {
			var self = this;
			self.percent = 0;
			$mediaUpload.getCameraVideo(this.selectedItem.typecode, this.selectedItem.typeName, this.fkey, function(a) {
				self.circlePercent = true;
				self.percent = a ? a : 0;
			}, function(a) {
				if(a===99){//点返回键了
				}else if (a) {
					self.percent = 100;
					self.visible = false;
					self.loadData();
					self.selected(self.selectedItem, self.selectedIndex, true);
					self.$Message.success("上传成功！");
				} else {
					self.$Message.error("上传失败！");

				}
				self.circlePercent = true;
			});
		},
		//文件
		getFile : function() {
			var self = this;
			self.percent = 0;
			$mediaUpload.getFile(this.moduleid, this.selectedItem.typecode, this.selectedItem.typeName, this.fkey, function() {
				self.circlePercent = true;
			}, function(a) {
				if (a) {
					self.percent = 100;
					self.loadData();
					self.visible = false;
					self.selected(self.selectedItem, self.selectedIndex, true);
					self.$Message.success("上传成功！");
				} else {
					self.$Message.error("上传失败！");
				}
				self.circlePercent = false;
			});
		},
		//预览
		previewOne : function(obj) {
			if (!isOnline) {
				var extname = obj.ExtName;
				// bmp、jpg、jpeg、png、gif
				if (extname === ".jpg" || extname === ".jpeg" || extname === ".bmp" || extname === ".gif ") {
					var imageBrowser = api.require('imageBrowser');
					imageBrowser.openImages({
						imageUrls : [obj.PATH],
						showList : false
					});
				} else if (extname === ".mpeg" || extname === ".avi" || extname === ".mpg" || extname === ".mp4" || extname === ".3gp") {
					var videoPlayer = api.require('videoPlayer');
					videoPlayer.play({
						path : obj.PATH, //（可选项）字符串类型；文档的路径，支持网络和本地（fs://）路径；默认：未传值时不播放
						autoPlay : true //（可选项）布尔类型；打开时是否自动播放；默认：true（自动播放）
					}, function(ret, err) {
						console.log(JSON.stringify(ret));
					});
				} else if (extname === ".pdf") {
					//打开pdf文件
					var pdfReader = api.require('pdfReader');
					pdfReader.open({
						path : obj.PATH
					});
				} else {
					this.$Message.warning("暂不支持打开该类型文件！");
				}
			} else {
				this.visible2 = true;
				this.iframeUrl = MultiMediaServUrl + '/Page/MultiMediaImage.aspx?Guid=' + obj.FILEINFOGUID + '&webform=true';
			}
		},
		//选择
		selected : function(item, index, bo) {
			this.selectedItem = item;
			this.selectedIndex = index;
			this.itemisshow[index] = bo !== undefined ? bo : !this.itemisshow[index];
			var a = [].concat(this.itemisshow);
			this.itemisshow = a;
		}
	},
	template : '<div style="padding:10px;">' + '	<ul class="list-group" v-for="(item,index) in fordata">' + '		<li class="list-group-item list-group-item-first" v-on:click="selected(item,index)">' + '           <i class="ivu-icon" style="font-size:24px;" :class="{\' ivu-icon-android-arrow-dropright \':itemisshow[index]!==true,\' ivu-icon-android-arrow-dropdown \':itemisshow[index]===true}"></i>' + '			<span style="font-weight:bold;font-size:16px;position:relative;top:-4px;">{{item.typeName}}</span>' + '			<span v-on:click="upload(item)" style="position:absolute;top:6px;right:10px;">' + '				<Icon type="ios-plus-outline" style="font-size:32px;"></Icon>' + '			</span>' + '		</li>' + '		<li class="list-group-item" v-if="itemisshow[index]===true" v-for="list in item.children">' + '			<span>{{list.FILENAME}}</span>' + '			<div class="see-delete">' + '				<span style="margin-right:10px;" v-on:click="previewOne(list)"><Icon type="eye"></Icon></span>' + '				<span v-on:click="deleteOne(list)"><Icon type="close"></Icon></span>' + '			</div>' + '		</li>' + '	</ul>' + '	<Modal v-model="visible2" width="100%" title="预览" class="previewStyle">' + '	  <div class="pic_preview">' + '		<iframe :src="iframeUrl" frameborder="0" scrolling="yes" :style="frameStyle"></iframe>' + '	  </div>' + '		<div slot="footer"></div>' + '	</Modal>' + '	<Modal v-model="visible" title="添加多媒体">' + '		<div class="model_vedio">' + '			<ul>' + '				<li v-on:click="getAlbumPic" v-show="imageType">' + '					<Icon type="images"></Icon>' + '					<p style="text-align:center">相册</p>' + '				</li>' + '				<li v-on:click="getCameraPic" v-show="imageType">' + '					<Icon type="ios-camera"></Icon>' + '					<p style="text-align:center">拍照</p>' + '				</li>' + '				<li v-on:click="getAlbumVideo" v-show="videoType">' + '					<Icon type="social-youtube-outline"></Icon>' + '					<p style="text-align:center">视频</p>' + '				</li>' + '				<li v-on:click="getCameraVideo" v-show="videoType">' + '					<Icon type="videocamera"></Icon>' + '					<p style="text-align:center">摄像</p>' + '				</li>' + '				<li v-on:click="getFile" v-show="isfile">' + '					<Icon type="ios-folder-outline"></Icon>' + '					<p style="text-align:center">文件</p>' + '				</li>' + '			</ul>' + '		</div>' + '		<div slot="footer"></div>' + '	</Modal>' + '   <div class="bcCover" v-show="circlePercent" style="position:absolute;top: 0;left: 0;width:100%;height: 100%;z-index: 10000;background: #000;opacity: 0.8;">' + '		    <div class="circle" style="position: absolute;top: 35%;left: 30%;z-index: 100000;">' + '				  <i-circle :percent="percent">' + '				      <span class="demo-i-circle-inner" style="font-size:24px;color:#fff;">{{percent}}%</span>' + '			      </i-circle>' + '			</div>' + '    </div>' + '</div>'

});

