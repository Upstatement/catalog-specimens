/**
 * This is a custom Specimen meant to allow it to be easier for users to
 * leave inline comments within the styleguide itself. This could take the
 * form of TODO's, Questions, or Observations. Because this method still
 * involves changing the Markdown file to insert this Specimen, it should
 * be possible to "ping" people based on Commit updates.
 *
 * USAGE EXAMPLE
 *
 * ```comment
 * author: "Michael Pelletier"
 * date: "2019-10-17"
 * ---
 * This is _my_ comment! <b>Test</b>
 *  - Testing one
 *  - Testing two
 * ```
 *
 **/

import React from 'react';
// import PropTypes from 'prop-types';
import { Specimen } from 'catalog';
import ReactHtmlParser from 'react-html-parser';
import showdown from 'showdown';
import dayjs from 'dayjs';

import "./index.css";

const converter = new showdown.Converter();

class Comment extends React.Component {
  render() {
    const { author, children, date } = this.props;

    const nameArray = author.split(' ');
    const initials = nameArray.map(name => name[0]).join('');

    return (
      <div className="catalog-specimen catalog-comment">
        <div className="catalog-comment--author">
          <span className="catalog-comment--avatar">{initials}</span>
          <span className="catalog-comment--details">
            {author}
            <div className="catalog-comment--date">
              {dayjs(date).format('DD MMM YYYY')}
            </div>
          </span>
        </div>
        <div className="catalog-comment--text">
          {ReactHtmlParser(converter.makeHtml(children))}
        </div>
      </div>
    );
  }
}

// Comment.propTypes = {
//   author: PropTypes.string,
//   date: PropTypes.string,
//   children: PropTypes.string,
// };

export default Specimen(undefined, undefined, { withChildren: true })(Comment);
