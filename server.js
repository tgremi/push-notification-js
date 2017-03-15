/*  */

var express = require('express')
    , app = express()
    , server = require('http').createServer(app).listen(4555)
    , io = require('socket.io').listen(server)
    , bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
var router = express.Router();
/* Chamada do socket */
app.use(send);
app.use('/api', router);
router.route('/notification')
    .get(function (req, res) {
        /* Ao acessar o caminho definido na API "http://localhost/api/notification*/
        res.json({ message: "Testing route" })
    })
app.listen(port);
console.log('Port connected ' + port);

/* Emite a notificação recebida através da Rota Api, utilizando um Middleware*/
var send = function (req, res, next) {
    var notification = req.query.notificacao || '';
    /* Se a mensagem for diferente de vazia emito ao cliente*/
    if (notification != '') {
        io.emit('notificacao', notification);
        next();
    } else {
        next();
    }
}
