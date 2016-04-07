import { createClass, DOM as dom, PropTypes as propTypes } from 'react';

export default createClass({
  displayName: 'Blotter',
  propTypes: {
    columnConfig: propTypes.object.isRequired, // should be shape
    data: propTypes.oneOfType([
      propTypes.object,
      propTypes.array
    ]),
    dataFormatter: propTypes.func,
    cssClass: propTypes.string
  },
  render() {
    const p = this.props;
    const colIds = Object.keys(p.columnConfig);
    const data = p.data || [];
    const formattedData = p.dataFormatter ? p.dataFormatter(data) : data;

    const headerCols = colIds.map((colId) => {
      const config = p.columnConfig[colId];
      const elemConfig = {};
      elemConfig.className = config.className;
      elemConfig.key = colId;
      return dom.th(elemConfig, config.header || colId);
    });

    function makeDataRow(data, index) {
      const bodyCols = colIds.map((colId) => {
        const elemConfig = {};
        elemConfig.className = p.columnConfig[colId].className;
        elemConfig.key = colId;
        return dom.td(elemConfig, data[colId]);
      });
      return dom.tr({ key: index }, bodyCols);
    }

    const className = ['blotter'];
    className.push(p.cssClass);
    return (
      dom.div({ className: className.join(' ') },
        dom.table(null,
          dom.thead(null, dom.tr(null, headerCols)),
          dom.tbody(null, formattedData.map(makeDataRow))
        )
      )
    );
  }
});
