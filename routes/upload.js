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
    if (!fs.existsSync(dirpath)) {
        mkdirs(path.dirname(dirpath));
        fs.mkdirSync(dirpath);
        //console.log("mkdir" + dirpath);
    }
};

 

exports.upload = function(req, res) {
    var files = req.files.file_input;
    //console.log(files);
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        for (i in files) {
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
        res.redirect('/');
    }
};