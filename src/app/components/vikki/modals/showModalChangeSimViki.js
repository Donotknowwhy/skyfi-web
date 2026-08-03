import { modal } from '@/app/utils/modal';
import ModalChangeSimViki from './ModalChangeSimViki';

export const showModalChangeSimViki = (props) => {
    modal.sheet({
        render: <ModalChangeSimViki {...props} />,
        boxClassName: 'w-full rounded-t-[24px] p-0 h-[90vh]',
        classContainer: '!p-0 !items-end',
    });
};
