import { ExclamationTriangleIcon, TruckIcon } from '@heroicons/react/24/solid';

const Note = ({
  type = 'info',
  icon: CustomIcon,
  children,
  className = ''
}) => {
  // Default icons based on type
  const getDefaultIcon = () => {
    switch (type) {
      case 'shipping':
        return TruckIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      default:
        return null;
    }
  };

  const IconComponent = CustomIcon || getDefaultIcon();

  // Base styles for the note component
  const baseStyles = "w-full rounded-xl p-3 sm:p-4";

  // Background color based on type
  const backgroundStyles = {
    info: "bg-orange-50",
    shipping: "bg-orange-50",
    warning: "bg-orange-50"
  };

  const iconStyles = {
    info: "text-blue-600",
    shipping: "text-blue-600",
    warning: "text-orange-500"
  };

  return (
    <div className={`${baseStyles} ${backgroundStyles[type]} ${className} shadow`}>
      <div className="flex gap-3 sm:gap-4 items-center">
        {IconComponent && (
          <div className="flex-shrink-0">
            <div className={`w-6 h-6 ${iconStyles[type]}`}>
              <IconComponent className="w-full h-full" />
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-xs sm:text-sm text-gray-900 font-normal leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Predefined note variants for common use cases
export const ShippingNote = ({ children, className }) => (
  <Note type="shipping" className={className}>
    {children}
  </Note>
);

export const WarningNote = ({ children, className }) => (
  <Note type="warning" className={className}>
    {children}
  </Note>
);

export const InfoNote = ({ children, className }) => (
  <Note type="info" className={className}>
    {children}
  </Note>
);

export default Note;