'use client';
import Footer from '@/app/components/hdbank-v2/home/Footer';
import ContentSupport from './components/ContentSupport';
import { ProvideSupport } from './provider/ProvideSuport';
import HeadFQA from './components/headFQA';


// FAQ Category Component


const SupportCenterPage = () => {

  return (
    <ProvideSupport>
      <div className="min-h-[100dvh] flex flex-col bg-white">
        {/* Hero Section */}
        <HeadFQA />
        <div className=" mb-6">
          <div className=" overflow-hidden">
            <img
              src="/assets/hero/support-hero.png"
              alt="Support hero"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className=" pb-20">

          <ContentSupport />
        </div>
        <Footer activeTab="profile" />
      </div>
    </ProvideSupport>
  );
};

export default SupportCenterPage;
