import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'

type Props = {
  title: string
  detail: string
  status: boolean
  haveCheck?: boolean
  singleButton?: { name: string; style: 'btn-outline-primary' | 'btn-primary'; type: 'cancel' | 'confirm' }
  duoButton?: {
    left: { name: string; style: 'btn-outline-primary' | 'btn-primary' | 'btn-danger'; type: 'cancel' | 'confirm' }
    right: { name: string; style: 'btn-outline-primary' | 'btn-primary' | 'btn-danger'; type: 'cancel' | 'confirm' }
  }
  left?: string[]
  right?: string[]
  onClick: (val: boolean) => void
}

export default function ModalCard({ singleButton, duoButton, title, detail, status, haveCheck, onClick }: Props) {
  const check = haveCheck || false
  const confirm = duoButton ? duoButton?.left.type === 'confirm' : singleButton?.type === 'confirm'
  const [, setOpen] = useState(status)
  const [isDisabled, setIsDisabled] = useState(haveCheck ? true : false)
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={status} as={Fragment}>
      <Dialog as="div" className="fixed overflow-y-auto bottom-1/4 inset-x-2" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6">
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{detail}</p>
                      {check && (
                        <div className="flex items-center gap-2 pt-8">
                          <input
                            type="checkbox"
                            className="checked:bg-blue-500"
                            checked={!isDisabled}
                            onChange={() => setIsDisabled(!isDisabled)}
                          />
                          <div className="text-sm text-black">ยอมรับเงื่อนไขการยกเลิกการจองรถ</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex px-4 py-3 gap-x-2 bg-gray-50 ">
                {duoButton && (
                  <>
                    <button
                      className={`${confirm && isDisabled ? 'btn-mute' : duoButton?.left.style} btn-modal`}
                      disabled={confirm && isDisabled}
                      onClick={() => {
                        setIsDisabled(true)
                        onClick(confirm)
                      }}
                    >
                      {duoButton?.left.name}
                    </button>
                    <button
                      className={`${confirm && isDisabled ? 'btn-mute' : duoButton?.right.style} btn-modal`}
                      disabled={!confirm && isDisabled}
                      onClick={() => {
                        setIsDisabled(true)
                        onClick(!confirm)
                      }}
                    >
                      {duoButton?.right.name}
                    </button>
                  </>
                )}
                {singleButton && (
                  <>
                    <button
                      className={`${confirm && isDisabled ? 'btn-mute' : singleButton?.style} btn-modal`}
                      disabled={confirm && isDisabled}
                      onClick={() => onClick(confirm)}
                    >
                      {singleButton?.name}
                    </button>
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
