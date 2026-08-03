
"use client";

import { Suspense } from "react";
import JitsiMeetingClient from "./JitsiMeetingClient";

const JitsiMeetingPage = () => {
  return (
	<Suspense fallback={<div className="container flex items-center justify-center h-screen"><div className="text-center"><p className="text-lg text-neutral-500">Loading meeting...</p></div></div>}>
	  <JitsiMeetingClient />
	</Suspense>
  );
};

export default JitsiMeetingPage;
