import { ArcElement, CategoryScale, Chart as ChartJs, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { orange } from "../../constants/Color";
import { last7dayes } from "../../lib/Features";

ChartJs.register(Tooltip, Filler, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Legend);


const labels = last7dayes();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { title: false }
  },
  scales: {
    x: {
      grid: {
        display: false,
      }
    },
    y: {
      beginAtZero: true,
      grid: { display: false }
    }
  }
}

const LineChart = ({ value = [] }) => {

  const dataV = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: '#f1f1f1', // green
        label: 'Message',
        fill: true,
        borderColor: "red",
      },
    ]
  }

  return < Line data={dataV} options={lineChartOptions} />
}

const DoughnutChatOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    }
  },
  cutout: 90
}


const DoughnutChart = ({ value = [], label = [] }) => {

  const dataV = {
    labels: label,
    datasets: [
      {
        data: value,
        label: 'Total chats Vs Group chats',
        borderColor: ["red", "#3e95cd"],
        backgroundColor: [orange, "#d9edf7"],
        offset: 40,
      },
    ]
  }

  return < Doughnut style={{ zIndex: 10 }} data={dataV} options={DoughnutChatOptions} />;
}




export { DoughnutChart, LineChart };
