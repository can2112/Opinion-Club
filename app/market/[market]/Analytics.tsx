import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import nextClient from "@/utils/clients/nextClient";
import { useEffect, useState } from "react";

import { formatDate } from "@/utils/common/formatDate";
import { Ticker } from "./types";

export const description = "A multiple line chart";

const chartConfig = {
  yes: {
    label: "yes",
    color: "hsl(var(--chart-2))",
  },
  no: {
    label: "no",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Analaytics({
  questionId,
  outcomeIndex,
}: {
  questionId: string;
  outcomeIndex: number;
}) {
  const [chartData, setChartData] = useState();
  const { data, refetch } = useQuery({
    queryKey: ["fetchTicker"],
    queryFn: async () => {
      const response = await nextClient.post("/api/fetch-ticker", {
        questionId,
        outcomeIndex,
      });
      return response.data;
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function convertChartData(data: any) {
    if (!data) return;
    const TokensData = data[0]?.map((res: Ticker, index: number) => {
      const date = formatDate(res.timestamp, true);
      const sellData = data[1];
      return {
        timeStamp: date,
        yes: parseFloat(res?.buy)?.toFixed(2),
        no: parseFloat(sellData[index]?.buy).toFixed(2),
      };
    });
    setChartData(TokensData);
  }

  useEffect(() => {
    convertChartData(data?.data);
  }, [data?.data]);

  useEffect(() => {
    const intervalId = setInterval(refetch, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-2">
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
            top: 2,
            bottom: 2,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="timeStamp"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="yes"
            type="monotone"
            stroke="var(--color-yes)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="no"
            type="monotone"
            stroke="var(--color-no)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
      <section className="flex justify-center mt-5 gap-4 items-center">
        <section className="flex gap-3 items-center">
          Yes <div className="bg-[hsl(var(--chart-2))] h-4 rounded-sm w-4 " />
        </section>
        <section className="flex gap-3 items-center">
          No <div className="bg-[hsl(var(--chart-1))] h-4 rounded-sm w-4 " />
        </section>
      </section>
    </div>
  );
}
