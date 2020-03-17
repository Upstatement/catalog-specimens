/**
 * This custom specimen is used for creating tabbed blocks of code
 * for displaying the different ways of including a component, such
 * as "web" vs "ios" vs "android".
 *
 * It is possible to include a multiline snippet as well.
 *
 * USAGE EXAMPLE
 *
 * ```codetabbed
 * tabs: [android, web]
 * android: <Author type="standard" author={state.author} />
 * web: |
 *   <Author
 *     type="standard"
 *     author={state.author}
 *   />
 * ```
 *
 **/

import React from 'react';
import { Specimen } from 'catalog';
import Highlight from 'react-highlight.js';

import "./index.css";

class CodeTabbed extends React.Component {
  constructor(props) {
    super(props);

    const { tabs } = props;

    const tabList = [];

    tabs.forEach(tab => {
      tabList.push({
        name: tab.toUpperCase(),
        id: tab,
        lang: 'react',
        content: this.props[tab],
        selected: false,
      });
    });

    tabList[0].selected = true;

    this.state = {
      expanded: false,
      tabs: tabList,
    };
  }

  render() {
    const selectTab = (tabId) => {
      const tabs = this.state.tabs.map(tab => {
        tab.selected = false;
        if  (tab.id === tabId) {
          tab.selected = true;
        }
        return tab;
      });
      this.setState({ tabs: tabs });
    }

    const renderTabs = () => {
      return (
        <ul className={`codeblock-tab-buttons ${this.state.expanded ? 'codeblock-tab-buttons--visible' : ''}`}>
          {this.state.tabs.map(function(tab, index) {
            return (
              <li
                key={ index }
                className={`codeblock-tab-button ${tab.selected && tab.selected === true ? 'codeblock-tab-button--selected' : ''}`}
                onClick={() => selectTab(tab.id)}
              >
                {tab.name}
              </li>
            );
          })}
        </ul>
      );
    }

    const renderSnippets = () => {
      return (
        <div className={`codeblock-snippets ${this.state.expanded ? 'codeblock-snippets--visible' : ''}`}>
          {this.state.tabs.map(function(tab, index) {
            return (
              <div className={`codeblock ${tab.selected && tab.selected === true ? 'codeblock--selected' : ''}`} key={index}>
                <Highlight language={tab.lang}>
                  {tab.content}
                </Highlight>
              </div>
            )
          })}
        </div>
      );
    }

    const toggleExpansion = () => {
      const currentState = this.state.expanded;
      this.setState({ expanded: !currentState });
    }

    const renderToggleButton = () => {
      let text = 'show example code';

      if (this.state.expanded) {
        text = 'hide example code';
      }

      return (
        <button
          className="codeblock-toggle-button"
          onClick={() => { toggleExpansion() }}
        >
          {text}
        </button>
      )
    }

    return (
      <div className="codeblock-container">
        {renderSnippets()}
        <div className="codeblock-footer">
          {renderTabs()}
          {renderToggleButton()}
        </div>
      </div>
    );
  }
};

export default Specimen()(CodeTabbed);
