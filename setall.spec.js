var data_driven = require('data-driven');
var mocha = require('mocha');
var should = require('should');

var setAll = require('./index');

describe('setAll', function() {
    var now = new Date();

    data_driven([
            {
                label: 'gets/sets simple path',
                dest: {},
                paths: {'a':'b'},
                origin: {b:100},
                expected: {a:100}
            },
            {
                label: 'gets complex path',
                dest: {},
                paths: {'a':'b.c'},
                origin: {b:{c: "something"}},
                expected: {a:"something"}
            },
            {
                label: 'sets complex path',
                dest: {},
                paths: {'a.c':'b'},
                origin: {b:100},
                expected: {a:{c:100}}
            },
            {
                label: 'gets/sets complex object',
                dest: {},
                paths: {'a':'b'},
                origin: {b:now},
                expected: {a:now}
            },
            {
                label: 'gets/sets array element',
                dest: {},
                paths: {'a':'b.1'},
                origin: {b:[0,1,2]},
                expected: {a:1}
            },
            {
                label: 'gets/sets multiple paths',
                dest: {},
                paths: {
                    'a.c':'b',
                    'b':'c'
                },
                origin: {b:100, c:'something'},
                expected: {a:{c:100}, b:'something'}
            },
            {
                label: 'gets/sets duplicate paths',
                dest: {},
                paths: {
                    'a.c':'b',
                    'a':'c'
                },
                origin: {b:100, c:'something'},
                expected: {a:'something'}
            },
            {
                label: 'overrides existing',
                dest: {a:100},
                paths: {'a':'c'},
                origin: {c:'something'},
                expected: {a:'something'}
            },
            {
                label: 'null path',
                dest: {a:100},
                paths: {'a':null},
                origin: {c:'something'},
                expected: {a:undefined}
            },
            {
                label: 'missing path',
                dest: {a:100},
                paths: {'a':'b.c'},
                origin: {c:'something'},
                expected: {a:undefined}
            },
            {
                label: 'undefined destination',
                dest: undefined,
                paths: {'a':'b'},
                origin: {b:100},
                expected: {a:100}
            },
            {
                label: 'null destination',
                dest: null,
                paths: {'a':'b'},
                origin: {b:100},
                expected: {a:100}
            },
            {
                label: 'null paths',
                dest: {},
                paths: null,
                origin: {c:'something'},
                expected: {}
            },
            {
                label: 'null origin',
                dest: {},
                paths: {'a':'b'},
                origin: null,
                expected: {'a': undefined}
            },
        ],
      function() {
          it('{label}', function (context) {
              var actual = setAll(context.origin, context.paths, context.dest);
              if (context.expected) {
                  actual.should.eql(context.expected);
              } else {
                  should.equal(actual, context.expected);
              }
          });
      }
    );

    it('mutates destination object', function () {
        var origin = {a:100};
        var actual = setAll({c:'something'}, {a:'c'}, origin);
        actual.should.equal(origin);
    });

    it('copies object references', function () {
        var origin = {
            a: {
                b: 'something'
            }
        };
        var actual = setAll(origin, {a:'a'}, {});
        origin.a.b = 'something else';

        actual.should.eql({
            a: {
                b: 'something else'
            }
        });
    });
});
