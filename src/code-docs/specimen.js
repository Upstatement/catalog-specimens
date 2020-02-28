/**
 * This custom specimen automatically generates code documentation
 * within Catalog from the comments written and propTypes specified
 * in the React Component. Note that in order to use it as below,
 * you must include the Raw (read: Not Compiled) form of the
 * component to be parsed.
 *
 * USAGE EXAMPLE
 *
 * ```codedocs
 * component: ParagraphRaw
 * typescript: true
 * ```
 **/

import React from 'react';
import { Specimen } from 'catalog';
import ReactHtmlParser from 'react-html-parser';
import showdown from 'showdown';
const reactDocs = require('react-docgen');

const converter = new showdown.Converter();

class CodeDocs extends React.Component {
  render() {
    const { catalog, component, typescript } = this.props;

    // React Docgen infers type from file extension, so we fake a filename.
    const filename = `dummy.${typescript ? '.tsx' : '.jsx'}`;

    const parsed = reactDocs.parse(
      catalog.page.imports[component],
      null,
      null,
      { filename },
    );

    const rows = Object.keys(parsed.props).map(key => {
      const prop = parsed.props[key];
      return {
        Property: key,
        Type: prop.type
          ? prop.type.name
          : prop.tsType
          ? prop.tsType.name
          : null,
        Description: prop.description,
        Required: prop.required ? 'yes' : null,
        Default: prop.defaultValue ? prop.defaultValue.value : null,
      };
    });

    const tableKeys = rows
      .reduce((index, row) => index.concat(Object.keys(row)), [])
      .filter((value, i, self) => self.indexOf(value) === i);

    let description = '';
    if (parsed.description) {
      description = ReactHtmlParser(converter.makeHtml(parsed.description));
    }

    return (
      <div className="catalog-specimen catalog-codedocs">
        {description}
        <table>
          <thead>
            <tr>
              {tableKeys.map((row, k) => (
                <td key={k}>{row}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {tableKeys.map((key, k) => (
                  <td key={k}>{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// CodeDocs.propTypes = {
//   component: PropTypes.string.isRequired,
// };

export default Specimen()(CodeDocs);
