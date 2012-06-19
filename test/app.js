
var app = require('../app')
  , request = require('./support/http')
  , pa = 'test/'
  , fs = require('fs')
  , path = require("path");

var existsSync = fs.existsSync || path.existsSync;

var path1 = "fixtures/number-1.png"
  , path2 = "fixtures/number-2.png"
  , img1 = fs.readFileSync(pa + path1)
  , img2 = fs.readFileSync(pa + path2)
  , boundary = '------expressmultipart';

describe('upload test', function(){
  describe('GET /', function(){
    it('should respond with a form', function(done){
      request(app)
        .get('/')
        .expect(/<form/, done)
    })
  })

  describe('POST /', function(){
    it('should upload files as multipart', function(done){
      request(app)
        .post('/')
        .set('content-type','multipart/form-data; boundary='+boundary.slice(2))
        .write(boundary + '\r\n')
        .write('Content-Disposition: form-data; name="title"\r\n')
        .write('\r\n')
        .write('grey\r\n')
        .write(boundary + '\r\n')
        .write('Content-Disposition: form-data; name="file_input"; filename="'+path1+'"\r\n')
        .write('Content-Type: image/png\r\n')
        .write('\r\n')
        .write(img1+'\r\n')
        .write(boundary+'\r\n')
        .write('Content-Disposition: form-data; name="file_input"; filename="'+path2+'"\r\n')
        .write('Content-Type: image/png\r\n')
        .write('\r\n')
        .write(img2+'\r\n')
        .write(boundary+'--\r\n')
        .end(function(res){
          res.body.should.match(/alert/)
		  existsSync("upload_cache/" + path1).should.ok;
		  existsSync("upload_cache/" + path2).should.ok;
          done()
        })
    })
  })
})
