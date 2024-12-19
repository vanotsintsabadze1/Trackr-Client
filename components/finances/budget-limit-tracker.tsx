"use client";

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Pencil } from "lucide-react";
import { useState } from "react";
import BudgetLimitChangingModal from "./budget-limit-changing-modal";

interface Props {
  spent: number;
  limit: number;
}

const chartConfig = {
  spent: {
    label: "Spent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function BudgetLimitTracker({ spent, limit }: Props) {
  const chartData = [{ name: "Spent", value: spent, fill: "red" }];
  const [modalOpen, setOpen] = useState(false);
  const percentage = (spent / limit) * 100;
  const remainingPercentage = 100 - percentage;

  function handleEditLimit() {
    setOpen(true);
  }

  return (
    <>
      {modalOpen && <BudgetLimitChangingModal initLimit={limit} setOpen={setOpen} open={modalOpen} />}
      <Card className="flex flex-col flex-grow w-full h-fit">
        <CardHeader className="items-center pb-0">
          <CardTitle className="flex items-center gap-2">
            Spending Limit Tracker{" "}
            <button onClick={handleEditLimit} className="hover:scale-105 duration-100 ease-in-out">
              <Pencil color="gray" size={15} />
            </button>
          </CardTitle>
          <CardDescription>Current Month</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[200px]">
            <RadialBarChart data={chartData} startAngle={90} endAngle={90 - (percentage / 100) * 360} innerRadius={80} outerRadius={110}>
              <PolarGrid gridType="circle" radialLines={false} stroke="lightgray" className="" polarRadius={[86, 74]} />
              <RadialBar dataKey="value" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx!} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx!} y={viewBox.cy! - 20} className="text-2xl font-bold truncate">
                            ${spent.toFixed(2)}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 10} className="fill-text-sm">
                            spent of ${limit}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 30} className="fill-text-sm">
                            {percentage.toFixed(1)}% used
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">${(limit - spent).toFixed(2)} remaining</div>
          <div className="leading-none text-muted-foreground">{remainingPercentage.toFixed(1)}% of your budget left</div>
        </CardFooter>
      </Card>
    </>
  );
}
