/**
 * Module dependencies.
 */

var express = require('express')
        , routes = require('./routes')
        , http = require('http');

var app = express();

//配置中间件以及环境
app.configure(function() {
    app.set('port', process.env.PORT || 3000);//设置端口号
    app.set('views', __dirname + '/views');//设置模板路径，比如index.jade
    app.set('view engine', 'jade');//配置模板解析引擎
    app.use(express.favicon());
    app.use(express.logger('dev'));
    //app.use(express.bodyParser());//将client提交过来的post请求放入request.body中
    app.use(express.bodyParser({ uploadDir: __dirname + '/upload_cache' }));
    app.use(express.methodOverride());//伪装PUT,DELETE请求
    app.use(app.router);//设置路由中间件，可有可无
    app.use(express.static(__dirname + '/public'));//设置静态文件路径

});

//配置调试环境，需要显示异常
app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//路由
app.get('/', routes.index);
app.post('/upload', require("./routes/upload.js").upload);


http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});