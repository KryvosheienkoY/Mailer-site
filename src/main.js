const express = require('express');
const app = express();
const tg = require('./targets');
const letters = require('./letters');
const mail = require('./mail');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './src/views');


app.get('/', (req, res) => {
    tg.getAllTargets().then(targets => {
        res.render('receivers', { targets });
    });
});

app.get('/letters', (req, res) => {
    res.render('letters', { letters: letters.getAll() });
});

app.post('/letter-send', (req, res) => {
    const body = req.body;
    tg.getAllTargets().then(targets => {
        targets.forEach(target => {
            mail.send(target.email, body.subject, body.text);
        });
    });
    res.render('content', {content: "Letters are being sent!"})
});


app.post('/delete_post', (req, res) => {
    const body = req.body;
    const info = body.removeBtn.split(" ");
    console.log("info - ");
    console.log(info);
    tg.deleteTarget(info[0],info[1],info[2],info[3]);
    res.redirect('/');
});


app.post('/add_post', (req, res) => {
    const body = req.body;
    tg.addTarget(body.surname, body.name, body.patronymic, body.email);
    res.redirect('/');
});


app.post('/edit_post', (req, res) => {
    const body = req.body;
    const info = body.saveButton.split(" ");
    tg.editTarget(info[0],info[1],info[2],info[3],body.surname, body.name, body.patronymic, body.email);
    res.redirect('/');
});


app.use('/', express.static(__dirname + '/../public'));
app.listen(4444);