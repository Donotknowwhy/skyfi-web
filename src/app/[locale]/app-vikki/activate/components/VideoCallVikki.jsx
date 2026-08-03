'use client';

import useActivateVikki from '../hook/useActivateVikki';
import { VideoCallCalling, VideoCallOnGoing, VideoCallRescore, VideoCallStart } from './videoCall';

const VideoCallVikki = () => {
    const { typeVideoCall } = useActivateVikki();
    console.log('typeVideoCall:', typeVideoCall);
    
    switch (typeVideoCall) {
        case 'start':
            return <VideoCallStart key="start" />;
        case 'calling':
            return <VideoCallCalling key="calling" />;
        case 'onGoing':
            return <VideoCallOnGoing key="onGoing" />;
        case 'rescore':
            return <VideoCallRescore key="rescore" />;
        default:
            return <VideoCallStart key="default" />;
    }
};

export default VideoCallVikki;
