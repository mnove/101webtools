"use client";

import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "./custom.css";
import NanoidGenerator from "../nanoid-generator";
import { Grip } from "lucide-react";

// Create a responsive grid layout with width provider
const ResponsiveGridLayout = WidthProvider(Responsive);

const DragHandle = () => {
  return (
    <div className="drag-handle">
      <div className="flex gap-2 cursor-pointer">
        <Grip /> DRAG
      </div>
    </div>
  );
};

// Sample widget components
const StatCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) => (
  <div
    className="h-full w-full p-4 rounded-lg"
    style={{ backgroundColor: color }}
  >
    <DragHandle />
    <h3 className="text-lg font-medium ">{title}</h3>
    <p className="text-3xl font-bold  mt-2">{value}</p>
  </div>
);

const ChartWidget = ({ title }: { title: string }) => (
  <div className="h-full w-full p-4 rounded-lg border">
    <h3 className="text-lg font-medium mb-4">{title}</h3>
    <div className="h-40  rounded flex items-center justify-center">
      Chart Placeholder
    </div>
  </div>
);

const TableWidget = () => (
  //   <div className="h-full w-full p-4 rounded-lg border overflow-auto">
  //     <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
  //     <table className="min-w-full">
  //       <thead>
  //         <tr>
  //           <th className="px-4 py-2 border-b">ID</th>
  //           <th className="px-4 py-2 border-b">Name</th>
  //           <th className="px-4 py-2 border-b">Status</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {[1, 2, 3].map((item) => (
  //           <tr key={item}>
  //             <td className="px-4 py-2 border-b">{item}</td>
  //             <td className="px-4 py-2 border-b">Item {item}</td>
  //             <td className="px-4 py-2 border-b">Active</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>

  <div className="h-full w-full p-4 rounded-lg border overflow-auto">
    <NanoidGenerator />
  </div>
);

interface DashboardProps {
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ className = "" }) => {
  // Default layout configuration
  const layouts = {
    lg: [
      { i: "sales", x: 0, y: 0, w: 3, h: 2 },
      { i: "users", x: 3, y: 0, w: 3, h: 2 },
      { i: "revenue", x: 6, y: 0, w: 3, h: 2 },
      { i: "chart1", x: 0, y: 2, w: 6, h: 4 },
      { i: "table", x: 6, y: 2, w: 6, h: 4 },
      { i: "chart2", x: 0, y: 6, w: 12, h: 4 },
    ],
    md: [
      { i: "sales", x: 0, y: 0, w: 4, h: 2 },
      { i: "users", x: 4, y: 0, w: 4, h: 2 },
      { i: "revenue", x: 8, y: 0, w: 4, h: 2 },
      { i: "chart1", x: 0, y: 2, w: 6, h: 4 },
      { i: "table", x: 6, y: 2, w: 6, h: 4 },
      { i: "chart2", x: 0, y: 6, w: 12, h: 4 },
    ],
    sm: [
      { i: "sales", x: 0, y: 0, w: 6, h: 2 },
      { i: "users", x: 6, y: 0, w: 6, h: 2 },
      { i: "revenue", x: 0, y: 2, w: 12, h: 2 },
      { i: "chart1", x: 0, y: 4, w: 12, h: 4 },
      { i: "table", x: 0, y: 8, w: 12, h: 4 },
      { i: "chart2", x: 0, y: 12, w: 12, h: 4 },
    ],
    xs: [
      { i: "sales", x: 0, y: 0, w: 12, h: 2 },
      { i: "users", x: 0, y: 2, w: 12, h: 2 },
      { i: "revenue", x: 0, y: 4, w: 12, h: 2 },
      { i: "chart1", x: 0, y: 6, w: 12, h: 4 },
      { i: "table", x: 0, y: 10, w: 12, h: 4 },
      { i: "chart2", x: 0, y: 14, w: 12, h: 4 },
    ],
  };

  const [currentLayouts, setCurrentLayouts] = useState(layouts);

  const handleLayoutChange = (layout: any, layouts: any) => {
    setCurrentLayouts(layouts);
  };

  return (
    <div className={`p-4  min-h-screen ${className}`}>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <ResponsiveGridLayout
        className="layout"
        layouts={currentLayouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
        rowHeight={60}
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={true}
        margin={[16, 16]}
        draggableHandle=".drag-handle"
      >
        <div key="sales">
          <StatCard title="Total Sales" value="$24,568" color="#4f46e5" />
        </div>
        <div key="users">
          <StatCard title="Active Users" value="1,245" color="#0891b2" />
        </div>
        <div key="revenue">
          <StatCard title="Revenue" value="$12,345" color="#16a34a" />
        </div>
        <div key="chart1">
          <ChartWidget title="Sales Overview" />
        </div>
        <div key="table">
          <TableWidget />
        </div>
        <div key="chart2">
          <ChartWidget title="Monthly Performance" />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
