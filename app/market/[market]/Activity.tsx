import React, { useEffect, useRef, useCallback } from "react";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { AvatarImage } from "@/app/components/ui/avatar";
import { useInfiniteQuery } from "@tanstack/react-query";
import nextClient from "@/utils/clients/nextClient";
import { getTimeAgo } from "@/utils/common/formatDate";

interface Activity {
  id: number;
  user: string;
  action: string;
  avatarUrl: string;
}

const Activity = ({ questionId }: { questionId: string }) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchActivities = async ({
    pageParam = null,
  }: {
    pageParam: null | string;
  }) => {
    const response = await nextClient.post("/market-activity", {
      questionId,
      next_id: pageParam,
    });
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["market-activities", questionId],
      queryFn: ({ pageParam = null }) => fetchActivities({ pageParam }),
      getNextPageParam: (lastPage) => lastPage.next_id ?? undefined,
      initialPageParam: null,
    });

  const activities = data?.pages?.flatMap((page) => page?.data?.trades) || [];

  const loadMoreActivities = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
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
    <div className="">
      {activities?.map((act, index) => {
        return (
          <div key={index}>
            <section className="flex border gap-3 justify-between items-center border-border border-x-0 border-t-0 py-2">
              <div className="flex items-center gap-3">
                <Avatar className=" h-10 w-10">
                  <AvatarImage src={"https://github.com/shadcn.png"} />
                  <AvatarFallback>
                    <AvatarFallback color="#e0e0e0" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p>
                    {act.user?.slice(0, 4)}....{act.user?.slice(-4)}
                  </p>
                  <p>
                    {act.side === "buy" ? "Bought" : "Sold"}{" "}
                    <span
                      className={`${
                        act.side === "buy" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {parseFloat(act.outcomeTokenTraded).toFixed(2)}{" "}
                      {act.outcomeIndex === 0 ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              </div>

              <p>{getTimeAgo(act.created_at)}</p>
            </section>
          </div>
        );
      })}
      {isFetchingNextPage && <p>Loading...</p>}
      <div ref={observerRef} className="h-1" />
    </div>
  );
};
export default Activity;
