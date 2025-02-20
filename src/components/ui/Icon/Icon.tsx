import { Icons, IconNames } from './Icons';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconNames;
  size?:
    | '10'
    | '11'
    | '12'
    | '14'
    | '16'
    | '20'
    | '22'
    | '24'
    | '28'
    | '32'
    | '40';
  color?: string;
  viewBox?: string;
  duotone?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = '14',
  color = 'current',
  viewBox = '0 0 20 20',
  ...props
}) => {
  return (
    <svg
      style={{ fill: color }}
      width={size}
      height={size}
      viewBox={viewBox}
      name={name}
      {...props}
    >
      {Icons[name]()}
    </svg>
  );
};
