import { useEffect, useState } from "react";
import CheckoutService from "../services/checkoutService";

export const useCities = () => {
	const [ cities, setCities ] = useState( [] );
	const getCities = async () => {
		try {
			const res = await CheckoutService.getCities();

			setCities( res.map( ( item ) => ( { ...item, label: item.name ,value:item.id} ) ) );

		} catch ( error ) {
			console.error( 'Error fetching cities:', error );
		}
	};
	useEffect( () => {
		getCities();
	}, [] );
	return cities;
};

export const useDistricts = ( cityId ) => {
	const [ districts, setDistricts ] = useState( [] );
	const [ districtView, setDistrictView ] = useState( [] );
	const getDistricts = async () => {
		try {
			const res = await CheckoutService.getDistricts();
			setDistricts( res.map( ( item ) => ( { ...item, label: item.name, value: item.id } ) ) );

		} catch ( error ) {
			console.error( 'Error fetching districts:', error );
		}
	};
	useEffect( () => {
		getDistricts();
	}, [] );
	useEffect( () => {
		if ( cityId ) {
			const filteredDistricts = districts.filter( ( district ) => district.city_id === cityId );
			setDistrictView( filteredDistricts  );
		} else {
			setDistrictView( [] );
		}
	}, [ cityId, districts ] );
	return districtView;

};

export const useWards = ( districtId ) => {
	const [ wards, setWards ] = useState( [] );
	const [ wardView, setWardView ] = useState( [] );
	const getWards = async () => {
		try {
			const res = await CheckoutService.getWards();
			setWards( res.map( ( item ) => ( { ...item, label: item.name, value: item.id } ) ) );

		} catch ( error ) {
			console.error( 'Error fetching wards:', error );
		}
	};
	useEffect( () => {
		getWards();
	}, [] );
	useEffect( () => {
		if ( districtId ) {
			const filteredWards = wards.filter( ( ward ) => ward.district_id === districtId );
			setWardView( filteredWards );
		} else {
			setWardView( [] );
		}
	}, [ districtId, wards ] );
	return wardView;
};