/*
 * upload
 */

//自定义参数区

var tempPath = __dirname + '/../upload_cache'

//----系统定义区

var fs = require('fs'),
        sys = require('util'),
        path = require('path');
 

//----工具定义区
// 创建所有目录 
var mkdirs = module.exports.mkdirs = function(dirpath) {
    //不存在就创建一个
    if (!( fs.existsSync ? fs.existsSync(dirpath) : path.existsSync(dirpath) )) {
        mkdirs(path.dirname(dirpath));
        fs.mkdirSync(dirpath);
        //console.log("mkdir" + dirpath);
    }
};

 

exports.upload = function(req, res) {
	var files = req.files.file_input;
	//console.log(files);
	for (var i in files) {
		mkdirs(tempPath + "/" + path.dirname(files[i].name));
		//如果是目录
		if (path.basename(files[i].name) == ".") {
			//删除目录的临时文件
			fs.unlinkSync(files[i].path);
		} else {
			//覆盖
			fs.renameSync(files[i].path, tempPath + "/" + files[i].name)
		}
	}
	//跳转回主页
	//req.flash('info', '%s files have been uploaded.', files.length);
	//res.send('upload successfully!');
	//req.session.success = "ok";
	//res.redirect('/');
	res.render('index', { title: 'Upload Dir', msg: "ok" });
};
