import { createClass, DOM as dom, PropTypes as propTypes, createElement }
  from 'react';
import objectAssign from 'object-assign';
import headerRow from './header-row';
import dataRow from './data-row';

function getWidthParams(colConfig) {
  const widthValues = {};
  ['width', 'minWidth', 'maxWidth'].forEach((param) => {
    if (colConfig[param]) {
      widthValues[param] = colConfig[param];
    }
  });
  return widthValues;
}

function calcColumnWidths(widthValues, tableWidth) {
  const defaultMinWidth = 10;
  // min width (a) determined by calculating all widths and min widths
  let minWidth = 0;
  let nullColumns = [];
  const colWidths = [];
  widthValues.forEach((col, index) => {
    let colWidth = null;
    if (col.minWidth) {
      colWidth = col.minWidth
    } else if (col.width) {
      colWidth = col.width;
    } else {
      nullColumns.push(index);
    }
    minWidth += colWidth;
    colWidths.push(colWidth);
  });
  // determine leftover space (b) by deducting min width (a) from table width
  let leftover = tableWidth - minWidth;
  if (leftover < 0) { leftover = 0; }
  const nullColumnWidth = leftover / nullColumns.length;
  // divide (b) amongst columns without width and maxWidth
  nullColumns.forEach((i) => {
    colWidths[i] = nullColumnWidth;
  });

  // making sure none of max Width columns receive more
  // Determine leftover - in the case that all columns left for (b) calculation
  // have a maxWidth that add up to less then the table width including the
  // other columns with width and min Width.
  // If there is a delta, increase the max Width columns evenly
  return colWidths;
}

function calcTableWidth(columnWidths) {
  return columnWidths.reduce((prev, next) => { return prev + next}, 0);
}

function getColumnWidths(config) {
  const columns = [];
  Object.keys(config).forEach((col) => {
    const colConfig = config[col];
    if (colConfig.columns) {
      Object.keys(colConfig.columns).forEach((subCol) => {
        columns.push(getWidthParams(colConfig.columns[subCol]));
      });
    } else {
      columns.push(getWidthParams(colConfig));
    }
  });
  return columns;
}

function createColgroup(columns) {
  return dom.colgroup(null, columns.map((width, index) => {
    return dom.col({ key: index, width: width || 'auto' });
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
  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  },
  componentDidUpdate() {
    console.log('componentDidUpdate');
  },
  getInitialState() {
    return {
      tableWidth: '100%'
    }
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
    let colWidths = getColumnWidths(p.columnConfig);
    if (this.state.colWidths) {
      colWidths = this.state.colWidths;
    }
    const colgroup = createColgroup(colWidths);

    return (
      dom.div({ className: className.join(' '), ref: (ref) => {
        this.blotter = ref;
      } },
        dom.table({
          ref: (ref) => {
            this.table = ref;
          }
        },
          colgroup,
          dom.thead(null, createElement(headerRow, {
            columnConfig: p.columnConfig
          })),
          dom.tbody(null, data.map(makeDataRow))
        )
      )
    );
  },
  _resize() {
    if (this.blotter) {
      this._setColgroupWidths(this.blotter.clientWidth)
    }
  },
  _setColgroupWidths(width) {
    const colWidths
      = calcColumnWidths(getColumnWidths(this.props.columnConfig), width);
    this.setState({
      colWidths
    });
  }
});
