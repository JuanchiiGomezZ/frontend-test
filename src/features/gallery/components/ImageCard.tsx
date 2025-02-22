import { Icon } from '../../../components/ui/Icon/Icon';
import { IconNames } from '../../../components/ui/Icon/Icons';
import { Image } from '../../../types/api';

interface ImageCardProps extends Image {
  onLike?: (id: string) => void;
}

const FALLBACK_IMAGE = '../assets/fallback-image.jpg';

const ActionButton = ({
  onClick,
  count,
  isActive,
  icon,
}: {
  onClick?: () => void;
  count: number;
  isActive?: boolean;
  icon: IconNames;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center  flex-col text-white cursor-pointer"
    >
      <Icon
        name={icon}
        className={isActive && onClick ? 'text-red' : 'text-white'}
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
        <img
          src={picture}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
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
        <div className="absolute bottom-5 right-1 flex gap-3 p-2 flex-col">
          <ActionButton
            onClick={() => onLike?.(id)}
            count={likesCount}
            icon="Heart"
            isActive={isLiked}
          />
          <ActionButton count={0} icon="Share" />
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

ImageCard.displayName = 'ImageCard';
