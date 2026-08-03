'use client';


const StepIndicator = ({ currentStep = 1 }) => {
  const isActive = (step) => currentStep >= step;

  return (
    <div className="w-full bg-[#F2F2F7] pt-4 pb-2 px-4 flex justify-between items-end relative h-[50px] mt-4">
      
      {/* Connecting Lines Layer */}
      <div className="absolute top-0 left-0 w-full h-[20px] px-4 flex items-center justify-center z-0">
         <div className="relative w-[342px] h-[20px]">
            {/* Line 1-2 */}
            <div className={`absolute top-1/2 left-[34px] w-[100px] h-[1px] -translate-y-1/2 transition-colors duration-300 ${isActive(2) ? 'bg-[#0000EA]' : 'bg-[#B4AFB4]'}`}></div>
            {/* Line 2-3 */}
            <div className={`absolute top-1/2 left-[200px] w-[100px] h-[1px] -translate-y-1/2 transition-colors duration-300 ${isActive(3) ? 'bg-[#0000EA]' : 'bg-[#B4AFB4]'}`}></div>
         </div>
      </div>

      {/* Step 1 */}
      <div className="flex flex-col items-center gap-1 z-10 w-[50px]">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive(1) ? 'bg-[#0000EA]' : 'bg-[#B4AFB4]'}`}>
          <span className="text-white text-[12px] font-bold font-inter">1</span>
        </div>
        <span className={`text-[12px] font-medium leading-[1.5em] font-koho transition-colors duration-300 ${isActive(1) ? 'text-[#0000EA]' : 'text-[#B9B4B9]'}`}>Chọn số</span>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col items-center gap-1 z-10 w-[80px]">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive(2) ? 'bg-[#0000EA]' : 'bg-[#B4AFB4]'}`}>
          <span className="text-white text-[12px] font-bold font-inter">2</span>
        </div>
        <span className={`text-[12px] font-medium leading-[1.5em] font-koho transition-colors duration-300 ${isActive(2) ? 'text-[#0000EA]' : 'text-[#B9B4B9]'}`}>Miễn phí cước</span>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col items-center gap-1 z-10 w-[60px]">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive(3) ? 'bg-[#0000EA]' : 'bg-[#B4AFB4]'}`}>
          <span className="text-white text-[12px] font-bold font-inter">3</span>
        </div>
        <span className={`text-[12px] font-medium leading-[1.5em] font-koho transition-colors duration-300 ${isActive(3) ? 'text-[#0000EA]' : 'text-[#B9B4B9]'}`}>Kích hoạt</span>
      </div>

    </div>
  );
};

export default StepIndicator;
