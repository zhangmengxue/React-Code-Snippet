
var styles = [
  "mixins",

  "normalize",
  "print",

  "scaffolding",
  "type",
  "code",
  "grid",
  "tables",
  "forms",
  "buttons",

  "component-animations",
  "glyphicons",
  "dropdowns",
  "button-groups",
  "input-groups",
  "navs",
  "navbar",
  "breadcrumbs",
  "pagination",
  "pager",
  "labels",
  "badges",
  "jumbotron",
  "thumbnails",
  "alerts",
  "progress-bars",
  "media",
  "list-group",
  "panels",
  "wells",
  "close",

  "modals",
  "tooltip",
  "popovers",
  "carousel",

  "utilities",
  "responsive-utilities"
];

module.exports = function (content) {
  this.cacheable(true);
  var config = this.exec(content, this.resourcePath);
  var start =
      "@import          \"~bootstrap/less/variables.less\";\n"
    + "@icon-font-path: \"~bootstrap/fonts/\";\n"
    + "@import          \"./bootstrap.config.less\";\n";
  source = start + styles.filter(function (style) {
    return config.styles[style];
  }).map(function (style) {
    return "@import \"~bootstrap/less/" + style + ".less\";";
  }).join("\n");
  return source;
}
