import axios from 'axios';

export const fetchItem = async ({ pageParam }: { pageParam?: number }) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  );
  return response.data;
};

export const addItem = async (item: any) => {
  const response = await axios.post(
    'https://jsonplaceholder.typicode.com/posts',
    item
  );
  return response.data;
};

export const updateItem = async (item: any) => {
  const response = await axios.patch(
    `https://jsonplaceholder.typicode.com/posts/${item.id}`,
    item
  );
  return response.data;
};

export const deleteItem = async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
};
