import { Image } from '../../../../types/api';
import { formatPrice } from '../../utils/format';
import { ActionButton } from './ActionButton';

interface ImageCardProps extends Image {
  onLike?: (id: string) => void;
}

const FALLBACK_IMAGE = '../assets/fallback-image.jpg';

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
          <span className="pl-1 pt-6 inline-block">{formatPrice(price)}</span>
        </div>
        <div className="absolute bottom-5 right-1 sm:flex gap-3 p-2 flex-col hidden">
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
      <div className="sm:hidden grid grid-cols-2 h-[60px] w-full relative">
        <ActionButton
          onClick={() => onLike?.(id)}
          count={likesCount}
          icon="Heart"
          isActive={isLiked}
        />
        <div className="absolute right-1/2 h-full w-[1px] bg-background-darker" />
        <ActionButton count={0} icon="Share" />
      </div>
    </div>
  );
};

ImageCard.displayName = 'ImageCard';
