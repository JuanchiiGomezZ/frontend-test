import { Icon } from '../../ui/Icon/Icon';
import { IconNames } from '../../ui/Icon/Icons';
import { Image } from '../../../types/api';

// src/components/ui/ImageCard.tsx
interface ImageCardProps extends Image {
  onLike?: (id: string) => void;
}

const ActionButton = ({
  onClick,
  count,
  isActive,
  icon,
}: {
  onClick: () => void;
  count: number;
  isActive?: boolean;
  icon: IconNames;
}) => {
  return (
    <button onClick={onClick} className="flex items-center gap-1 flex-col">
      <Icon
        name={icon}
        className={isActive ? 'text-red' : 'text-text-subtle'}
        size="28"
      />
      {count}
    </button>
  );
};

export const ImageCard = ({
  picture,
  id,
  price,
  title,
  liked: isLiked,
  author,
  likesCount,
  onLike,
}: ImageCardProps) => {
  return (
    <div className="border-background-darker border-[1px] w-full h-full flex flex-col">
      <div className="aspect-square w-full relative">
        <img src={picture} alt={title} className="w-full h-full object-cover" />
        <div
          className="absolute top-0 left-0 w-28 aspect-square bg-white"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }}
        >
          <span className="pl-1 pt-4 inline-block">
            {new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'EUR',
            }).format(price)}
          </span>
        </div>
        <div className="absolute bottom-0 right-0 flex space-x-1 p-2 flex-col">
          <ActionButton
            onClick={() => onLike?.(id)}
            count={likesCount}
            icon="Heart"
            isActive={isLiked}
          />
          <ActionButton
            onClick={() => onLike?.(id)}
            count={likesCount}
            icon="Share"
          />
        </div>
      </div>
      <div className="p-3 flex-1 flex justify-center items-center flex-col">
        <h3 className="text-card-title uppercase text-center text-clip line-clamp-2">
          {title}
        </h3>
        <div className="space-x-1">
          <span className="text-text-subtle">by</span>
          <span>{author}</span>
        </div>
      </div>
    </div>
  );
};
