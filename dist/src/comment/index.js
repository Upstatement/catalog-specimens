import { inherits as _inherits, createClass as _createClass, classCallCheck as _classCallCheck, possibleConstructorReturn as _possibleConstructorReturn, getPrototypeOf as _getPrototypeOf } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React$1 from 'react';
import { Specimen } from 'catalog';
import ReactHtmlParser from '../../node_modules/react-html-parser/lib/index.js';
import showdown$1 from '../../node_modules/showdown/dist/showdown.js';
import dayjs$1 from 'dayjs';

var converter = new showdown$1.Converter();

var Comment = /*#__PURE__*/function (_React$Component) {
  _inherits(Comment, _React$Component);

  function Comment() {
    _classCallCheck(this, Comment);

    return _possibleConstructorReturn(this, _getPrototypeOf(Comment).apply(this, arguments));
  }

  _createClass(Comment, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          author = _this$props.author,
          children = _this$props.children,
          date = _this$props.date;
      var nameArray = author.split(' ');
      var initials = nameArray.map(function (name) {
        return name[0];
      }).join('');
      return React$1.createElement("div", {
        className: "catalog-specimen catalog-comment"
      }, React$1.createElement("div", {
        className: "catalog-comment--author"
      }, React$1.createElement("span", {
        className: "catalog-comment--avatar"
      }, initials), React$1.createElement("span", {
        className: "catalog-comment--details"
      }, author, React$1.createElement("div", {
        className: "catalog-comment--date"
      }, dayjs$1(date).format('DD MMM YYYY')))), React$1.createElement("div", {
        className: "catalog-comment--text"
      }, ReactHtmlParser(converter.makeHtml(children))));
    }
  }]);

  return Comment;
}(React$1.Component); // Comment.propTypes = {
//   author: PropTypes.string,
//   date: PropTypes.string,
//   children: PropTypes.string,
// };


var index = Specimen(undefined, undefined, {
  withChildren: true
})(Comment);

export default index;
