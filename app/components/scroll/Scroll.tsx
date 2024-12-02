"use client";

import { Activity } from "@/app/profile/[address]/types";
import nextClient from "@/utils/clients/nextClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ReactNode, useCallback, useEffect, useRef } from "react";

interface ScrollProps {
  apiRoute: string;
  nextId?: string;
  renderFun: (req: Activity) => ReactNode;
  objName: string;
  // initialData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyVal?: any;
}

function Scroll({
  apiRoute,
  // nextId,
  renderFun,
  objName,
  bodyVal,
}: // initialData,
ScrollProps) {
  const fetchData = async ({
    pageParam = null,
  }: {
    pageParam: null | string;
  }) => {
    const response = await nextClient.post(`${apiRoute}`, {
      next_id: pageParam,
      ...bodyVal,
    });
    // return null
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
      initialPageParam: "",
      // initialData: initialData,
      // initialData: {
      //   pages: [{ data: { [objName]: initialData, next_id: null } }],
      // },
      // pageParams: [null],
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
        <div>
          {response?.map((res) => {
            return <div key={res?.id}>{renderFun(res)}</div>;
          })}
        </div>
      ) : (
        `No ${objName} found`
      )}{" "}
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
}
export default Scroll;
