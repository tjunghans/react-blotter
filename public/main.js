/*eslint-env browser*/
import React from 'react';
import Blotter from '..';
const DOM = React.DOM;
const propTypes = React.PropTypes;

// Example 1
React.render(React.createElement(Blotter, {
  columnConfig: {
    type: {
      header: 'Type',
      className: 'type'
    },
    time: {
      className: 'time maturity',
      header: DOM.span({ style: { color: 'green' } }, 'Time'),
      markup: function (data) {
        return DOM.div({ className: 'value' }, data)
      }
    },
    client: {
      className: 'client',
      header: 'Client',
      markup: function (data) {
        return DOM.div({ className: 'value' }, data)
      }
    }
  },
  data: {
    rows: [
      {
        type: 'Spot',
        maturity: '2016-04-04T13:10:53+02:00',
        client: 'Thomas Junghans'
      }, {
        type: 'Forward',
        client: 'Danail Irinchev'
      }
    ]
  },
  dataFormatter(data) {
    return data.rows.map((row) => {
      return {
        type: row.type,
        time: row.maturity || 'n/a',
        client: row.client
      };
    });
  }
}), document.querySelector('#blotter-1'));


