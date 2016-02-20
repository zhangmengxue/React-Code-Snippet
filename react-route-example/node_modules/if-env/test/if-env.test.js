var child = require("child_process");
var expect = require("expect");
var path = require("path");

var run = function(args) {
  var bin = path.join(__dirname, "../bin/if-env.js");

  return child.spawnSync(bin, args);
};

describe("if-env", function() {
  describe("status", function() {
    context("with no arguments", function() {
      it("should return 0", function() {
        expect(run().status).toBe(0);
      });
    });

    context("with NODE_ENV=fake", function() {
      it("should return 1", function() {
        expect(run(["NODE_ENV=fake"]).status).toBe(1);
      });
    });

    context("with NODE_ENV=test", function() {
      it("should return 0", function() {
        expect(run(["NODE_ENV=test"]).status).toBe(0);
      });

      context("and DOES_NOT_EXIST=fake", function() {
        it("should return 1", function() {
          expect(run(["NODE_ENV=TEST", "DOES_NOT_EXIST=fake"]).status).toBe(1);
        });
      });
    });
  });
});
