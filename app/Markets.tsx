"use client";
import nextClient from "@/utils/clients/nextClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import MarketCard from "./MarketCard";
import { CarouselPlugin } from "./Carousel";

const fetchActivities = async ({
  pageParam = null,
}: {
  pageParam: null | string;
}) => {
  const response = await nextClient.post("/fetch-markets", {
    next_id: pageParam,
  });
  return response.data;
};

function Markets() {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["markets"],
      queryFn: ({ pageParam = "" }) => fetchActivities({ pageParam }),
      getNextPageParam: (lastPage) => {
        return lastPage?.data?.next_id ? lastPage?.data?.next_id : null;
      },
      initialPageParam: "",
    });

  const loadMoreActivities = useCallback(() => {
    if (isLoading) return;
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const markets = data?.pages?.flatMap((page) => page?.data?.markets || []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          loadMoreActivities();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadMoreActivities]);

  return (
    <div className="mt-4">
      {markets && <CarouselPlugin data={markets?.slice(0, 4)} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 pb-20   mt-5">
        {markets?.map((mar) => {
          return (
            <div key={mar.questionId}>
              <MarketCard
                title={mar?.title}
                image={mar.image}
                eventId={mar.questionId}
                endDate={mar.expiryDate}
                vol={mar?.tradeCount}
                liqudity={mar.liquidity}
              />
            </div>
          );
        })}
        <div ref={observerRef} className="h-1" />
      </div>
    </div>
  );
}
export default Markets;
