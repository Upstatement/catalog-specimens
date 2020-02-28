"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _catalog = require("catalog");

var _reactHtmlParser = _interopRequireDefault(require("react-html-parser"));

var _showdown = _interopRequireDefault(require("showdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var reactDocs = require('react-docgen');

var converter = new _showdown["default"].Converter();

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
      var parsed = reactDocs.parse(catalog.page.imports[component], null, null, {
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
        description = (0, _reactHtmlParser["default"])(converter.makeHtml(parsed.description));
      }

      return _react["default"].createElement("div", {
        className: "catalog-specimen catalog-codedocs"
      }, description, _react["default"].createElement("table", null, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, tableKeys.map(function (row, k) {
        return _react["default"].createElement("td", {
          key: k
        }, row);
      }))), _react["default"].createElement("tbody", null, rows.map(function (row, i) {
        return _react["default"].createElement("tr", {
          key: i
        }, tableKeys.map(function (key, k) {
          return _react["default"].createElement("td", {
            key: k
          }, row[key]);
        }));
      }))));
    }
  }]);

  return CodeDocs;
}(_react["default"].Component); // CodeDocs.propTypes = {
//   component: PropTypes.string.isRequired,
// };


var _default = (0, _catalog.Specimen)()(CodeDocs);

exports["default"] = _default;