// ListEmpty.tsx
import { memo } from 'react';

export interface ListEmptyProps {
  message?: string;
}

export const ListEmpty = memo(
  ({
    message = 'No se encontraron imágenes. Intenta con otro término de búsqueda.',
  }: ListEmptyProps) => (
    <div
      className="flex flex-col items-center justify-center p-8 text-gray-500"
      role="status"
      aria-label="Lista vacía"
    >
      <p className="text-center text-lg">{message}</p>
    </div>
  )
);

ListEmpty.displayName = 'ListEmpty';
