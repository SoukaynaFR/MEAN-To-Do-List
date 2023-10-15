var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

db = 'mongodb://127.0.0.1:27017/todos';


const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const TodoModel = mongoose.model('tasks', todoSchema);

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


// Get tasks
router.get('/getTasks', (req, res, next) => {
  TodoModel.find({}).then(function (tasks) {
    res.json(tasks)
  }).catch(function (err) {
    console.log(err);
  });
});




// Get task by ID
router.get('/getTasks/:id', (req, res, next) => {
  TodoModel.findOne({
    _id: req.params.id
  }).then(function (task) {
    res.json(task)
  }).catch(function (err) {
    console.log(err);
  });
});


// Save task
router.post('/task', function (req, res, next) {
  var task = req.body;
  if (!task.text || !(task.completed + '')) {
    res.status(400);
    res.json({
      "error": "invalid data"
    })
  } else
    db.save(task, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
});

// update task
router.put('/task/:id', function (req, res, next) {
  var task = req.body;
  var upObj = {};

  if (task.completed) {
    upObj.completed = task.completed;
  }

  if (task.text) {
    upObj.text = task.text;
  }

  if (!upObj) {
    res.status(400);
    res.json({
      "error": "invalid data"

    })
  } else {
    db.todos.update({
      _id: req.params.id
    }, upObj, {}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
    )
  }

});



// delete task

router.delete('/task/:id', function (req, res, next) {


  db.todos.remove({
    _id: req.params.id
  }, '', function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  }
  )
}

);


module.exports = router;








