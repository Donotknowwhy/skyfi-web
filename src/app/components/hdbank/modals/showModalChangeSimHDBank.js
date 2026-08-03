import { modal } from '@/app/utils/modal';
import ModalChangeSimHDBank from './ModalChangeSimHDBank';

export const showModalChangeSimHDBank = (props) => {
    modal.sheet({
        render: <ModalChangeSimHDBank {...props} />,
        boxClassName: 'w-full rounded-t-[24px] p-0 h-[90vh]',
        classContainer: '!p-0 !items-end',
    });
};
