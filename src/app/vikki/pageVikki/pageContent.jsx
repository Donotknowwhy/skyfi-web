'use client';
import { useFormContext } from 'react-hook-form';
import PageInfo from './pageInfo';
import { PageSim } from './pageSim';

const PageContent = () => {
	const method = useFormContext();
	const { watch } = method;
	const step = watch('step');


	switch (step) {
		case 0:
			return <PageSim />;
		case 1:
			return <PageInfo />;

		default:
			return <div>ShipAddress Component</div>;
	}
}

export default PageContent