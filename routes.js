const express = require("express");
const router = new express.Router();
const items = require("./fakeDb");


//////// Routes ///////

router.get('/', function(req, res) {
  return res.json(items);
})

router.post('/', function(req, res) {
  items.push(req.body);
  return res.json({'added': req.body})
})

router.get('/:name', function(req, res) {
  let result = '';
  for (let item of items) {
    if (item.name === req.body.name) {
      result = item;
      break;
    }
  }
  return res.json(result)
})

router.patch('/:name', function(req, res) {

  let pathName = req.params.name
  // let pathName = req._parsedUrl.path.slice(1);
  let patchItem;
  for (let item of items) {
    if (item.name === pathName) {
      patchItem = item;
      break;
    }
  }
  
  items[items.indexOf(patchItem)] = req.body;
  return res.json({'updated': req.body})
})

router.delete('/:name', function(req, res) {

  let deleteItem;
  for (let item of items) {
    if (item.name === req.body.name) {
      deleteItem = item;
      break;
    }
  }

  items.splice(items.indexOf(deleteItem), 1)
  return res.json({ message: 'Deleted' });
})

module.exports = router;