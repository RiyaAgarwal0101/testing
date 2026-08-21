'use client';

import {
  ReactNode,
  useEffect,
} from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );

      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(event) => {
        if (
          closeOnOverlayClick &&
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

      <div
        className={[
          'relative w-full',
          sizes[size],
          'overflow-hidden rounded-xl',
          'border border-neutral-200',
          'bg-white shadow-xl',
          'animate-in fade-in zoom-in-95 duration-150',
        ].join(' ')}
      >
        {(title || description) && (
          <div className="border-b border-neutral-100 px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                {title && (
                  <h2 className="text-sm font-semibold text-neutral-900">
                    {title}
                  </h2>
                )}

                {description && (
                  <p className="mt-1 text-xs text-neutral-500">
                    {description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="max-h-[75vh] overflow-y-auto p-5">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-neutral-100 bg-neutral-50/50 px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}