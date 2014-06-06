var config = require("../../config");

var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server(config.App.mongo.server, config.App.mongo.port));
mongoClient.open(function (err, mongoClient) {
    db = mongoClient.db("hack2014");
    db.collection('testcollection', { strict: true }, function (err, collection) {
        if (err) {
            console.log("The 'employees' collection doesn't exist. Creating it with sample data...");
           // populateDB();
        }
    });
});

findAllUsers = function (callback) {
    var collection = db.collection('user');
    collection.find().toArray(function (err, items) {
        callback(items);
    });
    //console.log("user count"+items.length);
}
findAllVLabs = function (callback) {
    var collection = db.collection('vLab');
    collection.find().toArray(function (err, items) {
       return callback(items);
    });
    //console.log("user count"+items.length);
}

exports.findAllVLabData = function (callback) {
    var collection = db.collection('vLab');
    collection.find().toArray(function (err, items) {
        return callback(items);
    });
    //console.log("user count"+items.length);
}

exports.findVLabData = function (labId,callback) {
    var collection = db.collection('vLab');
    collection.findOne({ id: parseInt(labId) },function (err, items) {
       // console.log(items);
        return callback(items);
    });
    //console.log("user count"+items.length);
}

exports.populateDB = function () {

    console.log("Populating hack2014 database...");
    var collection = db.collection('user');
    var count = findAllUsers(function (items) {
        if (items.length < 1) {
            var users = [
                { id: 1, name: "Shashin" },
                { id: 2, name: "Harshana" }
            ]
            collection.insert(users, { safe: true }, function (err, result) { });
            console.log("items inserted");
        }
        else {
            console.log("items exsist...");
            console.log("item count " + items.length);
        }
    });

    collection = db.collection('vLab');
    var count = findAllVLabs(function (items) {
        if (items.length < 1) {
            var vLabs = [
                {
                    id: 1,
                    name: "Lab 1",
                    vLabLevels: [{level:1, name:"level 1",formula:"x=y+z",storyLine:"place holder for the storyline"}],
                    vLabItems: [
                        { id: 1, itemName: "Test tube", imgUrl: "http://localhost:3000/img/tt.png" },                        
                        { id: 2, itemName: "water beaker", imgUrl: "http://localhost:3000/img/water.png" },
                        { id: 3, itemName: "Rubber tube", imgUrl: "http://localhost:3000/img/rubber.png" },
                        { id: 4, itemName: "Glass tube", imgUrl: "http://localhost:3000/img/glass.png" },
                        { id: 5, itemName: "thistle tube", imgUrl: "http://localhost:3000/img/thistle.png" }
                                
                    ],
                    chemicalItems: [
                       { id: 1, itemName: "Hydochloric acid", imgUrl: "http://localhost:3000/img/hcl.png" },
                        { id: 2, itemName: "Magnesium strip", imgUrl: "http://localhost:3000/img/mg.png" },
                        { id: 3, itemName: "Sodium cube", imgUrl: "http://localhost:3000/img/sodium.png" },
                        { id: 4, itemName: "Sodium Hydroxide", imgUrl: "http://localhost:3000/img/naoh.png" }
                    ]
                }
            ]
            collection.insert(vLabs, { safe: true }, function (err, result) { });
            console.log("items inserted");
        }
        else {
            console.log("vLab items exsist...");
            console.log("item count " + items.length);
        }
    });
    
    
};

exports.findAllUsers = function (req, res) {
    var name = req.query["name"];
    db.collection('user', function (err, collection) {
        if (name) {
            collection.find({ "name": new RegExp(name, "i") }).toArray(function (err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function (err, items) {
                res.jsonp(items);
            });
        }
    });
};

exports.getVLab = function (){
    var count = findAllVLabs(function (items) {
        for (var i = 0; i < items.length; i++) {
            console.log(items[i].id);
            console.log(items[i].name);
            //console.log(items[i].vLabItems[0].itemName);
            for (var j = 0; j < items[i].vLabItems.length; j++) {
                console.log("lab item  " + items[i].vLabItems[j].itemName);
            }
        }
        
    });
}
