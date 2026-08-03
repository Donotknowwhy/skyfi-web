'use client';

import dkttService from "@/app/services/dkttService";
import { useLoad } from "@/app/utils/load";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { InfoActivateVikki, InputActivateVikki, ScanQRVikki, SignActivateVikki } from "./components";
import useActivateVikki from "./hook/useActivateVikki";
import { ActivateProvider } from "./providers/providerActivate";



const ActivateVikkiPage = () => {
    return (
        <ActivateProvider>
            <ContentData />
        </ActivateProvider>
    );
}

const ContentData = () => {
    const { method } = useActivateVikki();
    const searchParams = useSearchParams();
    const { open, close } = useLoad();

    useEffect(() => {
        const pageParam = searchParams.get('page');
        const sessionIdParam = searchParams.get('sessionId');
        console.log('sessionIdParam', sessionIdParam);
        // loginSession();


        if (pageParam) {
            method.setValue('page', pageParam);
        }
        if (sessionIdParam) {
            method.setValue('sessionId', sessionIdParam);
        }
    }, [searchParams, method]);

    const loginSession = async () => {
        try {
            open();
            const data = await dkttService.loginWithSession();
            if (data) {
                // Store session data in form
                method.setValue('sessionData', data);
            }
        } catch (error) {
            console.error('Login with session failed:', error);
        } finally {
            close();
        }
    };

    return (
        <FormProvider {...method}>
            <div style={{ backgroundImage: 'url(/figma-images/background.png)' }} className="min-h-[100dvh] bg-cover bg-center bg-no-repeat">

                <ContentPage />
            </div>
        </FormProvider>
    )
}

const ContentPage = () => {
    const { control } = useFormContext();
    const page = useWatch({ control, name: "page" });
    switch (page) {
        case "scanQR":
            return <ScanQRVikki />;
        case "inputActivate":
            return <InputActivateVikki />;
        case "infoActivate":
            return <InfoActivateVikki />;
        case "signActivate":
            return <SignActivateVikki />;
        default:
            return null;
    }
}

export default ActivateVikkiPage;   