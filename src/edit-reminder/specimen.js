/**
 * This is a custom specimen for Catalog that allows us to easily
 * put a link on the footer of each page to encourage it to be
 * edited for content via the Github Gui.
 *
 * USAGE EXAMPLE
 *
 * ```editreminder
 * page: 'components/paragraph.md'
 * ```
 *
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Specimen } from 'catalog';

class EditReminder extends React.Component {
  render() {
    const { page } = this.props;
    const url = `https://github.com/phillymedia/inquirer-design-system/edit/master/packages/catalog/${page}`;

    return (
      <div className="catalog-specimen catalog-reminder">
        <a href={url} target="_blank" className="catalog-reminder--link">
          Edit
        </a>
      </div>
    );
  }
}

EditReminder.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Specimen()(EditReminder);
