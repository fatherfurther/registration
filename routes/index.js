var express = require('express');
var router = express.Router();
var moment = require('moment'); // 追加
var connection = require('../mysqlConnection'); // 追加

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM boards';
  connection.query(query, function(err, rows) {
    console.log(rows);
    res.render('index', {
      title: 'はじめてのNode.js',
      boardList: rows
    });
  });
});

router.post('/', function(req, res, next) {
  var title = req.body.title;
  var userId = req.session.user_id? req.session.user_id: 0; // 追加
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss'); // 追加
  var query = 'INSERT INTO boards (user_id, title, created_at) VALUES ("' + userId + '", ' + '"' + title + '", ' + '"' + createdAt + '")'; // 変更
  connection.query(query, function(err, rows) {
    res.redirect('/');
  });
});

module.exports = router;
