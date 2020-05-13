let mongodb = require('mongodb');
let mongoClient = mongodb.MongoClient;
let url = "mongodb://localhost:27017";

const users = [
    {name: "Dima", surname: "Ivanenko", patronymic: "Petrov", email: "dima@ivanov.com"},
    {name: "Ira", surname: "Cold", patronymic: "Sergiivna", email: "ira@ivanov.com"},
    {name: "Julia", surname: "Ivanqqov2", patronymic: "Ivanqqov", email: "j@ivanov.com"},
    {name: "KryJulia3", surname: "Ivanqqov3", patronymic: "Ivanqqov", email: "3julia@ivanov.com"},
    {name: "KryJulia4", surname: "Ivanqqov4", patronymic: "Ivanqqov", email: "4julia@ivanov.com"},
];


function getAllTargets() {
    let db;
    return mongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then((client) => {
            console.log("Connected successfully to server");
            db = client.db("targetsDB");
            // db.collection("users").remove({});
            // db.collection("users").insertMany(users, function (err, results) {
            //     console.log(results);
            //     client.close();
            // });
            return db.collection("users").find().toArray();
        })
        .then(function (results) {
                let values = [];
                if (results) {
                    console.log("RESULTS length - " + results.length);
                    for (let i = 0; i < results.length; ++i) {
                        let person = {
                            name: results[i].name,
                            patronymic: results[i].patronymic,
                            surname: results[i].surname,
                            email: results[i].email
                        };
                        values.push(person);
                    }
                }
                console.log("Values -");
                console.log(values);
                return values;
            }
        )
        .catch(err => {
            console.log(err);
        });
}


function deleteTarget(surname, name, patronymic, email) {
    console.log("lets delete - " + surname + " " + name + " " + patronymic + " " + email);
    let db;
    mongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then((client) => {
                console.log("Connected successfully to server");
                db = client.db("targetsDB");
                let myquery = {surname: surname, name: name, patronymic: patronymic, email: email};
                db.collection("users").deleteOne(myquery, function (err, obj) {
                    if (err) throw err;
                    console.log("Person " + surname + " " + name + " " + patronymic + " " + email + " was deleted.");
                });
            }
        )
        .catch(err => {
            console.log(err);
        });
}


function addTarget(surname, name, patronymic, email) {
    console.log("lets add - " + surname + " " + name + " " + patronymic + " " + email);
    let db;
    mongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then((client) => {
                console.log("Connected successfully to server");
                db = client.db("targetsDB");
                let myquery = {surname: surname, name: name, patronymic: patronymic, email: email};
                db.collection("users").insertOne(myquery, function (err, obj) {
                    if (err) throw err;
                    console.log("Person " + surname + " " + name + " " + patronymic + " " + email + " was added.");
                });
            }
        )
        .catch(err => {
            console.log(err);
        });
}


function editTarget(oldSurname, oldName, oldPatronymic, oldEmail, surname, name, patronymic, email) {
    console.log("lets edit - " + surname + " " + name + " " + patronymic + " " + email);
    let db;
    mongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then((client) => {
                console.log("Connected successfully to server");
                db = client.db("targetsDB");
                let myQuery = {surname: oldSurname, name: oldName, patronymic: oldPatronymic, email: oldEmail};
                let newVal = {$set: {surname: surname, name: name, patronymic: patronymic, email: email}};
                console.log("oldSurname " + oldSurname);
                console.log("oldName " + oldName);
                console.log("oldPatronymic " + oldPatronymic);
                console.log("oldEmail " + oldEmail);
                db.collection("users").updateOne(myQuery, newVal, function (err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                });
            }
        )
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    getAllTargets, deleteTarget, addTarget, editTarget,
};