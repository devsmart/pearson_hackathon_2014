/*
 * Serve JSON to our AngularJS client
 */
var db = require("./db/userDAL");
exports.config = function (req, res) {
  //  db.populateDB();
    db.getVLab();
  res.json({
      id:1,
  	  name: 'Bob'
  });
};
exports.GetAllVlabs = function (req, res) {
    //db.populateDB();
  res.json({
  	vLabs: [{id:1,name:'vLab1'},{id:1,name:'vLab2'},{id:1,name:'vLab3'}]
  });
};

exports.levels = function (req, res) {
    //db.populateDB();
    //var vLabs = db.findAllVLabData(function (data) {
    //    //console.log(data);
    //    //res = { vLab: data[0] };
    //    res.json({
    //        levels: data
    //    });
    //});
  res.json({
  	levels: [{id:1,name:'Beginner'},{id:1,name:'Intermediate'},{id:1,name:'Expert'}]
  });
};

exports.userLevel = function (req, res) {
  var userId = req.params.userId;
  var vlabId = req.params.vlabId;
  res.json({
  	userLevel: {id:1, name:'Bob', nextLevelName : 1, nextLevelNameId:1 } 
  });
};

exports.labLevelStory = function (req, res) {
  var levelId = req.params.levelId;
  var vlabId = req.params.vlabId;
  res.json({
  	labLevel: {id:1, storyLine:'This is a story line got from API', vlabId:vlabId} 
  });
};

exports.labInfo = function (req, res) {
  var levelId = req.params.levelId;
  var vlabId = req.params.vlabId;
  console.log("lab id "+vlabId);
  var vLabs = db.findVLabData(vlabId, function (data) {
      //console.log(data);
      //res = { vLab: data[0] };
      res.json({
          vLab: data
      });
  });
    /*
  var vLabs = [
                {
                    id: 1,
                    name: "Lab 1",
                    vLabLevels: [{level:1, name: 'level 1',formula:"x=y+z",storyLine:"place holder for the storyline"}],
                    vLabItems: [
                        { id: 1, itemName: "Test tube", imgUrl: "./images/tt.png" },
                        { id: 2, itemName: "Hydochloric acid",imgUrl: "./images/tt.png" },
                        { id: 3, itemName: "Magnesium strip", imgUrl: "./images/tt.png" },
                        { id: 4, itemName: "water beaker", imgUrl: "./images/tt.png" },
                        { id: 5, itemName: "Rubber tube", imgUrl: "./images/tt.png" },
                        { id: 6, itemName: "Glass tube", imgUrl: "./images/tt.png" },
                        { id: 7, itemName: "water beaker", imgUrl: "./images/tt.png" },
                        { id: 8, itemName: "thistle tube", imgUrl: "./images/tt.png" },
                        { id: 9, itemName: "Sodium cube", imgUrl: "./images/tt.png" },
                        { id: 10, itemName: "Sodium Hydroxide", imgUrl: "./images/tt.png" }
                        
                    ]
                }
            ];

  res.json({
  	vLab: vLabs[0]
  });*/
};
