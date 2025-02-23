// ListFooter.tsx
import { ListSkeleton } from './ListSkeleton';

export interface ListFooterProps {
  hasMore: boolean;
  isLoading: boolean;
  error?: Error | null;
  hasResults: boolean;
}

export const ListFooter = ({
  hasMore,
  isLoading,
  error,
  hasResults,
}: ListFooterProps) => {
  if (error) return null;
  console.log({
    hasMore,
    isLoading,
    error,
    hasResults,
  });
  if (!hasMore && !isLoading && hasResults) {
    return (
      <div
        className="flex flex-col items-center p-8 text-gray-500"
        role="status"
        aria-label="Fin de la lista"
      >
        <p className="text-center">
          Eso es todo por ahora. Muchas gracias por visitar nuestra galería de
          gatitos. ❤️😸
        </p>
      </div>
    );
  }
  if (isLoading) return <ListSkeleton length={3} />;

  return null;
};

ListFooter.displayName = 'ListFooter';
