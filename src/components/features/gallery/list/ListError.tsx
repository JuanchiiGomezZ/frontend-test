// ListError.tsx
import { memo } from 'react';
import { ApolloError } from '@apollo/client';

export interface ListErrorProps {
  error: ApolloError;
  onRetry?: () => void;
}

export const ListError = memo(({ error, onRetry }: ListErrorProps) => (
  <div
    className="flex flex-col items-center gap-4 p-8"
    role="alert"
    aria-live="polite"
  >
    <p className="text-red-500 text-center">
      ¡Ups! Algo salió mal: {error.message}
    </p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      aria-label="Intentar cargar de nuevo"
    >
      Intentar de nuevo
    </button>
  </div>
));

ListError.displayName = 'ListError';
