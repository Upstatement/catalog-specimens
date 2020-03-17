import { inherits as _inherits, createClass as _createClass, classCallCheck as _classCallCheck, possibleConstructorReturn as _possibleConstructorReturn, getPrototypeOf as _getPrototypeOf } from '../_virtual/_rollupPluginBabelHelpers.js';
import React$1 from 'react';
import { Specimen } from 'catalog';
import ReactHtmlParser$1 from 'react-html-parser';
import showdown$1 from 'showdown';
import reactDocs$1 from 'react-docgen';

var converter = new showdown$1.Converter();

var CodeDocs = /*#__PURE__*/function (_React$Component) {
  _inherits(CodeDocs, _React$Component);

  function CodeDocs() {
    _classCallCheck(this, CodeDocs);

    return _possibleConstructorReturn(this, _getPrototypeOf(CodeDocs).apply(this, arguments));
  }

  _createClass(CodeDocs, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          catalog = _this$props.catalog,
          component = _this$props.component,
          typescript = _this$props.typescript; // React Docgen infers type from file extension, so we fake a filename.

      var filename = "dummy.".concat(typescript ? '.tsx' : '.jsx');
      var parsed = reactDocs$1.parse(catalog.page.imports[component], null, null, {
        filename: filename
      });
      var rows = Object.keys(parsed.props).map(function (key) {
        var prop = parsed.props[key];
        return {
          Property: key,
          Type: prop.type ? prop.type.name : prop.tsType ? prop.tsType.name : null,
          Description: prop.description,
          Required: prop.required ? 'yes' : null,
          Default: prop.defaultValue ? prop.defaultValue.value : null
        };
      });
      var tableKeys = rows.reduce(function (index, row) {
        return index.concat(Object.keys(row));
      }, []).filter(function (value, i, self) {
        return self.indexOf(value) === i;
      });
      var description = '';

      if (parsed.description) {
        description = ReactHtmlParser$1(converter.makeHtml(parsed.description));
      }

      return React$1.createElement("div", {
        className: "catalog-specimen catalog-codedocs"
      }, description, React$1.createElement("table", null, React$1.createElement("thead", null, React$1.createElement("tr", null, tableKeys.map(function (row, k) {
        return React$1.createElement("td", {
          key: k
        }, row);
      }))), React$1.createElement("tbody", null, rows.map(function (row, i) {
        return React$1.createElement("tr", {
          key: i
        }, tableKeys.map(function (key, k) {
          return React$1.createElement("td", {
            key: k
          }, row[key]);
        }));
      }))));
    }
  }]);

  return CodeDocs;
}(React$1.Component);

var index = Specimen()(CodeDocs);

export default index;
