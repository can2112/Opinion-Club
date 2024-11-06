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
import { useEffect } from "react";

import { formatDate } from "@/utils/common/formatDate";
import { Ticker } from "./types";

export const description = "A multiple line chart";

const chartConfig = {
  buy: {
    label: "buy",
    color: "hsl(var(--chart-2))",
  },
  sell: {
    label: "sell",
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

  function convertChartData(data: Ticker[]) {
    if (!data) return;
    const newData = data?.map((res: Ticker) => {
      const formatedDate = formatDate(res.timestamp, true);
      return {
        timeStamp: formatedDate,
        buy: parseFloat(res.buy).toFixed(2),
        sell: parseFloat(res.sell).toFixed(2),
      };
    });

    return newData;
  }

  const chartDataV1 = convertChartData(data?.data);

  useEffect(() => {
    const intervalId = setInterval(refetch, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="shadow-none  ">
      <CardHeader>
        <CardTitle className="flex gap-2">
          <section className="flex gap-3">
            Buy <div className="bg-[hsl(var(--chart-2))] h-4 rounded-sm w-4 " />
          </section>
          <section className="flex gap-3">
            Sell{" "}
            <div className="bg-[hsl(var(--chart-1))] h-4 rounded-sm w-4 " />
          </section>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartDataV1}
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
              dataKey="buy"
              type="monotone"
              stroke="var(--color-buy)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="sell"
              type="monotone"
              stroke="var(--color-sell)"
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
              {outcomeIndex == 0 ? "Yes" : "No"} token buy sell data{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground"></div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
