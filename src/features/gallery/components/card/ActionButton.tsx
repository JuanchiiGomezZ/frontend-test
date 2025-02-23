import { Icon } from '../../../../components/ui/Icon/Icon';
import { IconNames } from '../../../../components/ui/Icon/Icons';

export const ActionButton = ({
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
      className="flex flex-row-reverse items-center sm:flex-col sm:text-white cursor-pointer border-background-darker border-t-[1px] sm:border-none w-full justify-center p-2 gap-1"
    >
      <Icon
        name={icon}
        className={`${isActive && onClick ? 'text-red' : ''} hover:opacity-70`}
        size="28"
      />
      {count}
    </button>
  );
};
ActionButton.displayName = 'ActionButton';
