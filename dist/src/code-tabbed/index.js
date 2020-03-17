import { inherits as _inherits, createClass as _createClass, classCallCheck as _classCallCheck, possibleConstructorReturn as _possibleConstructorReturn, getPrototypeOf as _getPrototypeOf } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React$1 from 'react';
import { Specimen } from 'catalog';
import Highlight from '../../node_modules/react-highlight.js/dist/main.js';

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
        return React$1.createElement("ul", {
          className: "codeblock-tab-buttons ".concat(_this2.state.expanded ? 'codeblock-tab-buttons--visible' : '')
        }, _this2.state.tabs.map(function (tab, index) {
          return React$1.createElement("li", {
            key: index,
            className: "codeblock-tab-button ".concat(tab.selected && tab.selected === true ? 'codeblock-tab-button--selected' : ''),
            onClick: function onClick() {
              return selectTab(tab.id);
            }
          }, tab.name);
        }));
      };

      var renderSnippets = function renderSnippets() {
        return React$1.createElement("div", {
          className: "codeblock-snippets ".concat(_this2.state.expanded ? 'codeblock-snippets--visible' : '')
        }, _this2.state.tabs.map(function (tab, index) {
          return React$1.createElement("div", {
            className: "codeblock ".concat(tab.selected && tab.selected === true ? 'codeblock--selected' : ''),
            key: index
          }, React$1.createElement(Highlight, {
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

        return React$1.createElement("button", {
          className: "codeblock-toggle-button",
          onClick: function onClick() {
            toggleExpansion();
          }
        }, text);
      };

      return React$1.createElement("div", {
        className: "codeblock-container"
      }, renderSnippets(), React$1.createElement("div", {
        className: "codeblock-footer"
      }, renderTabs(), renderToggleButton()));
    }
  }]);

  return CodeTabbed;
}(React$1.Component);
var index = Specimen()(CodeTabbed);

export default index;
