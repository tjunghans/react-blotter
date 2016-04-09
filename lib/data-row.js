import { createClass, DOM as dom, PropTypes as propTypes } from 'react';

export default createClass({
  displayName: 'BlotterRow',
  propTypes: {
    columnConfig: propTypes.object.isRequired,
    data: propTypes.object,
    formatRow: propTypes.func
  },
  render() {
    const p = this.props;
    const data = p.formatRow ? p.formatRow(p.data) : p.data;
    const tds = Object.keys(p.columnConfig).map((col, index) => {
      const c = p.columnConfig[col];
      const val = c.markup ? c.markup.bind(this)(data, p) : data[col];
      return dom.td({
        key: index,
        className: c.className
      }, val);
    });

    let rowConfig = null;
    if (data.rowClassName) {
      rowConfig = {
        className: data.rowClassName
      };
    }
    return (
      dom.tr(rowConfig, tds)
    );
  }
});
