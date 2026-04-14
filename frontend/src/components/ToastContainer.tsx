import React from 'react';
import { useToast } from '../context/ToastContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  const getStyles = (type: string) => {
    const baseStyles = 'flex items-start gap-3 p-4 rounded-lg shadow-lg';
    const typeStyles = {
      success: 'bg-green-50 border border-green-200',
      error: 'bg-red-50 border border-red-200',
      info: 'bg-blue-50 border border-blue-200',
      warning: 'bg-yellow-50 border border-yellow-200',
    };
    return `${baseStyles} ${typeStyles[type as keyof typeof typeStyles] || typeStyles.info}`;
  };

  const getIcon = (type: string) => {
    const iconProps = 'w-5 h-5 flex-shrink-0 mt-0.5';
    const iconStyles = {
      success: <CheckCircle className={`${iconProps} text-green-600`} />,
      error: <AlertCircle className={`${iconProps} text-red-600`} />,
      info: <Info className={`${iconProps} text-blue-600`} />,
      warning: <AlertCircle className={`${iconProps} text-yellow-600`} />,
    };
    return iconStyles[type as keyof typeof iconStyles] || iconStyles.info;
  };

  const getTextColor = (type: string) => {
    const colors = {
      success: 'text-green-800',
      error: 'text-red-800',
      info: 'text-blue-800',
      warning: 'text-yellow-800',
    };
    return colors[type as keyof typeof colors] || colors.info;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <div key={toast.id} className={getStyles(toast.type)}>
          {getIcon(toast.type)}
          <p className={`flex-1 text-sm font-medium ${getTextColor(toast.type)}`}>
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
