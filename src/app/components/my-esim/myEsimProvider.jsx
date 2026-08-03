import {useSearchParams} from "next/navigation";

const { useContext, useState, createContext, useEffect } = require( "react" );
const { default: MyESimService } = require( "../../services/myEsimService" );
const { useLoad } = require( "../../utils/load" );

const Context = createContext( {} );


const MyEsimProvider = ( { children } ) => {
	const [ eSimData, setESimData ] = useState( {} );
	
	const { open, close } = useLoad();
	const searchParams = useSearchParams();
	const iccid=searchParams.get('iccid')
	const getListESimByType = ( type ) => {
		switch ( type ) {
			case "activeEsim":
				return eSimData.esimActive?.list ?? [];
			case "notInstalledEsim":
				return eSimData.esimNotActive?.list ?? [];
			case "expiredEsim":
				return eSimData.esimExpired?.list ?? [];
			default:
				return [];
		}
	};



	const getListESim = async () => {
		try {
			open();
			const res = await MyESimService.getListESim();
			console.log( 'res:', res );

			setESimData( res );

		}
		catch ( error ) {
			console.log( "Error fetching eSIM list:", error );
		}
		finally {
			if(!iccid){
				close();
			}
		}
	};


	useEffect( () => {
		getListESim();
	}, [] );

	return (
		<Context.Provider value={ { getListESimByType } }>
			{ children }
		</Context.Provider>
	);
};
export default MyEsimProvider;

export const useMyEsim = () => {
	return useContext( Context );
};
