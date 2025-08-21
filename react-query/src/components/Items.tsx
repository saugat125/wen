import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Items() {
  const fetchItem = async ({ pageParam }: { pageParam: number }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`
    );
    return response.data;
  };

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['items'],
      queryFn: fetchItem,
      initialPageParam: 1,
      getNextPageParam: (_lastPage, allPages) => {
        return allPages.length < 5 ? allPages.length + 1 : undefined;
      },
    });

  if (status === 'error') {
    return <div>Error Occured</div>;
  }

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="flex flex-col p-20">
      {data?.pages.map((page, pageIndex) => {
        return (
          <div key={pageIndex}>
            {page.map((item: any) => {
              return (
                <div key={item.id} className="bg-gray-600 p-8 mb-5">
                  {item.title}
                </div>
              );
            })}
          </div>
        );
      })}
      {/* <button onClick={() => fetchNextPage()} className="cursor-pointer">
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </button> */}
      {hasNextPage && <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>}
      {!hasNextPage && <div>No more posts</div>}
    </div>
  );
}
