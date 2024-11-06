import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      const response = await nextClient.post("fetch-ticker", {
        questionId,
        outcomeIndex,
      });
      return response.data;
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function convertChartData(data: any) {
    if (!data) return;
    console.log("re calling the function->");
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
  }, [data.data]);

  useEffect(() => {
    const intervalId = setInterval(refetch, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="shadow-none  ">
      <CardHeader>
        <CardTitle className="flex gap-2">
          <section className="flex gap-3">
            Yes <div className="bg-[hsl(var(--chart-2))] h-4 rounded-sm w-4 " />
          </section>
          <section className="flex gap-3">
            No <div className="bg-[hsl(var(--chart-1))] h-4 rounded-sm w-4 " />
          </section>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
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
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tokens data
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground"></div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
