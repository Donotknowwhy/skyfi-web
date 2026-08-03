const InfoItem = ({ label, value }) => (
  <div className="flex flex-col gap-1 py-2  flex-1">
    <span className="text-xs text-[#8A8A8A]">{label}</span>
    <span className="text-sm font-medium text-[#333333]">{value}</span>
  </div>
);
 export default InfoItem;