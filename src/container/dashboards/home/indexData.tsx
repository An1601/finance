import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface spark3 {
  options?: ApexOptions;
  width?: string | number;
  height?: string | number;
  series?: ApexOptions["series"];
  [key: string]: any;
  label?: XAxisAnnotations;
  endingShape?: string;
}
export class Revenueanalytics extends Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [
        {
          type: "line",
          name: "Profit",
          data: [
            {
              x: "Jan",
              y: 100,
            },
            {
              x: "Feb",
              y: 210,
            },
            {
              x: "Mar",
              y: 180,
            },
            {
              x: "Apr",
              y: 454,
            },
            {
              x: "May",
              y: 230,
            },
            {
              x: "Jun",
              y: 320,
            },
            {
              x: "Jul",
              y: 656,
            },
            {
              x: "Aug",
              y: 830,
            },
            {
              x: "Sep",
              y: 350,
            },
            {
              x: "Oct",
              y: 350,
            },
            {
              x: "Nov",
              y: 210,
            },
            {
              x: "Dec",
              y: 410,
            },
          ],
        },
        {
          type: "line",
          name: "Revenue",
          data: [
            {
              x: "Jan",
              y: 180,
            },
            {
              x: "Feb",
              y: 620,
            },
            {
              x: "Mar",
              y: 476,
            },
            {
              x: "Apr",
              y: 220,
            },
            {
              x: "May",
              y: 520,
            },
            {
              x: "Jun",
              y: 780,
            },
            {
              x: "Jul",
              y: 435,
            },
            {
              x: "Aug",
              y: 515,
            },
            {
              x: "Sep",
              y: 738,
            },
            {
              x: "Oct",
              y: 454,
            },
            {
              x: "Nov",
              y: 525,
            },
            {
              x: "Dec",
              y: 230,
            },
          ],
        },
        {
          type: "area",
          name: "Sales",
          data: [
            {
              x: "Jan",
              y: 200,
            },
            {
              x: "Feb",
              y: 530,
            },
            {
              x: "Mar",
              y: 110,
            },
            {
              x: "Apr",
              y: 130,
            },
            {
              x: "May",
              y: 480,
            },
            {
              x: "Jun",
              y: 520,
            },
            {
              x: "Jul",
              y: 780,
            },
            {
              x: "Aug",
              y: 435,
            },
            {
              x: "Sep",
              y: 475,
            },
            {
              x: "Oct",
              y: 738,
            },
            {
              x: "Nov",
              y: 454,
            },
            {
              x: "Dec",
              y: 480,
            },
          ],
        },
      ],
      options: {
        chart: {
          height: 350,
          animations: {
            speed: 500,
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 8,
            left: 0,
            blur: 3,
            color: "#000",
            opacity: 0.1,
          },
          toolbar: {
            show: false,
          },
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            },
          },
        },
        colors: [
          "rgb(132, 90, 223)",
          "rgba(35, 183, 229, 0.85)",
          "rgba(119, 119, 142, 0.05)",
        ],
        dataLabels: {
          enabled: false,
        },
        grid: {
          borderColor: "#f1f1f1",
          strokeDashArray: 3,
        },
        stroke: {
          curve: "smooth",
          width: [2, 2, 0],
          dashArray: [0, 5, 0],
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return "$" + value;
            },
          },
        },
        tooltip: {
          y: [
            {
              formatter: function (e) {
                return void 0 !== e ? "$" + e.toFixed(0) : e;
              },
            },
            {
              formatter: function (e) {
                return void 0 !== e ? "$" + e.toFixed(0) : e;
              },
            },
            {
              formatter: function (e) {
                return void 0 !== e ? e.toFixed(0) : e;
              },
            },
          ],
        },
        legend: {
          show: true,
          customLegendItems: ["Profit", "Revenue", "Sales"],
          inverseOrder: true,
        },
        title: {
          text: "Revenue Analytics with sales & profit (USD)",
          align: "left",
          style: {
            fontSize: ".8125rem",
            fontWeight: "semibold",
            color: "#8c9097",
          },
        },
        markers: {
          hover: {
            sizeOffset: 5,
          },
        },
      },
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}

export class Sourcedata extends Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [32, 27, 25, 16],
      options: {
        labels: ["My First Dataset"],
        chart: {
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            },
          },
          height: 250,
          type: "donut",
        },
        dataLabels: {
          enabled: false,
        },

        legend: {
          show: false,
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "round",
          colors: ["#fff"],
          width: 0,
          dashArray: 0,
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: "70%",
              labels: {
                show: false,
                name: {
                  show: true,
                  fontSize: "20px",
                  color: "#495057",
                  offsetY: -4,
                },
                value: {
                  show: true,
                  fontSize: "18px",
                  color: undefined,
                  offsetY: 8,
                  formatter: function (val) {
                    return val + "%";
                  },
                },
              },
            },
          },
        },
        colors: ["rgb(35, 183, 229)", "rgb(38, 191, 148)", "#F65160"],
      },
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height={250}
        />
      </div>
    );
  }
}

export class SourceBankdata extends Component<{}, spark3> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      series: [45, 55],
      options: {
        labels: ["My First Dataset"],
        chart: {
          events: {
            mounted: (chart: any) => {
              chart.windowResizeHandler();
            },
          },
          height: 250,
          type: "donut",
        },
        dataLabels: {
          enabled: false,
        },

        legend: {
          show: false,
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "round",
          colors: ["#fff"],
          width: 0,
          dashArray: 0,
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: "70%",
              labels: {
                show: false,
                name: {
                  show: true,
                  fontSize: "20px",
                  color: "#495057",
                  offsetY: -4,
                },
                value: {
                  show: true,
                  fontSize: "18px",
                  color: undefined,
                  offsetY: 8,
                  formatter: function (val) {
                    return val + "%";
                  },
                },
              },
            },
          },
        },
        colors: ["rgb(35, 183, 229)", "rgb(38, 191, 148)"],
      },
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height={250}
        />
      </div>
    );
  }
}
