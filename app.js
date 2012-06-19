/**
 * Module dependencies.
 */

var express = require('express')
        , routes = require('./routes')
        , http = require('http');

var app = express();

//�����м���Լ�����
app.configure(function() {
    app.set('port', process.env.PORT || 3000);//���ö˿ں�
    app.set('views', __dirname + '/views');//����ģ��·��������index.jade
    app.set('view engine', 'jade');//����ģ���������
    app.use(express.favicon());
    app.use(express.logger('dev'));
    //app.use(express.bodyParser());//��client�ύ������post�������request.body��
    app.use(express.bodyParser({ uploadDir: __dirname + '/upload_cache' }));
    app.use(express.methodOverride());//αװPUT,DELETE����
    app.use(app.router);//����·���м�������п���
    app.use(express.static(__dirname + '/public'));//���þ�̬�ļ�·��

});

//���õ��Ի�������Ҫ��ʾ�쳣
app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//·��
app.get('/', routes.index);
app.post('/upload', require("./routes/upload.js").upload);


http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});