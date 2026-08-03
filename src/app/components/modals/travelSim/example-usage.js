import { showModalVerify } from './modalVerify';

// Example of how to use the ModalVerify component

const handleOpenVerifyModal = () => {
    showModalVerify({
        packageInfo: {
            name: "Gói VJ70/1GB - 7 ngày",
            price: "70.000 VND"
        },
        onSkip: () => {
            console.log("User clicked Skip");
            // Handle skip action - maybe just close or navigate away
        },
        onContinue: () => {
            console.log("User clicked Continue Payment");
            // Handle continue action - proceed to payment
            // You can redirect to payment page or open payment modal
        },
        onClose: () => {
            console.log("Modal was closed");
            // Handle modal close event
        }
    });
};

// Example usage in a component:
/*
import { showModalVerify } from '@/components/modals/travelSim';

const MyComponent = () => {
    const handlePurchasePackage = (packageData) => {
        // Show verification modal before proceeding
        showModalVerify({
            packageInfo: packageData,
            onSkip: () => {
                // User chose to skip this warning
                // Maybe continue with current package or close modal
            },
            onContinue: () => {
                // User confirmed they want to continue
                // Proceed to payment
                window.location.href = '/checkout';
            }
        });
    };

    return (
        <button onClick={() => handlePurchasePackage({
            name: "VJ70/1GB - 7 days package",
            price: "70,000 VND"
        })}>
            Buy Package
        </button>
    );
};
*/

export { handleOpenVerifyModal };
