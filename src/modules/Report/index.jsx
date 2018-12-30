import React, { Component } from 'react';

import Select from 'components/Select';
import HighChart from 'components/HighChart';
import products from 'data/products';
import './Report.css';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null,
      type: 'GOODS',
      products
    };

    [
      'onChangeYear',
      'onChangeType',
      'getYears',
      'getMaxYear'
    ].forEach(method => this[method] = this[method].bind(this));
  }

  getYears() {
    const years = this.state.products.map(p => p.year);
    return [...new Set(years)];
  }

  getMaxYear() {
    const years = this.getYears();
    return Math.max(...years);
  }

  onChangeYear(event) {
    this.setState({
      year: +event.target.value
    })
  }

  onChangeType(event) {
    this.setState({
      type: event.target.value
    })
  }

  getChartData(products, type, year) {
    const baseOptions = {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: 'Goods'
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
      },
    };

    const filteredProducts = products.filter(product => product.year === year);

    const typeOptions = {
      'GOODS': {
        xAxis: {
          title: {
            enabled: true,
            text: 'Feature 1'
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
        },
        yAxis: {
          title: {
            text: 'Feature 2'
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
        },
        series: filteredProducts.map(product => ({
          ...product,
          ...{ data: [[product.feature1, product.feature2]] }
        }))
      },
      'GOODS_CATEGORIES': {
        series: (() => {
          const typeFiltered = filteredProducts.reduce((acc, product) => {
            switch (true) {
              case (product.feature1 > 150):
                acc['greater'].data.push([product.feature1, product.feature2]);
                break;
              case (product.feature1 < 100):
                acc['less'].data.push([product.feature1, product.feature2]);
                break;
              default:
                acc['other'].data.push([product.feature1, product.feature2]);
                break;
            };
            return acc;
          }, {
            'greater': {
              name: 'feature1 greater > 150',
              data: []
            },
            'less': {
              name: 'feature1 less < 100',
              data: []
            },
            'other': {
              name: 'other',
              data: []
            }
          });

          return Object.keys(typeFiltered).map((key => typeFiltered[key]));
        })()
      }
    }

    return {
      ...baseOptions,
      ...typeOptions[type]
    };
  }

  render() {
    const {
      onChangeYear, onChangeType, getChartData,
      getYears, getMaxYear
    } = this;
    const { year, type, products } = this.state;
    const currentYear = year || getMaxYear();
    const chartOptions = getChartData(products, type, currentYear);

    return (
      <div className="Report">
        <div className="Report-Head">
          <h2 className="Report-Title">Report</h2>
          <div className="Report-Tools">
            <Select
              options={getYears().map(year => ({
                value: year,
                text: year
              }))}
              value={currentYear}
              name={"year"}
              onChange={onChangeYear}
            />
            <Select
              options={[
                { value: 'GOODS', text: 'goods' },
                { value: 'GOODS_CATEGORIES', text: 'goods categories' }
              ]}
              value={type}
              name="type"
              onChange={onChangeType}
            />
          </div>
        </div>
        <div className="Report-Body">
          <HighChart options={chartOptions} />
        </div>
      </div>
    );
  }
}

export default Report;