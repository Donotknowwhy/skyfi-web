const CircularProgress = ({ usedData, totalData, unit = "GB", t }) => {
  const percentage = totalData > 0 ? (usedData / totalData) * 100 : 0;
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-[120px] h-[120px] flex-shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        {/* Background gradient circle */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="17%" stopColor="rgba(250, 233, 228, 1)" />
            <stop offset="53%" stopColor="rgba(238, 246, 254, 1)" />
            <stop offset="100%" stopColor="rgba(245, 255, 249, 1)" />
          </linearGradient>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DA2128" />
            <stop offset="4%" stopColor="#DA2128" />
            <stop offset="47%" stopColor="#DA2128" />
            <stop offset="78%" stopColor="#DA2128" />
            <stop offset="98%" stopColor="#FF8A00" />
            <stop offset="100%" stopColor="#FFB907" />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="url(#bgGradient)"
          strokeWidth="8.57"
        />
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="8.57"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <span className="text-[10px] font-semibold text-[#5C5C5C]">{t("remaining")}</span>
        <span className="text-[13px] font-bold text-[#DA2128] leading-tight">
          {usedData} {unit}
        </span>
        <span className="text-[10px] font-semibold text-[#5C5C5C]">
          / {totalData} {unit}
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;    