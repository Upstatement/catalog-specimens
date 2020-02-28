"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _catalog = require("catalog");

var _reactHighlight = _interopRequireDefault(require("react-highlight.js"));

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

var CodeTabbed = /*#__PURE__*/function (_React$Component) {
  _inherits(CodeTabbed, _React$Component);

  function CodeTabbed(props) {
    var _this;

    _classCallCheck(this, CodeTabbed);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CodeTabbed).call(this, props));
    var tabs = props.tabs;
    var tabList = [];
    tabs.forEach(function (tab) {
      tabList.push({
        name: tab.toUpperCase(),
        id: tab,
        lang: 'react',
        content: _this.props[tab],
        selected: false
      });
    });
    tabList[0].selected = true;
    _this.state = {
      expanded: false,
      tabs: tabList
    };
    return _this;
  }

  _createClass(CodeTabbed, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var selectTab = function selectTab(tabId) {
        var tabs = _this2.state.tabs.map(function (tab) {
          tab.selected = false;

          if (tab.id === tabId) {
            tab.selected = true;
          }

          return tab;
        });

        _this2.setState({
          tabs: tabs
        });
      };

      var renderTabs = function renderTabs() {
        return _react["default"].createElement("ul", {
          className: "codeblock-tab-buttons ".concat(_this2.state.expanded ? 'codeblock-tab-buttons--visible' : '')
        }, _this2.state.tabs.map(function (tab, index) {
          return _react["default"].createElement("li", {
            key: index,
            className: "codeblock-tab-button ".concat(tab.selected && tab.selected === true ? 'codeblock-tab-button--selected' : ''),
            onClick: function onClick() {
              return selectTab(tab.id);
            }
          }, tab.name);
        }));
      };

      var renderSnippets = function renderSnippets() {
        return _react["default"].createElement("div", {
          className: "codeblock-snippets ".concat(_this2.state.expanded ? 'codeblock-snippets--visible' : '')
        }, _this2.state.tabs.map(function (tab, index) {
          return _react["default"].createElement("div", {
            className: "codeblock ".concat(tab.selected && tab.selected === true ? 'codeblock--selected' : ''),
            key: index
          }, _react["default"].createElement(_reactHighlight["default"], {
            language: tab.lang
          }, tab.content));
        }));
      };

      var toggleExpansion = function toggleExpansion() {
        var currentState = _this2.state.expanded;

        _this2.setState({
          expanded: !currentState
        });
      };

      var renderToggleButton = function renderToggleButton() {
        var text = 'show example code';

        if (_this2.state.expanded) {
          text = 'hide example code';
        }

        return _react["default"].createElement("button", {
          className: "codeblock-toggle-button",
          onClick: function onClick() {
            toggleExpansion();
          }
        }, text);
      };

      return _react["default"].createElement("div", {
        className: "codeblock-container"
      }, renderSnippets(), _react["default"].createElement("div", {
        className: "codeblock-footer"
      }, renderTabs(), renderToggleButton()));
    }
  }]);

  return CodeTabbed;
}(_react["default"].Component);

;

var _default = (0, _catalog.Specimen)()(CodeTabbed);

exports["default"] = _default;