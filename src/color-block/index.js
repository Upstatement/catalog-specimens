/**
 * This custom specimen generates a mapping of foreground and background
 * colors to determine whether they are accessibility compliant when
 * displayed together.
 *
 * USAGE EXAMPLE
 *
 * ```colorblock
 * backgroundColors: [
 *   { name: 'Pacific Bridge', color: '#0052CC' },
 *   { name: 'Squid Ink', color: 'rgb(23, 43, 77)' },
 *   { name: 'Doctor', color: 'hsl(0, 100%, 100%)' },
 * ]
 * foregroundColors: [
 *   { name: 'Squid Ink', color: '#172B4D' },
 *   { name: '$color-white', color: '#FFFFFF' },
 * ]
```
 *
 **/

import React from 'react';
// import PropTypes from 'prop-types';
import { Specimen } from 'catalog';

import "./index.css";

class ColorBlock extends React.Component {
  hexToSixDigits(color) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
  };

  hexToRGB(color) {
    return {
      r: parseInt(color.slice(1, 3), 16),
      g: parseInt(color.slice(3, 5), 16),
      b: parseInt(color.slice(5, 7), 16),
    }
  };

  hslToRGB(color) {
    const hslParseRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
    color = hslParseRegex.exec(color);

    const bound01 = (n, max) => {
      if (typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1) {
        n = '100%';
      }

      var processPercent = typeof n === "string" && n.indexOf('%') != -1;

      n = Math.min(max, Math.max(0, parseFloat(n)));

      if (processPercent) {
          n = parseInt(n * max, 10) / 100;
      }

      if ((Math.abs(n - max) < 0.000001)) {
          return 1;
      }

      return (n % max) / parseFloat(max);
    }

    const h = bound01(color[1], 360);
    const s = bound01(color[2], 100);
    const l = bound01(color[3], 100);
    let r, g, b;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    }
  };

  rgbToObject(color) {
    color = color.replace(/[^\d,]/g, '').split(',');

    return {
      r: color[0],
      g: color[1],
      b: color[2],
    }
  };

  rgbToLuminance(color) {
    return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
  };

  getContrastRatio(lumA, lumB) {
    let lighter = lumB;
    let darker = lumA;

    if (lumA >= lumB) {
      lighter = lumA;
      darker = lumB;
    }

    let ratio = (lighter + 0.05) / (darker + 0.05);

    return ratio;
  };

  verifyContrastRatio(ratio, fontSize) {
    const WCAG_REQ_RATIO_AA_LG = 3.0;
    const WCAG_REQ_RATIO_AA_SM = 4.5;
    const WCAG_REQ_RATIO_AAA_LG = 4.5;
    const WCAG_REQ_RATIO_AAA_SM = 7.0;
    const WCAG_FONT_CUTOFF = 18;

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
  };

  checkColors(colorA, colorB, fontSize = 16) {
    if (!colorA || !colorB) {
      return false;
    }

    const hexRegex = /^#[a-fA-F0-9]{6}$/
    const hexRegexReduced = /^#[a-fA-F0-9]{3}$/
    const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
    const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/

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

    const contrastRatio = this.getContrastRatio(colorA, colorB);
    return this.verifyContrastRatio(contrastRatio, fontSize);
  }

  render() {
    const { backgroundColors, foregroundColors } = this.props;

    if (!backgroundColors || !foregroundColors) {
      return null;
    }

    const renderAccessibilityResults = (colorA, colorB, size) => {
      const results = this.checkColors(colorA, colorB, size);

      if (results.WCAG_AAA === true) {
        return <div className="colorblock-color-test--pass">AAA</div>;
      }
      if (results.WCAG_AA === true) {
        return <div className="colorblock-color-test--partial">AA</div>;
      }
      return <div className="colorblock-color-test--fail">Fails</div>;
    };

    return (
      <div className="catalog-specimen catalog-colorblock">
        <table>
          <thead>
            <tr>
              <td colSpan="100%">
                <div className="colorblock-color-name colorblock-color-name--heading" />
              </td>
            </tr>
            <tr>
              <td>
                <div className="colorblock-color-name colorblock-color-name--heading">
                  Text Color
                </div>
              </td>
              {backgroundColors.map((key, k) => (
                <td key={k}>
                  <div
                    className="colorblock-color-example"
                    style={{ backgroundColor: key.color }}
                  />
                  {key.name &&
                    <div className="colorblock-color-name">{key.name}</div>
                  }
                  {key.color}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {foregroundColors.map((row, i) => (
              <tr key={i}>
                <td key={'color-' + i}>
                  <div
                    className="colorblock-color-example"
                    style={{ backgroundColor: row.color }}
                  />
                  {row.name &&
                    <div className="colorblock-color-name">{row.name}</div>
                  }
                  {row.color}
                </td>
                {backgroundColors.map((key, k) => (
                  <td key={k}>
                    <div className="colorblock-color-tests">
                      <div
                        className="colorblock-color-test large-text"
                        style={{ color: row.color, backgroundColor: key.color }}
                      >
                        L
                      </div>
                      <div
                        className="colorblock-color-test small-text"
                        style={{ color: row.color, backgroundColor: key.color }}
                      >
                        S
                      </div>
                    </div>

                    <div className="colorblock-color-tests">
                      <div className="colorblock-color-test colorblock-color-test--result">
                        {renderAccessibilityResults(row.color, key.color, 20)}
                      </div>
                      <div className="colorblock-color-test colorblock-color-test--result">
                        {renderAccessibilityResults(row.color, key.color, 12)}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// ColorBlock.propTypes = {
//   foregroundColors: PropTypes.array.isRequired,
//   backgroundColors: PropTypes.array.isRequired,
// };

export default Specimen()(ColorBlock);
