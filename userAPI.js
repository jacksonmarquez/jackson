let express = require("express");
let router = express.Router();
let database = require("../database.js");
let StoryInfoModel = require("../schema/storyInfo.js");
let UserInfoModel = require("../schema/userInfo.js");

var bodyParser = require("body-parser");


router.delete("/", function(req, res, next) {
  console.log(req.body.userName);
      UserInfoModel.findOneAndUpdate({
      username: req.body.userName  // search query
    },
    {
      score: req.body.userScore   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })
});



router.put("/", function(req, res, next) {
  console.log("put received");
  let newUser = new UserInfoModel({
    username: req.body.newUserName,
    score: 0
  });
  newUser.save()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
});

// const app = express()
// parse application/x-www-form-urlencoded  (Copied from body-parser github)
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())

// const port = 3000

router.post("/", function(req, res, next) {
  console.log("post received");
  // let UserVerification = new UserInfoModel({
  //   username: req.body.userName
  // })
  UserInfoModel.find({
    username: req.body.userName // search query
  })
    .then(doc => {
      console.log("Saving Item in Post");
      console.log(doc.score);
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
    });
});

// router.put('/', function(req, res, next) {
//   console.log("doing a put")
//   let story = new StoryInfoModel({
// 		sentences: req.body.sentences,
// 	  name: req.body.name,
// 	  lifeTime: req.body.lifeTime,
// 	  story: req.body.story,
// 	  recentSentence: req.body.recentSentence,
// 	  storyID: req.body.storyID,
//   })
//
//   story.save()
//      .then(doc => {
//        console.log(doc)
//        res.send('saved');
//      })
//      .catch(err => {
//        console.error(err)
//      })
//
// })

module.exports = router;
