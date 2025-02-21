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
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = '14',
  color = 'currentColor',
  viewBox = '0 0 24 24',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      name={name}
      fill={color}
      stroke={color}
      {...props}
    >
      {Icons[name]()}
    </svg>
  );
};
