"use client";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface Props {
  expenses: YearlyExpense[];
}

const chartConfig = {
  visitors: {
    label: "Spent",
  },
  Jan: { label: "Jan", color: "hsl(var(--chart-1))" },
  Feb: { label: "Feb", color: "hsl(var(--chart-2))" },
  Mar: { label: "Mar", color: "hsl(var(--chart-3))" },
  Apr: { label: "Apr", color: "hsl(var(--chart-4))" },
  May: { label: "May", color: "hsl(var(--chart-5))" },
  Jun: { label: "Jun", color: "hsl(var(--chart-1))" },
  Jul: { label: "Jul", color: "hsl(var(--chart-2))" },
  Aug: { label: "Aug", color: "hsl(var(--chart-3))" },
  Sep: { label: "Sep", color: "hsl(var(--chart-4))" },
  Oct: { label: "Oct", color: "hsl(var(--chart-5))" },
  Nov: { label: "Nov", color: "hsl(var(--chart-1))" },
  Dec: { label: "Dec", color: "hsl(var(--chart-2))" },
};

export function YearlyExpensesTrackingChart({ expenses }: Props) {
  const chartData = [
    { month: "Jan", visitors: expenses["1"], fill: "hsl(var(--chart-1))" },
    { month: "Feb", visitors: expenses["2"], fill: "hsl(var(--chart-2))" },
    { month: "Mar", visitors: expenses["3"], fill: "hsl(var(--chart-3))" },
    { month: "Apr", visitors: expenses["4"], fill: "hsl(var(--chart-4))" },
    { month: "May", visitors: expenses["5"], fill: "hsl(var(--chart-5))" },
    { month: "Jun", visitors: expenses["6"], fill: "hsl(var(--chart-1))" },
    { month: "Jul", visitors: expenses["7"], fill: "hsl(var(--chart-2))" },
    { month: "Aug", visitors: expenses["8"], fill: "hsl(var(--chart-3))" },
    { month: "Sep", visitors: expenses["9"], fill: "hsl(var(--chart-4))" },
    { month: "Oct", visitors: expenses["10"], fill: "hsl(var(--chart-5))" },
    { month: "Nov", visitors: expenses["11"], fill: "hsl(var(--chart-1))" },
    { month: "Dec", visitors: expenses["12"], fill: "hsl(var(--chart-2))" },
  ];

  return (
    <Card className="min-w-[35rem] scale-80">
      <CardHeader>
        <CardTitle>Bar Chart - Active</CardTitle>
        <CardDescription>Current Year - 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeBar={({ ...props }) => {
                return <Rectangle {...props} fillOpacity={0.8} stroke={props.payload.fill} strokeDasharray={4} strokeDashoffset={4} />;
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
