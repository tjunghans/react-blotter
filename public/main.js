/*eslint-env browser*/
import React from 'react';
import ReactDOM from 'react-dom';
import Blotter from '..';
const DOM = React.DOM;

const data = {
  rows: [
    {
      tradeId: 0,
      type: 'Spot',
      maturity: '2016-04-04T13:10:53+02:00',
      client: 'Thomas Junghans'
    }, {
      tradeId: 1,
      type: 'Forward',
      client: 'Max Muster'
    }
  ]
};

function deleteRow(id) {
  console.log(`delete ${id}`);
}

function formatRow(data) {
  return {
    id: data.id,
    type: data.type,
    time: data.maturity || 'n/a',
    client: data.client
  };
}

const Row = React.createClass({
  displayName: 'BlotterRow',
  propTypes: {
    data: React.PropTypes.object
  },
  render() {
    const p = this.props;
    const data = formatRow(p.data);
    return (
      React.DOM.tr(null,
        React.DOM.td({ className: 'type' }, data.type),
        React.DOM.td({ className: 'time maturity' },
          DOM.div({ className: 'value' }, data.time)),
        React.DOM.td({ className: 'client' },
          DOM.div({ className: 'value' }, data.client)),
        React.DOM.td({ className: 'action' },
          DOM.button({ onClick: this._onDelete }, 'delete'))
      )
    );
  },
  _onDelete() {
    deleteRow(this.props.data.tradeId);
  }
});


// Example 1
ReactDOM.render(React.createElement(Blotter, {
  columnConfig: {
    type: {
      header: 'Type',
      className: 'type'
    },
    time: {
      className: 'time maturity',
      header: DOM.span({ style: { color: 'green' } }, 'Time'),
      markup(row) {
        return DOM.div({ className: 'value' }, row.time);
      }
    },
    client: {
      className: 'client',
      header: 'Client',
      markup(row) {
        return DOM.div({ className: 'value' }, row.client);
      }
    },
    action: {
      className: 'action',
      header: 'Action',
      markup(row) {
        return DOM.button(null, 'delete');
      }
    }
  },
  rowComponent: Row,
  data: data.rows
}), document.querySelector('#blotter-1'));
