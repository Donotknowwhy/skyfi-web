import MyESimService from '@/app/services/myEsimService';
import { useLoad } from '@/app/utils/load';
import { createContext, useContext, useEffect, useState } from 'react';

const MenagerEsimContext = createContext(null);

export const useManagerEsim = () => {
    const context = useContext(MenagerEsimContext);
    if (!context) {
        return null
    }
    return context;
};

const ManagerEsimProvider = ({ children }) => {
    const [esimData, setEsimData] = useState({});
    const { open, close } = useLoad();
    const [EsimDetail, setEsimDetail] = useState({});


    const listEsims = {
        activeEsim: esimData.esimActive?.list ?? [],
        notInstalledEsim: esimData.esimNotActive?.list ?? [],
        expiredEsim: esimData.esimExpired?.list ?? [],
    }





    const getListESim = async () => {
        try {
            open();
            const res = await MyESimService.getListESim();

            setEsimData(res);

        }
        catch (error) {
            console.log("Error fetching eSIM list:", error);
        }
        finally {

            close();

        }
    };


    useEffect(() => {
        getListESim();
    }, []);

    return (
        <MenagerEsimContext.Provider value={{ listEsims, EsimDetail, setEsimDetail }}>
            {children}
        </MenagerEsimContext.Provider>
    );

}

export default ManagerEsimProvider;