'use client';

import { useSupport } from '../provider/ProvideSuport';
import ContentAll from './contentAll';
import ContentSmall from './contentSmall';


const ContentSupport = () => {
    const { isShowAll } = useSupport();

    if (!isShowAll) return <ContentSmall />
    return <ContentAll />
}

export default ContentSupport;