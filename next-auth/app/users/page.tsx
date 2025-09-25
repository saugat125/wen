'use client';

import { useState } from 'react';
import { users as initialUsers } from '@/lib/users';
import { useSession, signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

const UsersPage = () => {
  const { data: session, status } = useSession();
  const role = (session?.user as any)?.role || 'guest';

  const [userList, setUserList] = useState(initialUsers);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleSignout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const handleDelete = (email: string) => {
    setUserList((prev) => prev.filter((u) => u.email !== email));
    toast.success('User Deleted');
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error('All fields are required');
      return;
    }

    setUserList((prev) => [...prev, newUser]);
    toast.success('User Added');
    setNewUser({ name: '', email: '', password: '', role: 'user' });
  };

  if (status === 'loading') {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="max-w-4xl mx-auto pt-14 px-4">
      <div className="flex justify-end gap-6 items-center mb-10">
        <span className="text-white">{session?.user?.name}</span>
        <Button onClick={handleSignout}>Sign Out</Button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">List of Users</h1>

      {role === 'admin' && (
        <div className="mb-12">
          <Dialog>
            <DialogTrigger className="bg-green-600 rounded-lg px-4 py-2 text-white cursor-pointer">
              Add User
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new user</DialogTitle>
                <form className="flex flex-col gap-5 mt-5">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="placeholder:text-white border border-gray-600 px-4 py-2 rounded-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="placeholder:text-white border border-gray-600 px-4 py-2 rounded-sm"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="placeholder:text-white border border-gray-600 px-4 py-2 rounded-sm"
                  />

                  <div className="flex gap-3 mt-4">
                    <DialogClose asChild>
                      <Button
                        onClick={handleAddUser}
                        className="cursor-pointer"
                      >
                        Add
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="outline" className="cursor-pointer">
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="space-y-4">
        {userList
          .filter((user) => user.role != 'admin')
          .map((user) => (
            <div
              key={user.email}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-neutral-800 shadow-sm"
            >
              <div>
                <p className="text-2xl font-semibold text-white mb-2">
                  {user.name}
                </p>
                <p className="text-md text-gray-400">{user.email}</p>
              </div>

              {role === 'admin' && (
                <Dialog>
                  <DialogTrigger className="bg-red-500 rounded-lg px-4 py-2 cursor-pointer text-white">
                    Delete
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="mb-5">
                        Are you sure you want to delete this user?
                      </DialogTitle>
                      <div className="flex gap-3">
                        <DialogClose asChild>
                          <Button
                            onClick={() => handleDelete(user.email)}
                            variant="destructive"
                            className="cursor-pointer"
                          >
                            Delete
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button variant="outline" className="cursor-pointer">
                            Cancel
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UsersPage;
