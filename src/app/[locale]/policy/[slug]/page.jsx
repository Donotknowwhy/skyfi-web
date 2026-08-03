import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

import dataMocPolicy from "../../../dataMoc.js";

// Generate static params for all policy slugs
export async function generateStaticParams() {
  return dataMocPolicy.map( ( policy ) => ( {
    slug: policy.slug,
  } ) );
}

// Generate metadata for each policy page
export async function generateMetadata( { params } ) {


  const { slug } = await params;
  const policyData = dataMocPolicy.find( policy => policy.slug === slug );

  if ( !policyData ) {
    return {
      title: 'Policy Not Found | SkyFi',
      description: 'The requested policy page could not be found.',
    };
  }

  return {
    title: `${ policyData.title } | SkyFi`,
    description: `${ policyData.content.replace( /<[^>]*>/g, '' ).substring( 0, 160 ) }...`,
    openGraph: {
      title: `${ policyData.title } | SkyFi`,
      description: `${ policyData.content.replace( /<[^>]*>/g, '' ).substring( 0, 160 ) }...`,
      type: 'article',
    },
  };
}

// Function to get policy data by slug
const getPolicyBySlug = ( slug ) => {
  return dataMocPolicy.find( policy => policy.slug === slug );
};

// Function to get policy translation key based on slug



const PolicyPage = async ( { params } ) => {

  const { slug } = await params;
  const policyData = dataMocPolicy.find( policy => policy.slug === slug );
  if ( !policyData ) {
    return <div>Policy not found</div>;
  }

  return (
    <div className="bg-[#F5F5F5]">

      <Header />


      <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/figma-section-images/policy-banner-bg.png')"
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-[#333333] leading-tight">
              { policyData.title }
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */ }
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div dangerouslySetInnerHTML={ { __html: policyData.content } } />
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default PolicyPage;
