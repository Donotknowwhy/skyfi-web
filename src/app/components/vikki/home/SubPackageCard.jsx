"use client";

const SubPackageCard = ({ packageData }) => {
  if (!packageData) return null;

  const remainData = parseFloat(packageData.remainData || 0);
  const totalData = parseFloat(packageData.totalData || 1);
  const dataPercentage = Math.max(
    0,
    Math.min(100, (remainData / totalData) * 100),
  );

  // Calculate remaining days
  const calculateRemainingDays = () => {
    if (!packageData.toDate) return "0/0";
    try {
      const toDate = new Date(
        packageData.toDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1"),
      );
      const fromDate = new Date(
        packageData.fromDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1"),
      );
      const now = new Date();
      const totalDays = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));
      const usedDays = Math.ceil((now - fromDate) / (1000 * 60 * 60 * 24));
      return `${Math.max(1, usedDays)}/${totalDays}`;
    } catch (e) {
      return "0/0";
    }
  };

  const dayStatus = calculateRemainingDays();

  console.log(dataPercentage);

  return (
    <div className="bg-white rounded-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-[#F2F2F7] flex items-center justify-center">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5 20V11M14.5 20V14M10.5 20V17M6.5 20V19"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="text-sm font-bold text-[#333333]">
          {packageData.packageName}
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-[15px] font-bold text-[#333333]">
            {(totalData / 1024).toFixed(0)}GB
          </span>
          <span className="text-[11px] text-[#8A8A8A]">/ ngày</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-[#F2F2F7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0000FF] rounded-full"
            style={{ width: `${dataPercentage}%` }}
          />
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-[11px] font-medium mt-0.5">
          <div className="flex items-center gap-0.5">
            <span className="text-[#0000FF]">{remainData.toFixed(0)}MB</span>
            <span className="text-[#8A8A8A]">/{totalData.toFixed(0)}MB</span>
          </div>
          <span className="text-[#8A8A8A]">{dayStatus} ngày</span>
        </div>
      </div>
    </div>
  );
};

export default SubPackageCard;
