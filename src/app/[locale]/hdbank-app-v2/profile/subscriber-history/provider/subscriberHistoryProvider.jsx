import { showModalMessHDBank } from '@/app/components/modals/modalMess';
import PackageService from '@/app/services/package';
import TopupService from '@/app/services/topup';
import { useLoad } from '@/app/utils/load';
import { useUserState } from '@/app/stores/user';
import { createContext, useContext, useEffect, useState } from 'react';
const SubscriberHistoryContext = createContext(null);


export const useSubscriberHistory = () => {
    const context = useContext(SubscriberHistoryContext);
    if (!context) {
        return null
    }
    return context;
};


const SubscriberHistoryProvider = ({ children }) => {

    const [historyTopupData, setHistoryTopupData] = useState([]);
    const [historyPackageData, setHistoryPackageData] = useState([]);
    const { open, close } = useLoad();
    const { cartId } = useUserState();

    const transformTopupData = (data) => {
        const groupedByDate = data.reduce((acc, transaction) => {
            const date = new Date(transaction.transaction_date);
            const dateKey = date.toLocaleDateString('vi-VN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }

            const formattedTransaction = {
                title: 'transactionTypes.momoTopup',
                datetime: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                amount: transaction.amount,
                status: transaction.error_code == null,
                type: transaction.topup_method == 'ONLINE_PAYMENT' ? 'Online' : 'Other',
            };

            acc[dateKey].push(formattedTransaction);
            return acc;
        }, {});


        return Object.entries(groupedByDate).map(([date, transactions]) => ({
            date: date,
            transactions: transactions,
        }));
    };


    const transformPackageData = (data) => {
        const groupedByDate = data.reduce((acc, transaction) => {
            const date = new Date(transaction.transaction_date);
            const dateKey = date.toLocaleDateString('vi-VN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            const formattedTransaction = {
                title: 'transactionTypes.dataPackage',
                datetime: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                amount: -transaction.price,
                status: transaction.status == "SUCCESS",
                type: 'service',
            };

            acc[dateKey].push(formattedTransaction);
            return acc;
        }, {});

        return Object.entries(groupedByDate).map(([date, transactions]) => ({
            date: date,
            transactions: transactions,
        }));
    }


    const getHistory = async () => {
        try {
            open();
            const [topupData, packageData] = await Promise.all([
                TopupService.getTopupHistory(),
                PackageService.getPackageHistoryVikki(cartId)
            ]);
            console.log(topupData, packageData);
            // Example usage:
            const transformedData = transformTopupData(topupData);
            const transformedPackageData = transformPackageData(packageData);
            console.log(transformedData);
            console.log(transformedPackageData);
            setHistoryTopupData(transformedData || []);
            setHistoryPackageData(transformedPackageData || []);


        } catch (error) {
            showModalMessHDBank({
                type: 'error',
                message: error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'
            });

        } finally {
            close();
        }
    }

    useEffect(() => {
        getHistory();
    }, []);

    return (
        <SubscriberHistoryContext.Provider value={{ historyTopupData, historyPackageData }}>
            {children}
        </SubscriberHistoryContext.Provider>
    );
}

export default SubscriberHistoryProvider;
