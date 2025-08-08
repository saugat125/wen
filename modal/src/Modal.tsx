import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './components/ui/button';
import { Input } from '@/components/ui/input';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/store';
import { useState } from 'react';
import { confirmAction, openModal } from './redux/modalSlice';


export default function Modal() {
  const modal = useSelector((state: RootState) => state.modal);
  const modalType = useSelector((state: RootState) => state.modal.modalType)
  const apiData = useSelector((state:RootState) => state.modal.apiData)
  const isLoading = useSelector((state:RootState) => state.modal.isLoading)
  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex gap-10 justify-center mt-20">
        <Button
          variant={'default'}
          onClick={() => {
            setIsOpen(true);
            dispatch(openModal('confirm'));
          }}
        >
          Confirmation
        </Button>
        <Button
          variant={'default'}
          onClick={() => {
            setIsOpen(true);
            dispatch(openModal('alert'));
          }}
        >
          Alert
        </Button>
        <Button
          variant={'default'}
          onClick={() => {
            setIsOpen(true);
            dispatch(openModal('form'));
          }}
        >
          Form
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              {modalType === 'confirm' && (
                <div>
                  <DialogTitle className="mb-2">
                    {modal.confirmation.title}
                  </DialogTitle>
                  <DialogDescription>
                    {modal.confirmation.content}
                  </DialogDescription>
                  <div className="mt-4">
                    <Button
                      variant={'default'}
                      onClick={() => {dispatch(confirmAction()); setIsOpen(false)}}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              )}
              {modalType === 'alert' && (
                <div>
                  <DialogTitle>{modal.alert.title}</DialogTitle>
                  <DialogDescription>{modal.alert.content}</DialogDescription>
                </div>
              )}
              {modalType === 'form' && (
                <div>
                  <DialogTitle>{modal.form.title}</DialogTitle>
                  <DialogDescription className='mb-6 mt-2'>{modal.form.content}</DialogDescription>
                  <form>
                    <Input type="email" placeholder='Email'></Input>
                    <Input type="password" placeholder='Password' className='my-4'></Input>
                    <Button variant={'default'}>Login</Button>
                  </form>
                </div>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-10 justify-center mt-20">
        {isLoading && (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
        {!isLoading && apiData && (
          <div>
            {apiData.map((item: any) => {
              return (
                <div key={item.id} className="flex gap-5">
                  <div className="mb-5">{item.id}</div>
                  <div className="mb-5">{item.title}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
