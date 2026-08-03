"use client";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { createContext, Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";

// Converting enum to object
const EventModal = {
  Show: 'show',
  Close: 'close',
  Cancel: 'cancel',
  Confirm: 'confirm',
  Resolve: 'Resolve',
  Reject: 'Reject',
  DidMount: 'DidMount',
  WillUnmount: 'WillUnmount'
};

function createEventManager() {
  const eventManager = {
    list: new Map(),
    on(event, callBack) {
      this.list.has(event) || this.list.set(event, []);
      this.list.get(event)?.push(callBack);
      return this;
    },
    off(event, callback) {
      if (callback) {
        const cb = this.list.get(event).filter((cb) => cb !== callback);
        this.list.set(event, cb);
        return this;
      }
      this.list.delete(event);
      return this;
    },
    emit(event, ...args) {
      const cb = this.list.get(event);
      if (cb) {
        cb.forEach((cb) => cb(...args));
      }
      return this;
    }
  };
  return eventManager;
}

const eventManager = createEventManager();
let MODAL_ID = 1;

function generateModalId() {
  return `${MODAL_ID++}`;
}

function getModalId() {
  return generateModalId();
}

function mergeOptions(options) {
  return {
    ...options,
    modalId: getModalId(),
  };
}

function dispatchModal(options) {
  eventManager.emit(EventModal.Show, mergeOptions(options));
}

function modal(options) {
  return dispatchModal(options);
}
modal.open = dispatchModal;

modal.sheet = (options) => dispatchModal({ ...options, typeModal: 'sheet' });

const ModalContext = createContext({ modalId: 0 });

const useModal = () => useContext(ModalContext);

const ModalProvider = (props) => {
  const [modalIds, setModalIds] = useState({});
  const modalRender = useRef(new Map()).current;

  const removeModal = (modalId) => {
    if (modalId == null) {
      setModalIds({});
    } else {
      setModalIds((state) => {
        const { [modalId]: remove, ...newState } = state;
        return newState;
      });
    }
    modalRender.delete(modalId);
  };

  const isNotValid = useCallback(
    (options) => {
      return modalRender.has(options.modalId);
    },
    [modalRender]
  );

  const appendModal = useCallback(
    (content, modalProps) => {
      const { modalId } = modalProps;
      modalRender.set(modalId, { content, data: modalProps });
      setModalIds((state) => ({ ...state, [modalId]: true }));
    },
    [modalRender]
  );

  const buildModal = useCallback(
    (options) => {
      const newOptions = Object.assign({}, { ...options });
      if (isNotValid(newOptions)) return;

      const Render = newOptions.render;
      const modalRenderProps = {
        close() {
          newOptions.onClose?.();
          removeModal(newOptions.modalId);
        },
        async done(data) {
          if (newOptions.onDone) await newOptions.onDone(data);
          setTimeout(() => removeModal(newOptions.modalId), 0);
        }
      };

      const modalProps = {
        ...newOptions,
        ...modalRenderProps,
        deleteModal() {
          modalRender.delete(newOptions.modalId);
        }
      };

      const content = typeof Render === 'function' ? <Render {...modalRenderProps} /> : Render;
      appendModal(content, modalProps);
    },
    [appendModal, isNotValid, modalRender]
  );

  const onClose = () => {};

  useEffect(() => {
    eventManager.on(EventModal.Show, buildModal);
    eventManager.on(EventModal.Close, onClose);
    return () => {
      modalRender.clear();
      eventManager.off(EventModal.Show);
    };
  }, [buildModal, modalRender]);

  return (
    <>
      {Array.from(modalRender.values()).map(({ content, data: props }) => {
        return (
          <ModalContext.Provider key={props.modalId} value={props}>
            <Transition appear show={Boolean(modalIds[props.modalId])} as={Fragment}>
              <Dialog as="div" className="relative z-50" onClose={props.close}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className={ clsx( 'flex min-h-full items-center justify-center p-4 text-center ad',props.classContainer ) }>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className={ clsx( 'w-full  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                        props.boxClassName,
                        props.typeModal === 'sheet' ? 'mt-auto mb-0 rounded-b-none' : '',

                      ) }>
                        {props.closeButton ? (
                          <button className='absolute top-2 right-2 p-2' onClick={props.close}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        ) : null}
                        {content}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </ModalContext.Provider>
        );
      })}
    </>
  );
};

export { modal, useModal };
export default ModalProvider;