import React from 'react';

const Steps = ({ steps, currentStep }) => {
  return (
    <section className="flex flex-col items-center w-full px-5">
      {/* Steps container */}
      <div className="relative flex items-center justify-between w-full max-w-sm">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white
                  ${index < currentStep
                    ? 'bg-[#DA2128]'
                    : index === currentStep
                    ? 'bg-[#DA2128]'
                    : 'bg-[#B4AFB4]'
                  }
                `}
              >
                {step.step}
              </div>
            </div>

            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-px mx-2
                  ${index < currentStep
                    ? 'bg-[#DA2128]'
                    : 'bg-[#B4AFB4]'
                  }
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step titles */}
      <div className="flex items-end justify-between w-full max-w-sm mt-2 ">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center first:text-left last:text-right">
            <span
              className={`
                text-xs font-semibold
                ${index <= currentStep
                  ? 'text-[#DA2128]'
                  : 'text-[#B4AFB4]'
                }
              `}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
