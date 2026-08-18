"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const data = {
  labels: [
    "08:00",
    "08:10",
    "08:20",
    "08:30",
    "08:40",
    "08:50",
    "09:00",
    "09:10",
    "09:20",
    "09:30",
    "09:40",
    "09:50",
  ],

  datasets: [
    {
      label: "Voltage (kV)",
      data: [
        11.1,
        11.0,
        11.2,
        10.9,
        10.8,
        10.7,
        10.5,
        10.4,
        10.6,
        10.3,
        10.2,
        10.1,
      ],
      borderColor: "#22c55e",
      backgroundColor: "#22c55e",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: "#22c55e",
      pointBorderColor: "#22c55e",
    },

    {
      label: "Current (A)",
      data: [
        180,
        185,
        190,
        195,
        205,
        215,
        225,
        240,
        235,
        250,
        260,
        275,
      ],
      borderColor: "#3b82f6",
      backgroundColor: "#3b82f6",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: "#3b82f6",
      pointBorderColor: "#3b82f6",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top" as const,

      labels: {
        color: "#cbd5e1",
        padding: 20,
        font: {
          size: 13,
        },
      },
    },

    tooltip: {
      mode: "index" as const,
      intersect: false,

      backgroundColor: "#0f172a",
      titleColor: "#ffffff",
      bodyColor: "#cbd5e1",
      borderColor: "#334155",
      borderWidth: 1,
    },
  },

  interaction: {
    mode: "index" as const,
    intersect: false,
  },

  scales: {
    x: {
      ticks: {
        color: "#94a3b8",
      },

      grid: {
        color: "rgba(148, 163, 184, 0.08)",
      },

      border: {
        color: "#334155",
      },
    },

    y: {
      beginAtZero: false,

      ticks: {
        color: "#94a3b8",
      },

      grid: {
        color: "rgba(148, 163, 184, 0.08)",
      },

      border: {
        color: "#334155",
      },
    },
  },
};

export default function ElectricalChart() {
  return (
    <div className="h-full w-full">
      <Line data={data} options={options} />
    </div>
  );
}