"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const path = __importStar(require("path"));
class Main {
    constructor() {
        // httpサーバーを設定する
        const server = http.createServer((request, response) => this.requestHandler(request, response));
        // サーバーを起動してリクエストを待ち受け状態にする
        server.listen(3000, () => console.log('Listening on http://localhost:3000/'));
    }
    /*
    * サーバーにリクエストがあった時に実行される関数
    */
    requestHandler(request, response) {
        response.writeHead(200, { 'Content-Type': 'text/html',
            'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*' });
        var dateTime = new Date();
        console.log('dateTime' + dateTime);
        var reqpath = request.url;
        var dir = path.join(__dirname, '');
        //response.write('Current time1: ' + dateTime);
        //response.write('Current time2: ' + dateTime);
        response.write('<!doctype html>\n<html lang="en">\n' +
            '\n<meta charset="utf-8">\n<title>Test web page on node.js</title>\n' +
            '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' +
            '\n\n<h1>Euro 2012 teams</h1>\n' +
            '<div id="content"><p>The teams in Group D for Euro 2012 are:</p><ul><li>England</li><li>France</li><li>Sweden</li><li>Ukraine</li></ul></div>' +
            '<div id="result"></div>' +
            '\n\n');
        response.write('<script>');
        response.write(' if(typeof(EventSource) !== "undefined") {' +
            '  var source = new EventSource("https://www.w3schools.com/html/demo_sse.php");' +
            '   source.onmessage = function(event) { ' +
            '    console.debug(event.data );' +
            '    document.getElementById("result").innerHTML += event.data + "<br>" ;' +
            '            };' +
            '           } else {' +
            '    console.debug("no event" );' +
            '              document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";' +
            '                }');
        response.write('</script>');
        // console.log('reqpath : '+ reqpath);
        // if(reqpath){
        //   console.log('reqpath in if : '+ reqpath);
        //     var file = path.join(dir, reqpath.replace(/\/$/, '../index.html'));
        //     console.log('file in if : '+ file);
        //     var type = 'text/event-stream';
        //     var s = fs.createReadStream(file);
        //     s.pipe(response);
        // }
        // console.log('after'+ response.getHeaders());
        response.end();
    }
}
const main = new Main();
//# sourceMappingURL=index copy.js.map