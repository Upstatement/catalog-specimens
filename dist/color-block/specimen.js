"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _catalog = require("catalog");

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

var ColorBlock = /*#__PURE__*/function (_React$Component) {
  _inherits(ColorBlock, _React$Component);

  function ColorBlock() {
    _classCallCheck(this, ColorBlock);

    return _possibleConstructorReturn(this, _getPrototypeOf(ColorBlock).apply(this, arguments));
  }

  _createClass(ColorBlock, [{
    key: "hexToSixDigits",
    value: function hexToSixDigits(color) {
      return "#".concat(color[1]).concat(color[1]).concat(color[2]).concat(color[2]).concat(color[3]).concat(color[3]);
    }
  }, {
    key: "hexToRGB",
    value: function hexToRGB(color) {
      return {
        r: parseInt(color.slice(1, 3), 16),
        g: parseInt(color.slice(3, 5), 16),
        b: parseInt(color.slice(5, 7), 16)
      };
    }
  }, {
    key: "hslToRGB",
    value: function hslToRGB(color) {
      var hslParseRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
      color = hslParseRegex.exec(color);

      var bound01 = function bound01(n, max) {
        if (typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1) {
          n = '100%';
        }

        var processPercent = typeof n === "string" && n.indexOf('%') != -1;
        n = Math.min(max, Math.max(0, parseFloat(n)));

        if (processPercent) {
          n = parseInt(n * max, 10) / 100;
        }

        if (Math.abs(n - max) < 0.000001) {
          return 1;
        }

        return n % max / parseFloat(max);
      };

      var h = bound01(color[1], 360);
      var s = bound01(color[2], 100);
      var l = bound01(color[3], 100);
      var r, g, b;

      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      return {
        r: r * 255,
        g: g * 255,
        b: b * 255
      };
    }
  }, {
    key: "rgbToObject",
    value: function rgbToObject(color) {
      color = color.replace(/[^\d,]/g, '').split(',');
      return {
        r: color[0],
        g: color[1],
        b: color[2]
      };
    }
  }, {
    key: "rgbToLuminance",
    value: function rgbToLuminance(color) {
      return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
    }
  }, {
    key: "getContrastRatio",
    value: function getContrastRatio(lumA, lumB) {
      var lighter = lumB;
      var darker = lumA;

      if (lumA >= lumB) {
        lighter = lumA;
        darker = lumB;
      }

      var ratio = (lighter + 0.05) / (darker + 0.05);
      return ratio;
    }
  }, {
    key: "verifyContrastRatio",
    value: function verifyContrastRatio(ratio, fontSize) {
      var WCAG_REQ_RATIO_AA_LG = 3.0;
      var WCAG_REQ_RATIO_AA_SM = 4.5;
      var WCAG_REQ_RATIO_AAA_LG = 4.5;
      var WCAG_REQ_RATIO_AAA_SM = 7.0;
      var WCAG_FONT_CUTOFF = 18;
      var results = {};

      if (fontSize >= WCAG_FONT_CUTOFF) {
        results.WCAG_AA = ratio >= WCAG_REQ_RATIO_AA_LG;
        results.WCAG_AAA = ratio >= WCAG_REQ_RATIO_AAA_LG;
      } else {
        results.WCAG_AA = ratio >= WCAG_REQ_RATIO_AA_SM;
        results.WCAG_AAA = ratio >= WCAG_REQ_RATIO_AAA_SM;
      }

      results.ratio = ratio.toFixed(2);
      return results;
    }
  }, {
    key: "checkColors",
    value: function checkColors(colorA, colorB) {
      var fontSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16;

      if (!colorA || !colorB) {
        return false;
      }

      var hexRegex = /^#[a-fA-F0-9]{6}$/;
      var hexRegexReduced = /^#[a-fA-F0-9]{3}$/;
      var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
      var hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

      if (hexRegexReduced.test(colorA)) {
        colorA = this.hexToSixDigits(colorA);
      }

      if (hexRegex.test(colorA)) {
        colorA = this.hexToRGB(colorA);
      }

      if (hslRegex.test(colorA)) {
        colorA = this.hslToRGB(colorA);
      }

      if (rgbRegex.test(colorA)) {
        colorA = this.rgbToObject(colorA);
      }

      if (hexRegexReduced.test(colorB)) {
        colorB = this.hexToSixDigits(colorB);
      }

      if (hexRegex.test(colorB)) {
        colorB = this.hexToRGB(colorB);
      }

      if (hslRegex.test(colorB)) {
        colorB = this.hslToRGB(colorB);
      }

      if (rgbRegex.test(colorB)) {
        colorB = this.rgbToObject(colorB);
      }

      colorA = this.rgbToLuminance(colorA);
      colorB = this.rgbToLuminance(colorB);
      var contrastRatio = this.getContrastRatio(colorA, colorB);
      return this.verifyContrastRatio(contrastRatio, fontSize);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          backgroundColors = _this$props.backgroundColors,
          foregroundColors = _this$props.foregroundColors;

      var renderAccessibilityResults = function renderAccessibilityResults(colorA, colorB, size) {
        var results = _this.checkColors(colorA, colorB, size);

        if (results.WCAG_AAA === true) {
          return _react["default"].createElement("div", {
            className: "colorblock-color-test--pass"
          }, "AAA");
        }

        if (results.WCAG_AA === true) {
          return _react["default"].createElement("div", {
            className: "colorblock-color-test--partial"
          }, "AA");
        }

        return _react["default"].createElement("div", {
          className: "colorblock-color-test--fail"
        }, "Fails");
      };

      return _react["default"].createElement("div", {
        className: "catalog-specimen catalog-colorblock"
      }, _react["default"].createElement("table", null, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        colSpan: "100%"
      }, _react["default"].createElement("div", {
        className: "colorblock-color-name colorblock-color-name--heading"
      }))), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, _react["default"].createElement("div", {
        className: "colorblock-color-name colorblock-color-name--heading"
      }, "Text Color")), backgroundColors.map(function (key, k) {
        return _react["default"].createElement("td", {
          key: k
        }, _react["default"].createElement("div", {
          className: "colorblock-color-example",
          style: {
            backgroundColor: key.color
          }
        }), key.name && _react["default"].createElement("div", {
          className: "colorblock-color-name"
        }, key.name), key.color);
      }))), _react["default"].createElement("tbody", null, foregroundColors.map(function (row, i) {
        return _react["default"].createElement("tr", {
          key: i
        }, _react["default"].createElement("td", {
          key: 'color-' + i
        }, _react["default"].createElement("div", {
          className: "colorblock-color-example",
          style: {
            backgroundColor: row.color
          }
        }), row.name && _react["default"].createElement("div", {
          className: "colorblock-color-name"
        }, row.name), row.color), backgroundColors.map(function (key, k) {
          return _react["default"].createElement("td", {
            key: k
          }, _react["default"].createElement("div", {
            className: "colorblock-color-tests"
          }, _react["default"].createElement("div", {
            className: "colorblock-color-test large-text",
            style: {
              color: row.color,
              backgroundColor: key.color
            }
          }, "L"), _react["default"].createElement("div", {
            className: "colorblock-color-test small-text",
            style: {
              color: row.color,
              backgroundColor: key.color
            }
          }, "S")), _react["default"].createElement("div", {
            className: "colorblock-color-tests"
          }, _react["default"].createElement("div", {
            className: "colorblock-color-test colorblock-color-test--result"
          }, renderAccessibilityResults(row.color, key.color, 20)), _react["default"].createElement("div", {
            className: "colorblock-color-test colorblock-color-test--result"
          }, renderAccessibilityResults(row.color, key.color, 12))));
        }));
      }))));
    }
  }]);

  return ColorBlock;
}(_react["default"].Component); // ColorBlock.propTypes = {
//   foregroundColors: PropTypes.array.isRequired,
//   backgroundColors: PropTypes.array.isRequired,
// };


var _default = (0, _catalog.Specimen)()(ColorBlock);

exports["default"] = _default;