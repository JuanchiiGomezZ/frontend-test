import { Icon } from '../../../components/ui/Icon/Icon';
import { IconNames } from '../../../components/ui/Icon/Icons';
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
        className={`${isActive ? 'color-red' : ''} stroke-2`}
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
    <div className="border-background-darker border-[1px] w-full h-auto">
      <div className="aspect-square w-full relative">
        <img src={picture} alt={title} className="w-full h-full" />
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
      <div className="h-[100px] w-full flex justify-center items-center flex-col">
        <h3 className="text-card-title uppercase">{title}</h3>
        <div className="space-x-1">
          <span className="text-text-subtle">by</span>
          <span>{author}</span>
        </div>
        <span>
          {new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
          }).format(price)}
        </span>
      </div>
    </div>
  );
};
