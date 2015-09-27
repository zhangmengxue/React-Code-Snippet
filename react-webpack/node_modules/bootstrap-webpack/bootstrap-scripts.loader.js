
var scripts = [
  'transition',
  'alert',
  'button',
  'carousel',
  'collapse',
  'dropdown',
  'modal',
  'tooltip',
  'popover',
  'scrollspy',
  'tab',
  'affix'
]

module.exports = function () {};
module.exports.pitch = function (configPath) {
  this.cacheable(true);
  var config = require(configPath);
  return scripts.filter(function (script) {
    return config.scripts[script];
  }).map(function (script) {
    return "require(" + JSON.stringify("bootstrap/js/" + script) + ");";
  }).join("\n");
}
