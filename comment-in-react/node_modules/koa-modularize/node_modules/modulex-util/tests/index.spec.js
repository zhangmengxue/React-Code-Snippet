var util = require('../');
var expect = require('expect.js');
// es-shim bug
var ie8 = navigator.userAgent.indexOf('MSIE 8.0') !== -1;
/*jshint quotmark:false*/

describe('util', function () {
  var host = typeof window !== undefined ? window : '';
  if (!host) {
    return;
  }
  var doc = host.document;
  var web = host.setInterval;

  function fn() {
  }

  function Fn() {
  }

  describe('util.mix', function () {
    it('allow non structured deep mix', function () {
      var a = {x: 2};
      var b = {y: 2};
      a.arr = [b, b];

      (function () {
        var n = {};
        util.mix(n, a, {
          deep: true,
          structured: false
        });
        expect(n).to.eql(a);
        expect(n.arr[0]).not.to.equal(n.arr[1]);
        expect(n.arr[0]).to.eql(n.arr[1]);
      })();

      (function () {
        var n = {};
        util.mix(n, a, {
          deep: true
        });
        expect(n).to.eql(a);
        expect(n.arr[0]).to.equal(n.arr[1]);
      })();
    });

    it('can be tolerant', function () {
      util.mix({}, false);
      util.mix({}, null);
      util.mix({}, undefined);
    });

    it("works simply", function () {
      var o1 = {a: 1, b: 2},
        o2 = {a: 1, b: 2},
        o3 = {a: 1, b: 2},
      //o4 = { a: 1, b: 2 },
        o = {a: 'a', c: true};

      util.mix(o1, o);
      expect(o1.a).to.equal('a');

      // turn off override
      util.mix(o2, o, false);
      expect(o2.a).to.equal(1);

      // whitelist
      util.mix(o3, o, true, ['c']);
      expect(o3.a).to.equal(1);


      // deep object mix testcase
      var r = {
        x: 1,
        y: {
          z: 1
        },
        q: [2, 5]
      };

      util.mix(r, {
        x: 2,
        y: {
          s: 1
        },
        q: [6]
      });

      expect(r.x).to.equal(2);
      expect(r.y.s).to.equal(1);
      expect(r.y.z).to.equal(undefined);
      expect(r.q + "").to.equal([6] + "");
    });

    it('works for deep mix', function () {
      var r, r2;

      r = {
        x: 1,
        y: {
          z: 1,
          q: 4
        }
      };

      r2 = {
        x: 2,
        y: {
          z: 3
        }
      };

      r2.y.w = r2;

      util.mix(r, r2, {
        deep: true,
        whitelist: ['x', 'y', 'z', 'w']
      });

      expect(r).to.eql({
        x: 2,
        y: {
          z: 3,
          q: 4,
          w: r
        }
      });

      expect(r).to.equal(r.y.w);

      r = {
        x: 1,
        y: {
          z: 1
        },
        q: [2, 5]
      };

      util.mix(r, {
        x: 2,
        y: {
          s: 1
        },
        q: [undefined, 6]
      }, undefined, undefined, true);

      expect(r.x).to.equal(2);
      expect(r.y.s).to.equal(1);
      expect(r.y.z).to.equal(1);
      expect(r.q + "").to.equal([2, 6] + "");

      r = {
        x: 1,
        y: {
          z: 1
        },
        q: [2, 5]
      };

      util.mix(r, {
        x: 2,
        y: {
          s: 1
        },
        q: [undefined, 6]
      }, {
        deep: true
      });

      expect(r.x).to.equal(2);
      expect(r.y.s).to.equal(1);
      expect(r.y.z).to.equal(1);
      expect(r.q + "").to.equal([2, 6] + "");

      r = {
        x: 1,
        y: {
          z: 1
        },
        q: [2, 5]
      };

      util.mix(r, {
        x: 2,
        y: {
          s: 1,
          z: 2
        },
        q: [undefined, 6]
      }, {
        overwrite: false,
        deep: true
      });

      expect(r.x).to.equal(1);
      expect(r.y.s).to.equal(1);
      expect(r.y.z).to.equal(1);
      expect(r.q + "").to.equal([2, 5] + "");
    });

    it("can mix circular reference object", function () {
      var o = {};

      o.x = 1;

      o.y = {};

      o.y.z = 3;

      o.y.a = o;

      var n = {};

      util.mix(n, o, undefined, undefined, true);

      expect(n.x).to.equal(1);

      expect(n.y.z).to.equal(3);

      expect(n.y.a).to.equal(n);

      expect(n.__MIX_CIRCULAR).to.equal(undefined);
      expect(n.y.__MIX_CIRCULAR).to.equal(undefined);
    });

    it('solve JsEnumBug', function () {
      function x() {
        return 1;
      }

      var v = {
        toString: x,
        isPrototypeOf: x,
        propertyIsEnumerable: x,
        toLocaleString: x,
        valueOf: x,
        constructor: x
      };
      var t = 'hasOwnProperty';
      v[t] = x;
      var z = {};
      util.mix(z, v);
      expect(z.toString).to.equal(x);
      var fs = [], vs = [];
      util.each(v, function (v, k) {
        fs.push(k);
        if (typeof v === 'function') {
          v = v();
        }
        vs.push(v);
      });
      fs.sort();
      expect(fs).to.eql(['toString',
        'hasOwnProperty', 'isPrototypeOf',
        'propertyIsEnumerable',
        'toLocaleString',
        'valueOf',
        'constructor'].sort());
      expect(vs).to.eql([1, 1, 1, 1, 1, 1, 1]);
    });

    it('does not ignore undefined value', function () {

      var x = {
        y: undefined
      };

      var z = util.mix({}, x);

      expect(z.y).to.equal(undefined);
      expect('y' in z).to.equal(true);

    });

    it('undefined does not overrite existing property', function () {
      var v = {
        x: 1
      };

      expect(util.mix(v, {
        x: undefined
      })).to.eql({
          x: 1
        });
    });

    describe('whitelist', function () {
      it('works for deep', function () {
        var a = {};
        var b = {
          b1: 1,
          b2: {
            b22: 22
          }
        };
        util.mix(a, b, true, ["b1", "b2"], true);

        expect(a).to.eql({
          b1: 1,
          b2: {}
        });


        a = {};
        b = {
          b1: 1,
          b2: {
            b2: 22
          }
        };
        util.mix(a, b, true, ["b1", "b2"], true);

        expect(a).to.eql({
          b1: 1,
          b2: {
            b2: 22
          }
        });
      });

      it('can be a function filter child', function () {
        var a = {},
          b = {
            b1: 1,
            b2: {
              b2: 22
            }
          };
        util.mix(a, b, {
          deep: true,
          whitelist: function (name, v) {
            if (name === 'b1') {
              return v;
            }
            if (this.b1 && name === 'b2') {
              return v;
            }
            return undefined;
          }
        });

        expect(a).to.eql({
          b1: 1,
          b2: {}
        });
      });

      it('can be a function filter parent', function () {
        var a = {},
          b = {
            b1: 1,
            b2: {
              b2: 22
            }
          };
        util.mix(a, b, {
          deep: true,
          whitelist: function (name, v) {
            if (this.b1 && name === 'b2') {
              return undefined;
            }
            return v;
          }
        });

        expect(a).to.eql({
          b1: 1
        });
      });
    });
  });

  it('util.merge', function () {
    var a = {
        'bool': false,
        'num': 0,
        'nul': null,
        'undef': undefined,
        'str': 'blabber'
      },
      b = {
        'bool': 'oops',
        'num': 'oops',
        'nul': 'oops',
        'undef': 'oops',
        'str': 'oops'
      };

    var c = util.merge(a, b);

    expect(c.bool).to.equal('oops');
    expect(c.num).to.equal('oops');
    expect(c.nul).to.equal('oops');
    expect(c.undef).to.equal('oops');
    expect(c.str).to.equal('oops');
  });

  it('util.augment', function () {
    function Bird(name) {
      this.name = name;
    }

    Bird.prototype = {
      getName: function () {
        return this.name;
      },
      fly: function () {
      }
    };

    function Pig(name) {
      this.name = name;
    }

    util.augment(Pig, Bird, {prop: 'test prop'});
    util.augment(Pig, {weight: '100kg'});
    var pig = new Pig('Babe');

    expect(typeof pig.fly).to.equal('function');
    expect(pig.prop).to.equal('test prop');
    expect(pig.weight).to.equal('100kg');
  });

  it('augment does not change constructor', function () {
    function X() {
    }

    function Y() {
    }

    util.augment(X, Y);
    expect(new X().constructor).to.equal(X);
  });

  it('util.extend', function () {
    function Bird(name) {
      this.name = name;
    }

    Bird.prototype = {
      getName: function () {
        return this.name;
      }
    };

    function Chicken(name) {
      Chicken.superclass.constructor.call(this, name);
    }

    Chicken.prototype.featcher = 2;
    util.extend(Chicken, Bird);
    var chicken = new Chicken('Tom');

    expect(chicken.constructor).to.equal(Chicken);
    expect(chicken.getName()).to.equal('Tom');
    expect(chicken.featcher).to.equal(2); // keep existed prototype members
  });

  it('util.namespace', function () {
    var ns;
    // normal
    ns = util.namespace('app1.Test');
    ns.name = 'foo1';
    /*global app1*/
    expect(app1.Test.name).to.equal('foo1');

    var x = {};
    ns = util.namespace('app2.Test', x);
    ns.name = 'foo2';
    expect(x.app2.Test.name).to.equal('foo2');
    expect(window.app2).to.equal(undefined);
  });

  it('util.guid', function () {
    expect(typeof util.guid()).to.equal('string');
    expect(util.guid() - util.guid()).to.equal(-1);
  });

  it('util.makeArray', function () {
    var o;

    // 普通对象(无 length 属性)转换为 [obj]
    o = {a: 1};
    expect(util.makeArray(o)[0]).to.equal(o);

    // string 转换为 [str]
    expect(util.makeArray('test')[0]).to.equal('test');

    // function 转换为 [fn]
    o = fn;
    expect(util.makeArray(o)[0]).to.equal(o);

    // array-like 对象，转换为数组
    expect(util.makeArray({'0': 0, '1': 1, length: 2}).length).to.equal(2);
    expect(util.makeArray({'0': 0, '1': 1, length: 2})[1]).to.equal(1);

    // nodeList 转换为普通数组
    o = document.getElementsByTagName('body');
    expect(util.makeArray(o).length).to.equal(1);
    expect(util.makeArray(o)[0]).to.equal(o[0]);
    expect('slice' in util.makeArray(o)).to.equal(true);

    // arguments 转换为普通数组
    o = arguments;
    expect(util.makeArray(o).length).to.equal(0);

    // 伪 array-like 对象
    o = util.makeArray({a: 1, b: 2, length: 2});
    expect(o.length).to.equal(2);
    expect(o[0]).to.equal(undefined);
    expect(o[1]).to.equal(undefined);
  });

  it("util.escapeHtml", function () {
    expect(util.escapeHtml("<")).to.equal("&lt;");
    expect(util.escapeHtml(">")).to.equal("&gt;");
    expect(util.escapeHtml("&")).to.equal("&amp;");
    expect(util.escapeHtml('"')).to.equal("&quot;");
  });

  it("util.unEscapeHtml", function () {
    expect(util.unEscapeHtml("&lt;")).to.equal("<");
    expect(util.unEscapeHtml("&gt;")).to.equal(">");
    expect(util.unEscapeHtml("&amp;")).to.equal("&");
    expect(util.unEscapeHtml('&quot;')).to.equal('"');
    expect(util.unEscapeHtml('&#' + "b".charCodeAt(0) + ';')).to.equal('b');
  });

  it('util.type', function () {
    expect(util.type(null)).to.equal('null');

    expect(util.type(undefined)).to.equal('undefined');
    expect(util.type()).to.equal('undefined');

    expect(util.type(true)).to.equal('boolean');
    expect(util.type(false)).to.equal('boolean');
    expect(util.type(Boolean(true))).to.equal('boolean');

    expect(util.type(1)).to.equal('number');
    expect(util.type(0)).to.equal('number');
    expect(util.type(Number(1))).to.equal('number');

    expect(util.type('')).to.equal('string');
    expect(util.type('a')).to.equal('string');
    expect(util.type(String('a'))).to.equal('string');

    expect(util.type({})).to.equal('object');

    expect(util.type(/foo/)).to.equal('regexp');
    expect(util.type(new RegExp('asdf'))).to.equal('regexp');

    expect(util.type([1])).to.equal('array');

    expect(util.type(new Date())).to.equal('date');

    expect(util.type(function () {
    })).to.equal('function');
    expect(util.type(fn)).to.equal('function');

    expect(util.type(host)).to.equal('object');

    if (web) {
      expect(util.type(doc)).to.equal('object');
      expect(util.type(doc.body)).to.equal('object');
      expect(util.type(doc.createTextNode('foo'))).to.equal('object');
      expect(util.type(doc.getElementsByTagName('*'))).to.equal('object');
    }
  });

  it('util.isArray', function () {
    expect(util.isArray([])).to.equal(true);

    expect(util.isArray()).to.equal(false);
    expect(util.isArray(arguments)).to.equal(false);

    if (web) {
      expect(util.isArray(doc.getElementsByTagName('*'))).to.equal(false);
    }

    // use native if possible
    if (Array.isArray) {
      expect(util.isArray).to.equal(Array.isArray);
    }
  });

  it('util.isDate', function () {
    expect(util.isDate(new Date())).to.equal(true);
    expect(util.isDate('2010/12/5')).to.equal(false);
  });

  it('util.isRegExp', function () {
    expect(util.isRegExp(/s/)).to.equal(true);
    expect(util.isRegExp(new RegExp('asdf'))).to.equal(true);
  });

  it('util.isObject', function () {
    expect(util.isObject({})).to.equal(true);
    expect(util.isObject(new Fn())).to.equal(true);
    expect(util.isObject(host)).to.equal(true);

    expect(util.isObject()).to.equal(false);
    expect(util.isObject(null)).to.equal(false);
    expect(util.isObject(1)).to.equal(false);
    expect(util.isObject('a')).to.equal(false);
    expect(util.isObject(true)).to.equal(false);
  });

  it('util.isEmptyObject', function () {
    expect(util.isEmptyObject({})).to.equal(true);

    expect(util.isEmptyObject({a: 1})).to.equal(false);
    if (!ie8) {
      expect(util.isEmptyObject([])).to.equal(true);
    }
    // Failed in Safari/Opera
    //expect(util.isEmptyObject(fn)).to.equal(true);
  });

  it('util.isPlainObject', function () {
    // The use case that we want to match
    expect(util.isPlainObject({})).to.equal(true);

    expect(util.isPlainObject(new Fn())).to.equal(false);

    // Not objects shouldn't be matched
    expect(util.isPlainObject('')).to.equal(false);
    expect(util.isPlainObject(0)).to.equal(false);
    expect(util.isPlainObject(1)).to.equal(false);
    expect(util.isPlainObject(true)).to.equal(false);
    expect(util.isPlainObject(null)).to.equal(false);
    expect(util.isPlainObject(undefined)).to.equal(false);
    expect(util.isPlainObject([])).to.equal(false);
    expect(util.isPlainObject(new Date())).to.equal(false);
    expect(util.isPlainObject(fn)).to.equal(false);

    // Dom Element
    if (web) {
      expect(util.isPlainObject(doc.createElement('div'))).to.equal(false);
    }


    function X() {
    }

    expect(util.isPlainObject(new X())).to.equal(false);
    function Y() {
      this.x = 1;
    }

    Y.prototype.z = util.noop;
    expect(util.isPlainObject(new Y())).to.equal(false);

    // Host
    expect(util.isPlainObject(host)).to.equal(false);
  });

  describe('util.clone', function () {
    it('works', function () {
      // non array or plain object, just return
      expect(util.clone()).to.equal(undefined);
      expect(util.clone(null)).to.equal(null);
      expect(util.clone(1)).to.equal(1);
      expect(util.clone(true)).to.equal(true);
      expect(util.clone('a')).to.equal('a');
      expect(util.clone(fn)).to.equal(fn);

      var date = new Date();
      expect(util.clone(date)).to.eql(date);
      expect(util.clone(date)).not.to.equal(date);


      var reg = /i/i;
      expect(util.clone(reg)).to.eql(reg);

      // phantomjs cache??
      if (!window.callPhantom) {
        expect(util.clone(reg)).not.to.equal(reg);
      }

      // clone plain object
      var t = {a: 0, b: {b1: 1, b2: 'a'}};
      var t2 = util.clone(t);
      t.a = 1;
      expect(t2.a).to.equal(0);
      expect(t2.b.b1).to.equal(1);
      t2.b.b2 = 'b';
      expect(t2.b.b2).to.equal('b');

      // clone array
      var t3 = ['a', 2, 3, t];
      var t4 = util.clone(t3);
      t3[1] = 1;
      t3.push(5);
      expect(t4[1]).to.equal(2);
      expect(t4.length).to.equal(4);

      // recursive clone
      var CLONE_MARKER = '__~ks_cloned',
        Tom = {
          x: 1
        },
        Green = {
          father: Tom,
          x: 1
        };
      Tom.son = Green;

      var Tom2 = util.clone(Tom);
      expect(util.equals(Tom2.son, Green)).to.ok();
      expect(Tom2.son).not.to.equal(Green);
      Tom2.son.x = 2;
      expect(Green.x).to.equal(1);

      expect(Tom2[CLONE_MARKER]).to.equal(undefined);

      var Green2 = util.clone(Green);
      expect(util.equals(Green2.father, Tom)).to.ok();
      expect(Green2.father).not.to.equal(Tom);
      expect(Green2[CLONE_MARKER]).to.equal(undefined);

      // filter function
      var t5 = [1, 2, 3, 4, 5, 6];
      var t6 = util.clone(t5, function (v) {
        return v % 2 === 0;
      });
      expect(t6.length).to.equal(3);
      expect(t6[0]).to.equal(2);
      expect(t6[1]).to.equal(4);
      expect(t6[2]).to.equal(6);


      // array of object
      var t7 = [],
        t20 = {x: 6},
        t21 = {x: 7},
        t22 = [t20, t21],
        t8 = {x: 1, z: t7, q: t22},
        t9 = {y: 1, z: t7, q: t22};
      t7.push(t8, t9);
      var t10 = util.clone(t7);
      expect(t10).not.to.equal(t7);
      expect(util.equals(t10, t7)).to.ok();
      expect(t10 === t7).to.equal(false);


      // 复制后仍是同一数组
      expect(t10[0].z === t10).to.equal(true);
      expect(t10[0].z).to.equal(t10);
      expect(t10[0].z).not.to.equal(t7);
      expect(util.equals(t10[0].z, t7)).to.ok();

      // 复制后仍是同一数组
      expect(t10[1].q).to.equal(t10[0].q);
      expect(t10[1].q).not.to.equal(t22);
      expect(util.equals(t10[1].q, t22)).to.ok();

      t10[0].x = 2;
      t10[1].y = 2;
      // 不改变原始数据
      expect(t10.length).to.equal(2);
      expect(t8.x).to.equal(1);
      expect(t9.y).to.equal(1);
    });

    it('allow non structured clone', function () {
      var a = {x: 2};
      var b = {y: 2};
      a.arr = [b, b];

      (function () {
        var n = util.clone(a, {
          structured: false
        });
        expect(n).to.eql(a);
        expect(n.arr[0]).not.to.equal(n.arr[1]);
        expect(n.arr[0]).to.eql(n.arr[1]);
      })();

      (function () {
        var n = util.clone(a);
        expect(n).to.eql(a);
        expect(n.arr[0]).to.equal(n.arr[1]);
      })();
    });
  });

  it('util.trim', function () {
    var str = '    lots of spaces before and after    ';
    expect(util.trim(str)).to.equal('lots of spaces before and after');

    // special
    expect(util.trim(false)).to.equal('false');
    expect(util.trim(0)).to.equal('0');
    expect(util.trim('')).to.equal('');
    expect(util.trim(NaN)).to.equal('NaN');
    expect(util.trim(null)).to.equal('');
    expect(util.trim()).to.equal('');
    expect(util.trim({})).to.equal({}.toString());
  });

  it('util.substitute', function () {
    var myString = "{subject} is {property1} and {property2}.";
    var myObject = {subject: 'Jack Bauer', property1: 'our lord', property2: 'savior'};

    expect(util.substitute(myString, myObject)).to.equal('Jack Bauer is our lord and savior.');

    expect(util.substitute(1)).to.equal(1);
    expect(util.substitute()).to.equal(undefined);
    expect(util.substitute('a', fn)).to.equal('a');
    expect(util.substitute(fn)).to.equal(fn);

    function T() {
      this.x = 1;
    }

    expect(util.substitute("{x}", new T())).to.equal('1');

  });

  it('util.each', function () {
    var ret = 0;

    util.each([1, 2, 3, 4, 5], function (num) {
      ret += num;
    });

    expect(ret).to.equal(15);

    // test context
    util.each([1], function () {
      expect(this).to.equal(host);
    });
  });

  it('util.indexOf', function () {
    var a;
    expect(util.indexOf(6, [1, 2, 3, 4, 5])).to.equal(-1);
    expect(util.indexOf(2, [1, 2, 3, 4, 5])).to.equal(1);
    expect(util.indexOf(2, [1, 2, 3, 4, 5], 1)).to.equal(1);
    expect(util.indexOf(2, [1, 2, 3, 4, 5], 2)).to.equal(-1);
    if (!ie8) {
      expect(util.indexOf(a, [1, 2, 3, 4, undefined])).to.equal(4);
    }
    expect(util.indexOf({}, [1, 2, 3, 4, undefined])).to.equal(-1);
  });

  it('util.lastIndexOf', function () {
    expect(util.indexOf(6, [1, 2, 3, 4, 5])).to.equal(-1);
    expect(util.indexOf(2, [1, 2, 3, 4, 5])).to.equal(1);
    expect(util.indexOf(2, [1, 2, 3, 4, 5], 1)).to.equal(1);
    expect(util.indexOf(2, [1, 2, 3, 4, 5], 2)).to.equal(-1);
    expect(util.indexOf(2, [1, 2, 3, 4, 5], 0)).to.equal(1);
  });

  it('util.unique', function () {
    if (host.hostType === 'console') {
      return;
    } // BESENShell has bug for Array.prototype.splice

    expect(util.unique([1, 2, 1]).length).to.equal(2);
    expect(util.unique([1, 2, '1']).length).to.equal(3);
    expect(util.unique(['1', '1', '1']).length).to.equal(1);

    expect(util.unique(['a', 'b', 'a'])[0]).to.equal('a');
    expect(util.unique(['a', 'b', 'a'], true)[0]).to.equal('b');
  });

  it('util.inArray', function () {
    var a;
    expect(util.inArray(2, [1, 2, 3, 4, 5])).to.equal(true);
    expect(util.inArray(6, [1, 2, 3, 4, 5])).to.equal(false);
    if (!ie8) {
      expect(util.inArray(a, [1, 2, 3, 4, undefined])).to.equal(true);
    }
    expect(util.inArray({}, [1, 2, 3, 4, {}])).to.equal(false);
  });

  it('util.filter', function () {
    var ret = util.filter([1, 2, 3, 4, 5], function (item) {
      return item % 2 === 0;
    });

    expect(ret.length).to.equal(2);
  });

  it('util.map', function () {
    function makePseudoPlural(single) {
      return single.replace(/o/g, "e");
    }

    var singles = ["foot", "goose", "moose"];
    var plurals = util.map(singles, makePseudoPlural);

    expect(plurals).to.eql(["feet", "geese", "meese"]);


    var a = util.map("Hello World",
      function (x) {
        return x.charCodeAt(0);
      });
    expect(a).to.eql([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);

  });

  it('util.reduce', function () {
    var r = util.reduce([0, 1, 2, 3, 4], function (previousValue, currentValue) {
      return previousValue + currentValue;
    });
    expect(r).to.equal(10);


    r = util.reduce([0, 1, 2, 3, 4], function (previousValue, currentValue) {
      return previousValue + currentValue;
    }, 10);
    expect(r).to.equal(20);
  });

  it("util.bind", function () {
    function x() {
      expect(this).to.equal(window);
    }

    util.bind(x)();

    if (x.bind) {
      x.bind()();
    }

    function y(a, b, c) {
      expect(a).to.equal(1);
      expect(b).to.equal(2);
      expect(c).to.equal(3);
      expect(this instanceof y).to.equal(true);
    }

    var context = {};
    var t;
    // when new ,ignore context
    t = new (util.bind(y, context, 1, 2))(3);

    if (y.bind && !window.callPhantom) {
      t = new (y.bind(context, 1, 2))(3);
    }

    if (1 > 2) {
      util.log(t);
    }

    function z(a, b, c) {
      expect(a).to.equal(1);
      expect(b).to.equal(2);
      expect(c).to.equal(3);
      expect(this).to.equal(context);
    }

    // consider context
    util.bind(z, context, 1, 2)(3);

    if (z.bind) {
      z.bind(context, 1, 2)(3);
    }
  });

  it('util.bind can be assigned to instance', function () {
    var y = {};
    var x = util.bind(function () {
      expect(this).to.equal(y);
    });
    y.x = x;
    y.x();
  });

  it("util.rbind", function () {
    function x() {
      expect(this).to.equal(window);
    }

    util.rbind(x)();

    function y(a, b, c) {
      expect(a).to.equal(3);
      expect(b).to.equal(1);
      expect(c).to.equal(2);
      expect(this instanceof y).to.equal(true);
    }

    var context = {};

    var t;

    // when new, ignore context
    t = new (util.rbind(y, context, 1, 2))(3);

    if (1 > 2) {
      console.log(t);
    }

    function z(a, b, c) {
      expect(a).to.equal(3);
      expect(b).to.equal(1);
      expect(c).to.equal(2);
      expect(this).to.equal(context);
    }

    // consider context
    util.rbind(z, context, 1, 2)(3);
  });

  it("util.throttle", function (done) {
    var i = 0, x = {};

    function t() {
      i++;
      expect(x).to.equal(this);
    }

    var z = util.throttle(t, 300, x);
    z();
    expect(i).to.equal(0);
    setTimeout(function () {
      z();
      expect(i).to.equal(1);
      z();
      expect(i).to.equal(1);

      setTimeout(function () {
        z();
        expect(i).to.equal(2);
        z();
        expect(i).to.equal(2);
        done();
      }, 500);
    }, 500);
  });

  it("util.buffer", function (done) {
    var i = 0, x = {};

    function t() {
      i++;
      expect(x).to.equal(this);
    }

    var z = util.buffer(t, 300, x);
    z();
    expect(i).to.equal(0);
    z();
    expect(i).to.equal(0);

    setTimeout(function () {
      expect(i).to.equal(1);

      setTimeout(function () {
        expect(i).to.equal(1);

        done();
      }, 500);
    }, 500);
  });

  it("util.every", function () {
    function isBigEnough(element) {
      return (element >= 10);
    }

    var passed = util.every([12, 5, 8, 130, 44], isBigEnough);
    expect(passed).to.equal(false);
    passed = util.every([12, 54, 18, 130, 44], isBigEnough);
    expect(passed).to.equal(true);
  });

  it("util.some", function () {
    function isBigEnough(element) {
      return (element >= 10);
    }

    var passed = util.some([2, 5, 8, 1, 4], isBigEnough);
    // passed is false
    expect(passed).to.equal(false);
    passed = util.some([12, 5, 8, 1, 4], isBigEnough);
    // passed is true
    expect(passed).to.equal(true);
  });

  it('util.now', function () {
    expect(util.type(util.now())).to.equal('number');
  });

  it('util.keys', function () {

    var x = {
      toString: function () {
        return "ha";
      },
      'x': 2
    };

    var ret = util.keys(x);

    ret.sort();

    expect(ret).to.eql(['x', "toString"].sort());
  });

  describe("util.ready", function () {
    it('util.ready simple works', function (done) {
      var r;
      util.ready(function () {
        r = 1;
      });
      setTimeout(function () {
        expect(r).to.equal(1);
        done();
      }, 100);
    });

    // fix #89
    if (!util._debug) {
      it("util.ready should be independent from each other", function (done) {
        var r;
        util.ready(function () {
          throw "1";
        });

        util.ready(function () {
          r = 1;
        });

        setTimeout(function () {
          expect(r).to.equal(1);
          done();
        }, 100);
      });
    }
  });

  it('util.isWindow', function () {
    expect(util.isWindow(host)).to.equal(true);
    expect(util.isWindow({})).to.equal(false);
    expect(util.isWindow({
      setInterval: 1,
      setTimeout: 1,
      document: {
        nodeType: 9
      }
    })).to.equal(false);
    expect(util.isWindow(document)).to.equal(false);
    expect(util.isWindow(document.documentElement.firstChild)).to.equal(false);
  });

  it('util.globalEval', function () {
    util.globalEval('var globalEvalTest = 1;');
    expect(host.globalEvalTest).to.equal(1);
  });

  describe('util.later', function () {
    it('timeout works', function (done) {
      util.later(function (data) {
        expect(data.n).to.equal(1);
        done();
      }, 20, false, null, {n: 1});
    });

    it('interval works', function (done) {
      var i = 1;
      var timer = util.later(function (data) {
        expect(data.n).to.equal(1);
        if (i++ === 3) {
          timer.cancel();
          done();
        }
      }, 500, true, null, {n: 1});
    });
  });

  it('util.available', function () {
    var ret, t;

    t = document.createElement('DIV');
    t.id = 'test-available';
    document.body.appendChild(t);

    ret = 0;
    util.available('#test-available', function () {
      ret = 1;
    });
    expect(ret).to.equal(0);

    util.later(function () {
      t = document.createElement('DIV');
      t.id = 'test-available2';
      document.body.appendChild(t);
    }, 100);

    ret = 0;
    util.available('test-available2', function () {
      ret = 1;
    });
    expect(ret).to.equal(0);

    // 下面的语句不抛异常
    util.available();
    util.available('xxx');
  });

  it('util.equals', function () {
    var d = new Date();
    var d2 = new Date(d.getTime());
    expect(util.equals({x: 1}, {})).to.equal(false);
    expect(util.equals({x: 1}, {x: 2})).to.equal(false);
    expect(util.equals({x: 1}, {y: 1})).to.equal(false);
    expect(util.equals({x: 1}, {x: 1})).to.equal(true);
    expect(util.equals({x: [1]}, {x: [1, 2]})).to.equal(false);
    expect(util.equals({x: [1, 2], y: 1}, {y: 1, x: [1, 2]})).to.equal(true);
    expect(util.equals({x: [1, 2], y: 2}, {y: 1, x: [1, 2]})).to.equal(false);
    expect(util.equals({x: d}, {x: d2})).to.equal(true);
    expect(util.equals(d, d2)).to.equal(true);
  });
});

