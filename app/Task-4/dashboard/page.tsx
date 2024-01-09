"use client";
import React from "react";
import { BarChart, Card, Subtitle, Title, Text } from "@tremor/react";

interface ChartData {
  name: string;
  Revenue: number;
}

const chartdata: ChartData[] = [
  { name: "Everett", Revenue: 120000 },
  { name: "Seattle", Revenue: 100000 },
  { name: "Lynnwood", Revenue: 48000 },
  { name: "Bothell", Revenue: 46500 },
  { name: "Mukiteo", Revenue: 45000 },
  { name: "Edmonds", Revenue: 38000 },
];

const chartTwodata: ChartData[] = [
  { name: "Service Plumbing", Revenue: 163000 },
  { name: "Bid Work HVAC", Revenue: 130000 },
  { name: "Service HVAC", Revenue: 90000 },
  { name: "Bid Work Plumbing", Revenue: 83000 },
  { name: "HWT Replacement", Revenue: 40000 },
  { name: "Material Sale", Revenue: 3000 },
];

const valueFormatter = (number: number) =>
  `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

const MetricsCard: React.FC<{
  value: string;
  subtitle: string;
  color?: string;
}> = ({ value, subtitle, color = "green" }) => (
  <Card className="mx-auto" decoration="left" decorationColor={"green"}>
    <Text className="text-white">{value}</Text>
    <Subtitle>{subtitle}</Subtitle>
  </Card>
);

const Dashboard: React.FC = () => (
  <main className="p-4 flex justify-between bg-slate-800 min-h-screen h-full items-center">
    <div className="container mx-auto">
      <section className="flex flex-col">
        <Title className="mb-4 text-white">Company Metrics</Title>
        <div className="grid sm:grid-cols-2  lg:grid-cols-4 gap-3 mb-10">
          <MetricsCard value="$406,411.29" subtitle="Total Revenue" />
          <MetricsCard value="$620" subtitle="Total Jobs Avg" />
          <MetricsCard value="655" subtitle="Tickets Created" />
          <MetricsCard value="735" subtitle="Ticket Scheduled" />
          <MetricsCard
            value="$110,448.8"
            subtitle="Outstanding Amount"
            color="red"
          />
          <MetricsCard value="105" subtitle="Membership sold" />
          <MetricsCard value="436" subtitle="Job Completed" />
          <MetricsCard value="65" subtitle="Total Canceled" />
        </div>
      </section>
      <section>
        <div className="grid gap-3 mt-8 lg:grid-cols-2">
          <Card>
            <Title>Revenue by job location</Title>
            <BarChart
              className="mt-6"
              data={chartdata}
              layout="vertical"
              index="name"
              categories={["Revenue"]}
              colors={["green"]}
              valueFormatter={valueFormatter}
              yAxisWidth={48}
            />
          </Card>
          <Card>
            <Title>Revenue by job type</Title>
            <BarChart
              className="mt-6"
              data={chartTwodata}
              layout="vertical"
              index="name"
              categories={["Revenue"]}
              colors={["green"]}
              valueFormatter={valueFormatter}
              yAxisWidth={48}
            />
          </Card>
        </div>
      </section>
    </div>
  </main>
);

export default Dashboard;
