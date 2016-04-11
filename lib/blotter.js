import { createClass, DOM as dom, PropTypes as propTypes, createElement }
  from 'react';
import objectAssign from 'object-assign';
import headerRow from './header-row';
import dataRow from './data-row';

function createColgroup(config) {
  const columns = [];
  Object.keys(config).forEach((col) => {
    const colConfig = config[col];
    if (colConfig.columns) {
      Object.keys(colConfig.columns).forEach((subCol) => {
        columns.push(colConfig.columns[subCol].width || 'auto');
      });
    } else {
      columns.push(config[col].width || 'auto');
    }
  });

  return dom.colgroup(null, columns.map((col, index) => {
    return dom.col({ key: index, width: col });
  }));
}

export default createClass({
  displayName: 'Blotter',
  propTypes: {
    columnConfig: propTypes.object.isRequired,
    data: propTypes.array,
    cssClass: propTypes.string,
    formatRow: propTypes.func
  },
  render() {
    const p = this.props;
    const data = p.data || [];
    function makeDataRow(data, index) {
      return createElement(dataRow, objectAssign({}, p, {
        key: index, data
      }));
    }
    const className = ['blotter'];
    className.push(p.cssClass);
    const colgroup = createColgroup(p.columnConfig);

    return (
      dom.div({ className: className.join(' ') },
        dom.table(null,
          colgroup,
          dom.thead(null, createElement(headerRow, {
            columnConfig: p.columnConfig
          })),
          dom.tbody(null, data.map(makeDataRow))
        )
      )
    );
  }
});
