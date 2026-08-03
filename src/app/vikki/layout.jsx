
export const metadata = {
  title: 'Vikki',
  description: 'Vikki Information Page',
};

export default function VikkiLayout({ children }) {
  return (
      <div className="max-w-[500px] mx-auto w-full p-4 " style={{background: 'linear-gradient(0deg, #FFFFFF 0%, #FFFDFC 20%, #FEF8F4 40%, #FCF1EE 60%, #F3E8F4 80%, #E8E5FA 100%)'}}>
        {children}
      </div>


  );
}