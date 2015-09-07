# lodash-setall

Uses lodash get/set pathing to map values from one object into another:

```
var _setAll = require('lodash-setall');

var origin = {
  'b': 'something',
  'c': { d: [0,1,2,3,4]},
  'd': { 'foo': 'bar' }
};

var map = {
  'a':'b',
  'b':'c.d.2',
  'c.a':'d'
};

var result = _setAll({}, map, origin);
// result = {
//   'a': 'something',
//   'b': 2,
//   'c': { 'a': { 'foo': 'bar'} }
//
```

For details on how the pathing works, see the documentation for [_.get](https://lodash.com/docs#get) and [_.set](https://lodash.com/docs#set).
