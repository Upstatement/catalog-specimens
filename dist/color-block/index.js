import { inherits as _inherits, createClass as _createClass, classCallCheck as _classCallCheck, possibleConstructorReturn as _possibleConstructorReturn, getPrototypeOf as _getPrototypeOf } from '../_virtual/_rollupPluginBabelHelpers.js';
import React$1 from 'react';
import { Specimen } from 'catalog';

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

      if (!backgroundColors || !foregroundColors) {
        return null;
      }

      var renderAccessibilityResults = function renderAccessibilityResults(colorA, colorB, size) {
        var results = _this.checkColors(colorA, colorB, size);

        if (results.WCAG_AAA === true) {
          return React$1.createElement("div", {
            className: "colorblock-color-test--pass"
          }, "AAA");
        }

        if (results.WCAG_AA === true) {
          return React$1.createElement("div", {
            className: "colorblock-color-test--partial"
          }, "AA");
        }

        return React$1.createElement("div", {
          className: "colorblock-color-test--fail"
        }, "Fails");
      };

      return React$1.createElement("div", {
        className: "catalog-specimen catalog-colorblock"
      }, React$1.createElement("table", null, React$1.createElement("thead", null, React$1.createElement("tr", null, React$1.createElement("td", {
        colSpan: "100%"
      }, React$1.createElement("div", {
        className: "colorblock-color-name colorblock-color-name--heading"
      }))), React$1.createElement("tr", null, React$1.createElement("td", null, React$1.createElement("div", {
        className: "colorblock-color-name colorblock-color-name--heading"
      }, "Text Color")), backgroundColors.map(function (key, k) {
        return React$1.createElement("td", {
          key: k
        }, React$1.createElement("div", {
          className: "colorblock-color-example",
          style: {
            backgroundColor: key.color
          }
        }), key.name && React$1.createElement("div", {
          className: "colorblock-color-name"
        }, key.name), key.color);
      }))), React$1.createElement("tbody", null, foregroundColors.map(function (row, i) {
        return React$1.createElement("tr", {
          key: i
        }, React$1.createElement("td", {
          key: 'color-' + i
        }, React$1.createElement("div", {
          className: "colorblock-color-example",
          style: {
            backgroundColor: row.color
          }
        }), row.name && React$1.createElement("div", {
          className: "colorblock-color-name"
        }, row.name), row.color), backgroundColors.map(function (key, k) {
          return React$1.createElement("td", {
            key: k
          }, React$1.createElement("div", {
            className: "colorblock-color-tests"
          }, React$1.createElement("div", {
            className: "colorblock-color-test large-text",
            style: {
              color: row.color,
              backgroundColor: key.color
            }
          }, "L"), React$1.createElement("div", {
            className: "colorblock-color-test small-text",
            style: {
              color: row.color,
              backgroundColor: key.color
            }
          }, "S")), React$1.createElement("div", {
            className: "colorblock-color-tests"
          }, React$1.createElement("div", {
            className: "colorblock-color-test colorblock-color-test--result"
          }, renderAccessibilityResults(row.color, key.color, 20)), React$1.createElement("div", {
            className: "colorblock-color-test colorblock-color-test--result"
          }, renderAccessibilityResults(row.color, key.color, 12))));
        }));
      }))));
    }
  }]);

  return ColorBlock;
}(React$1.Component); // ColorBlock.propTypes = {
//   foregroundColors: PropTypes.array.isRequired,
//   backgroundColors: PropTypes.array.isRequired,
// };


var index = Specimen()(ColorBlock);

export default index;
