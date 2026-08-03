# ModalVerify Component

A verification modal component that warns users about purchasing new data packages that will cancel existing data.

## Design Reference

Based on Figma design: [Luồng VJ - Popup web](https://www.figma.com/design/aLrGr4CsfMXsDg3gYz9XtR/Lu%E1%BB%93ng-VJ?node-id=856-13064&t=OCx71Rr9fd6HRDrb-4)

## Features

- ⚠️ Warning icon and message about data cancellation
- 📦 Package information display
- 🎨 Matches Figma design specifications
- 🌐 Internationalization support (English/Vietnamese)
- 📱 Responsive design
- ♿ Accessible button interactions

## Usage

### Basic Usage

```jsx
import { showModalVerify } from '@/components/modals/travelSim';

// Show the modal
showModalVerify({
    packageInfo: {
        name: "VJ70/1GB - 7 days package",
        price: "70,000 VND"
    },
    onSkip: () => {
        console.log("User skipped");
    },
    onContinue: () => {
        console.log("User wants to continue");
        // Redirect to payment or next step
    },
    onClose: () => {
        console.log("Modal closed");
    }
});
```

### Component Props

#### `ModalVerify` Component Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSkip` | `function` | No | Callback when skip button is clicked |
| `onContinue` | `function` | No | Callback when continue button is clicked |
| `packageInfo` | `object` | No | Package information to display |
| `packageInfo.name` | `string` | No | Package name (falls back to translation) |
| `packageInfo.price` | `string` | No | Package price (falls back to translation) |
| `className` | `string` | No | Additional CSS classes |

#### `showModalVerify` Function Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSkip` | `function` | No | Callback when skip button is clicked |
| `onContinue` | `function` | No | Callback when continue button is clicked |
| `packageInfo` | `object` | No | Package information to display |
| `onClose` | `function` | No | Callback when modal is closed |

## Translation Keys

The component uses the following translation keys under `travelSim.modalVerify`:

- `title` - Modal title ("LƯU Ý" / "NOTICE")
- `warningMessage` - Warning message about data cancellation
- `packageTitle` - Section title for package info
- `defaultPackageName` - Default package name if not provided
- `defaultPrice` - Default price if not provided
- `instructionText` - Instruction text (hidden by default)
- `skipButton` - Skip button text
- `continueButton` - Continue button text

## Styling

The component uses Tailwind CSS classes and follows the design specifications:

- Modal width: max-w-[580px]
- Warning icon: 87x87px with yellow background
- Buttons: Skip (outline) and Continue (filled) with proper ratios
- Colors match Figma design (#E69818 for primary, #333333 for text, etc.)

## Example Integration

```jsx
const PurchaseFlow = () => {
    const handlePurchase = (packageData) => {
        // Show verification before proceeding
        showModalVerify({
            packageInfo: packageData,
            onContinue: () => {
                // User confirmed, proceed to payment
                router.push('/checkout');
            },
            onSkip: () => {
                // User skipped, maybe show other options
                console.log('Purchase skipped');
            }
        });
    };

    return (
        <div>
            <button onClick={() => handlePurchase({
                name: "Premium Data Package",
                price: "150,000 VND"
            })}>
                Buy Now
            </button>
        </div>
    );
};
```

## Dependencies

- `clsx` - For conditional CSS classes
- `next-intl` - For internationalization
- `@headlessui/react` - For modal functionality (via modal utility)
- Custom modal utility from `../../../utils/modal`
