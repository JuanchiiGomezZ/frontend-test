export const ImageCardSkeleton = () => {
  return <div className="animate-pulse w-full h-[400px] bg-gray-300" />;
};

export const ImagesListSkeleton = ({ length = 3 }: { length: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
      {Array.from({ length: length }).map((_, index) => (
        <ImageCardSkeleton key={index} />
      ))}
    </div>
  );
};
