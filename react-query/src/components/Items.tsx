import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import { addItem, deleteItem, fetchItem, updateItem } from '../functions';

export default function Items() {
  const [item, setItem] = useState('');
  const [localItems, setLocalItems] = useState<any[]>([]);
  console.log(localItems);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['items'],
      queryFn: fetchItem,
      initialPageParam: 1,
      getNextPageParam: (_lastPage, allPages) =>
        allPages.length < 3 ? allPages.length + 1 : undefined,
    });

  useEffect(() => {
    if (data?.pages) {
      const allFetchedItems = data.pages.flat();
      setLocalItems(allFetchedItems);
    }
  }, [data]);

  const addMutation = useMutation({
    mutationFn: addItem,
    onSuccess: (newItem) => {
      setLocalItems((prev) => [
        { ...newItem, id: Date.now(), title: newItem.title },
        ...prev,
      ]);
      toast.success('Item Added Successfully!');
    },
    onError: () => {
      toast.error('Add Failed, Try Again');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: (updatedItem) => {
      setLocalItems((prev) =>
        prev.map((item) =>
          item.id === updatedItem.id ? { ...item, ...updatedItem } : item
        )
      );
      setEditingItemId(null);
      toast.success('Item Updated Successfully!');
    },
    onError: () => {
      toast.error('Update Failed');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (id) => {
      setLocalItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Item Deleted Successfully!');
    },
    onError: () => {
      toast.error('Item Delete Failed');
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMutation.mutate({ title: item, body: 'test body', userId: 1 });
    setItem('');
  };

  const handleEdit = (id: number, title: string) => {
    setEditingItemId(id);
    setEditingValue(title);
  };

  const handleSave = (id: number) => {
    updateMutation.mutate({ id, title: editingValue });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (status === 'error') return <div>Error Occurred</div>;

  return (
    <div className="flex flex-col p-20">
      <form onSubmit={handleSubmit} className="mb-10 flex">
        <input
          type="text"
          className="bg-gray-600 w-2xl px-7 py-3"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button
          className="ml-4 bg-gray-600 px-6 py-3 rounded-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          type="submit"
          disabled={!item.trim()}
        >
          ADD ITEM
        </button>
      </form>

      {localItems.map((item) => (
        <div
          key={item.id}
          className="bg-gray-600 p-8 mb-5 flex justify-between items-center"
        >
          {editingItemId === item.id ? (
            <>
              <input
                className="flex-1 px-3 py-2 border"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
              />
              <button
                className="ml-3 bg-[#242424] px-5 py-2 rounded-xl cursor-pointer"
                onClick={() => handleSave(item.id)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span>{item.title}</span>
              <div>
                <button
                  className="ml-3 bg-[#242424] px-5 py-2 rounded-xl cursor-pointer"
                  onClick={() => handleEdit(item.id, item.title)}
                >
                  Edit
                </button>
                <Dialog>
                  <DialogTrigger className="ml-3 bg-[#242424] px-5 py-2 rounded-xl cursor-pointer">
                    Delete
                  </DialogTrigger>
                  <DialogContent className="bg-gray-700 border-none ">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Are you sure you want to delete it?
                      </DialogTitle>
                      <div className="button mt-5 flex gap-3">
                        <button
                          className=" bg-[#242424] px-5 py-2 rounded-xl cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                        <DialogClose asChild>
                          <button className=" bg-[#242424] px-5 py-2 rounded-xl cursor-pointer">
                            Cancel
                          </button>
                        </DialogClose>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </div>
      ))}

      {hasNextPage && <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>}
      {!hasNextPage && <div>No more posts</div>}
    </div>
  );
}
