let express = require("express");
let router = express.Router();
let database = require("../database.js");
let StoryInfoModel = require("../schema/storyInfo.js");
let UserInfoModel = require("../schema/userInfo.js");

var bodyParser = require("body-parser");

// const app = express()
// parse application/x-www-form-urlencoded  (Copied from body-parser github)
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())

// const port = 3000

// router.get("/", function(req, res, next) {
//   console.log("get received");
//   let newStory = new StoryInfoModel({
//     name: "New Story"
//   });
//   newStory.save()
//     .then(doc => {
//       res.send(doc);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

router.get("/", function(req, res, next) {
  console.log("doing a get");
  StoryInfoModel.find({
    name: "Story00"
  })
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
    });
});

router.delete("/", function(req, res, next) {
  StoryInfoModel.findOneAndUpdate(
    {
      name: req.body.nameOfStory // search query
    },
    {
      story: "" // field:values to update
    },
    {
      new: true, // return updated doc
      runValidators: true // validate before update
    }
  )
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.error(err);
    });
});

router.post("/", function(req, res, next) {
  console.log(req.body.storyBody);
  StoryInfoModel.findOneAndUpdate(
    {
      name: req.body.storyName // search query
    },
    {
      story: req.body.storyBody // field:values to update
    },
    {
      new: true, // return updated doc
      runValidators: true // validate before update
    }
  )
    .then(doc => {
      console.log(doc);
    })
    .catch(err => {
      console.error(err);
    });
});

router.put("/", function(req, res, next) {
  console.log("put received");
  let newSentence = new StoryInfoModel({
    recentSentence: req.body.recentSentence,
    storyID: req.body.storyID
  });
  newSentence
    .save()
    .then(doc => {
      res.send("Sentence Saved");
    })
    .then(doc => {
      console.log("Sentence Saved");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
