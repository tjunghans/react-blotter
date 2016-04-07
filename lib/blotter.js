import { createClass, DOM as dom, PropTypes as propTypes, createElement }
  from 'react';

const Header = createClass({
  displayName: 'BlotterHeader',
  propTypes: {
    columnConfig: propTypes.object.isRequired
  },
  render() {
    const configs = this.props.columnConfig;
    const cols = Object.keys(configs).map((id) => {
      const config = configs[id];
      return dom.th({ key: id, className: config.className },
        config.header);
    });
    return (
      dom.tr(null, cols)
    );
  }
});

export default createClass({
  displayName: 'Blotter',
  propTypes: {
    columnConfig: propTypes.object.isRequired,
    rowComponent: propTypes.func.isRequired,
    data: propTypes.array,
    cssClass: propTypes.string
  },
  render() {
    const p = this.props;
    const data = p.data || [];
    function makeDataRow(data, index) {
      return createElement(p.rowComponent, { key: index, data });
    }
    const className = ['blotter'];
    className.push(p.cssClass);
    return (
      dom.div({ className: className.join(' ') },
        dom.table(null,
          dom.thead(null, createElement(Header, {
            columnConfig: p.columnConfig
          })),
          dom.tbody(null, data.map(makeDataRow))
        )
      )
    );
  }
});
