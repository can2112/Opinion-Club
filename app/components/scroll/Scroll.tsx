"use client";

// import { Activity } from "@/app/profile/[address]/types";
import nextClient from "@/utils/clients/nextClient";
// import { IMarkets } from "@/utils/Interfaces/common";

import { useInfiniteQuery } from "@tanstack/react-query";
import { ReactNode, useCallback, useEffect, useRef } from "react";

interface ScrollProps<T> {
  apiRoute: string;
  renderFun: (req: T) => ReactNode;
  objName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyVal?: any;
  layoutStyle?: string;
}

const Scroll = <T extends { id: number }>({
  apiRoute,
  renderFun,
  objName,
  bodyVal,
  layoutStyle,
  initialData,
}: ScrollProps<T>) => {
  const fetchData = async ({
    pageParam = null,
  }: {
    pageParam: null | string;
  }) => {
    const response = await nextClient.post(`${apiRoute}`, {
      next_id: pageParam,
      ...bodyVal,
    });
    return response.data;
  };

  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [objName],
      queryFn: ({ pageParam = "" }) => fetchData({ pageParam }),
      getNextPageParam: (lastPage) => {
        return lastPage?.data?.next_id ? lastPage?.data?.next_id : null;
      },
      initialPageParam: initialData ? initialData.next_id : "",
      initialData: {
        pages: [
          {
            data: {
              [objName]: initialData?.[objName] || [],
              next_id: initialData?.next_id,
            },
          },
        ],
        pageParams: [null],
      },
      enabled: !!initialData?.[objName],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    });

  const loadMoreData = useCallback(() => {
    if (isLoading) return;
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          loadMoreData();
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
  }, [loadMoreData]);

  const response = data?.pages?.flatMap((page) => page?.data?.[objName] || []);
  return (
    <div>
      {response?.length ? (
        <div className={`${layoutStyle}`}>
          {response?.map((res: T) => {
            return <div key={res?.id}>{renderFun(res)}</div>;
          })}
        </div>
      ) : isLoading ? (
        // TODO: CHANGE THIS WITH A LOADING ANIMATION
        <div>Loading....</div>
      ) : (
        `No ${objName} found`
      )}
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
};
export default Scroll;
