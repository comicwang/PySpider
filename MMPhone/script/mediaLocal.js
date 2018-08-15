(function(window) {
	var mediaDTO = {
		FILEINFOGUID : null,
		BUSSNISSFILEINFOGUID : null,
		FILENAME : null,
		ExtName : null,
		TYPECODE : null,
		TYPENAME : null,
		SIZE : null,
		PATH : null,
	};

	var _tabname = 'Attachment', _primaryKey = 'FILEINFOGUID';

	var d = {};

	d.dto = mediaDTO;

	/*
	 *  初 始化表
	 */
	d.initTable = function() {
		$db.initTable(_tabname, mediaDTO, function(a) {
			toast( a ? '初始化表成功' : '初始化表失败');
		});
	};

	/*
	 *  查询
	 */
	d.select = function(key, fkey, TypeCode, callback) {
		var condition = {};
		if (!!key) {
			condition.FILEINFOGUID = key;
		}
		if (!!fkey) {
			condition.BUSSNISSFILEINFOGUID = fkey;
		}
		if (!!TypeCode) {
			condition.TYPECODE = TypeCode;
		}

		$db.select(_tabname, condition, function(ret, err) {
			if (ret.status)
				callback(ret.data);
		});
	};

	/*
	 *  添加
	 */
	d.add = function(input, callback) {

		//		input.isnew = 1;//区别于老数据
		//		input.status = 'A';
		$db.add(_tabname, input, callback);
	};

	/*
	*  数据同步添加
	*/
	//	d.addsyn = function(input, callback) {
	//		//console.log(JSON.stringify(input));
	//		input.isnew = 0;//老数据
	//		$db.add(_tabname, input, callback);
	//	};

	d.del = function(input, callback) {
		//		if(input.isnew==1){
		//console.log(JSON.stringify(input));
		$db.del(_tabname, _primaryKey, input.FILEINFOGUID, callback);
		//		}else{
		//			input.status = 'D';
		//			//console.log('d');
		//			$db.update(_tabname, input, _primaryKey, callback);
		//		}
	};

	window.$mediaLocal = d;
})(window);
