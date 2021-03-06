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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const express_sse_middleware_1 = __importDefault(require("express-sse-middleware")); // tslint:disable-line
const app = express_1.default();
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(express_sse_middleware_1.default);
const source$ = new rxjs_1.Subject();
source$.subscribe(console.log);
app.get('/demo', (req, res) => {
    const sse = res.sse();
    var testjson = '[{"userId":1,"userFirstName":"Isaac","userLastName":"Newton"},{"userId":2,"userFirstName":"Albert","userLastName":"Einstein"}]';
    console.log('get1 sse :' + sse);
    const conn$ = rxjs_1.interval(1000)
        .pipe(operators_1.map(String))
        .subscribe(
    //sse.send.bind(sse)
    (ev) => {
        console.log('get1 enew Date():' + new Date());
        console.log('testjson:' + testjson);
        // sse.send(new Date().toLocaleString()+ '/n' +testjson);
        sse.send(testjson);
    });
    console.log('get1 sse :' + sse);
    req.on('close', () => {
        conn$.unsubscribe();
    });
});
app.get('/sse', (req, res) => {
    const sse = res.sse();
    console.log('get2 sse :' + sse);
    const sub$ = source$
        .pipe(operators_1.filter((ev) => true))
        .subscribe((ev) => {
        console.log('get2 ev.text:' + ev.text);
        sse.send(ev.text);
    });
    // connection keep alive
    const conn$ = rxjs_1.interval(10000)
        .subscribe(sse.keepAlive.bind(sse));
    req.on('close', () => {
        sub$.unsubscribe();
        conn$.unsubscribe();
    });
});
app.post('/message', (req, res) => {
    const param = req.body;
    console.log('post req.body:' + req.body);
    source$.next(param);
    res.write('test1');
    res.json({ success: true }).end();
});
app.use('/', express_1.default.static('./static'));
app.listen(process.env.PORT || 3000, () => {
    console.log('started!');
});
//# sourceMappingURL=index.js.map