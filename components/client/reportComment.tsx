'use client'
import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import MoonLoader from 'react-spinners/MoonLoader';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Description, Field, Label, Textarea } from '@headlessui/react'
import clsx from 'clsx'
import { Button } from '../server'
import { toast } from 'react-toastify'
import { reportPost, confirmBuy } from '@/utils/functions'
import { useRouter } from 'next/navigation'

interface InfoConfirmProps {
  slug: string;
  path: string;
}

export default function ReportComment({ slug, path }: InfoConfirmProps) {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleDeactivateClick = async () => {
    try {
      await reportPost(slug, message)
      setOpen(false)
      toast.info('Post reported')
      router.push('/dashboard/posts')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  const handleConfirmClick = async () => {
    setLoading(true)
    try {
      await confirmBuy(slug)
      toast.success('Gracias por confirmar la venta')
      router.push('/dashboard/posts')
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false)
        toast.error(error.message)
      } else {
        setLoading(false)
        toast.error('An unknown error occurred')
      }
    }
  }

  return (
    <div>
      {path === 'confirm' ? (
        <div>
          {loading ? (
            <Button className="w-full" type="button">
              <MoonLoader loading={loading} size={25} color="#1c1d1f" />
            </Button>
          ) : (
            <Button type="button" onClick={handleConfirmClick} className="w-full">
              Confirm sale
            </Button>
          )}
          <br />
          <br />
          <button className="text-red-500 underline" onClick={() => setOpen(true)}>
            Report buyer
          </button>
        </div>
      ) : (
        <div>
          <br />
          <br />
          <button className="text-red-500 underline" onClick={() => setOpen(true)}>
            Report seller
          </button>
        </div>
      )}
      

      <Transition show={open}>
        <Dialog className="relative z-10" onClose={() => setOpen(false)}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-center sm:justify-center sm:flex-col sm:space-y-4">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <Field className="text-center w-full">
                        <Label className="text-sm font-medium">Warning</Label>
                        <Description className="text-sm">
                          We are sorry for the bad experience you had with this trade, please tell us in detail what 
                          the problem is and we will solve it in less than 24 hours, remember that the exchange is the owner 
                          of the private keys, so any misunderstanding, doubt or attempted fraud will be verified by our 
                          team and will be granted the right of cryptocurrencies to the beneficiary user.
                        </Description>
                        <Textarea
                          className={clsx(
                            'mt-3 block w-full resize-none rounded-lg border bg-white py-1.5 px-3 text-sm',
                            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          )}
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                      </Field>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDeactivateClick}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      data-autofocus
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
