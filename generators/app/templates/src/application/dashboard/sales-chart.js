import { Component, html } from 'component'
import Chart from 'chart.js'

class SalesChart extends Component {
  constructor() {
    super()
    this.style.display = 'block'
  }

  firstUpdated() {
    // Graphs
    const ctx = this.renderRoot.querySelector('canvas')
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff',
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    })
  }

  render() {
    return html`
      <canvas class="my-4 w-100" width="900" height="380"></canvas>
    `
  }
}

customElements.define('sales-chart', SalesChart)

export { SalesChart }
