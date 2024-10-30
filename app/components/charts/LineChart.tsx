"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import nextClient from "@/utils/clients/nextClient";
import { formatDate } from "@/utils/common/formatDate";
import { useEffect } from "react";
import { Ticker } from "./types";

const chartConfig = {
  buy: {
    label: "Buy",
    color: "#42c55e",
  },
  sell: {
    label: "Sell",
    color: "#ef4544",
  },
} satisfies ChartConfig;

function convertChartData(data: Ticker[]) {
  if (!data) return;
  const newData = data.map((res: Ticker) => {
    const formatedDate = formatDate(res.timestamp, true);
    return {
      timeStamp: formatedDate,
      buy: parseFloat(res.buy).toFixed(2),
      sell: parseFloat(res.sell).toFixed(2),
    };
  });

  return newData;
}

export function LineChart({
  questionId,
  outcomeIndex,
}: {
  questionId: string;
  outcomeIndex: number;
}) {
  const { data, refetch } = useQuery({
    queryKey: ["fetchTicker"],
    queryFn: async () => {
      const response = await nextClient.post("fetch-ticker", {
        questionId,
        outcomeIndex,
      });
      return response.data;
    },
  });

  const chartDataV1 = convertChartData(data?.data);

  useEffect(() => {
    const intervalId = setInterval(refetch, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartDataV1}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="timeStamp"
          tickLine={true}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 5)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="buy" fill="var(--color-buy)" radius={4} />
        <Bar dataKey="sell" fill="var(--color-sell)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
