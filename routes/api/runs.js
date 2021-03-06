const express = require("express");
const router = express.Router();
let Run = require('../../models/Run');

router.route('/').get((req, res) => {
  Run.find()
    .then(runs => res.json(runs))
    .catch(err => res.status(400).json('Failure! Error: ' + err));
});

router.route('/add').post((req, res) => {
  const distance = Number(req.body.distance);
  const time = Number(req.body.time);
  const speed = Number(((req.body.distance) / (req.body.time) * 60).toFixed(2))
  const location = req.body.location;
  const date = Date.parse(req.body.date);

  const newRun = new Run({
    distance,
    time,
    speed,
    location,
    date,
  });

  newRun.save()
  .then(() => res.json('New run added!'))
  .catch(err => res.status(400).json('Oh noo! Error: ' + err));
});


router.route('/:id').get((req, res) => {
  Run.findById(req.params.id)
    .then(run => res.json(run))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Run.findByIdAndDelete(req.params.id)
    .then(() => res.json('Run deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Run.findById(req.params.id)
    .then(run => {
      run.distance = Number(req.body.distance);
      run.time = Number(req.body.time);
      run.speed =  Number(((req.body.distance) / (req.body.time) * 60).toFixed(2));
      run.location = req.body.location;
      run.date = Date.parse(req.body.date);

      run.save()
        .then(() => res.json('Run updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;