'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../../i18n/navigation';


const MenuBuySim = () => {
  const t = useTranslations( 'home.menuBuySim' );

  return (
    <section className="md:py-10 md:px-4 py-4 bg-white">
      <div className="container">
        <div className="flex justify-center gap-8  index">
          {/* Domestic SIM Card */ }
          <Link href="/sim-data" className="relative flex-1 max-w-80  rounded-xl overflow-hidden  group flex flex-col gap-2 md:gap-5 justify-center items-center aspect-[450/255] bg-cover bg-center bg-no-repeat hover:bg-[url('/assets/menu-buy-sim/bg-menu.png')]">

            <div className='flex items-center justify-center w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-white rounded-full shadow-md group-hover:bg-[#F5F5F5] transition-colors duration-300 ease-in-out'>

              <Image
                src="/assets/menu-buy-sim/simcard-02.png"
                alt=""
                width={ 80 }
                height={ 80 }
                className="object-cover  aspect-square w-6 h-6 md:w-[40px] md:h-[40px]  "

              />
            </div>

            <h3 className="text-black group-hover:text-white text-center font-bold text-xs md:text-base lg:text-[24px] ">
              { t( 'domesticSim.title' ) }
            </h3>


          </Link>
          <Link href="/travel-esim" className="relative flex-1 max-w-80 rounded-xl overflow-hidden  group flex flex-col gap-2 md:gap-5   justify-center items-center aspect-[450/255]  hover:bg-[url('/assets/menu-buy-sim/bg-menu.png')] bg-cover bg-center bg-no-repeat">
            <div className='flex items-center justify-center w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-white rounded-full shadow-md group-hover:bg-[#F5F5F5] transition-colors duration-300 ease-in-out'>

              <Image
                src="/assets/menu-buy-sim/airplane.png"
                alt=""
                width={ 80 }
                height={ 80 }
                className="object-cover  aspect-square w-6 h-6 md:w-[40px] md:h-[40px]  "

              />
            </div>

            <h3 className="text-black group-hover:text-white text-center font-bold text-xs md:text-base lg:text-[24px]">
              { t( 'travelEsim.title' ) }
            </h3>

            {/* Content */ }

          </Link>


        </div>
      </div>
    </section>
  );
};

export default MenuBuySim;
