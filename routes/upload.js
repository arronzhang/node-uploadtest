/*
 * upload
 */

//�Զ��������

var tempPath = __dirname + '/../upload_cache'

//----ϵͳ������

var fs = require('fs'),
        sys = require('util'),
        path = require('path');
 

//----���߶�����
// ��������Ŀ¼ 
var mkdirs = module.exports.mkdirs = function(dirpath) {
    //�����ھʹ���һ��
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
		//�����Ŀ¼
		if (path.basename(files[i].name) == ".") {
			//ɾ��Ŀ¼����ʱ�ļ�
			fs.unlinkSync(files[i].path);
		} else {
			//����
			fs.renameSync(files[i].path, tempPath + "/" + files[i].name)
		}
	}
	//��ת����ҳ
	//req.flash('info', '%s files have been uploaded.', files.length);
	//res.send('upload successfully!');
	//req.session.success = "ok";
	//res.redirect('/');
	res.render('index', { title: 'Upload Dir', msg: "ok" });
};
