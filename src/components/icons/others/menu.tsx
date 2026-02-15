import Svg, { Path } from 'react-native-svg';

type MenuIconProps = {
  size?: number;
  color?: string;
};

export default function MenuIcon({
  size = 24,
  color = '#FFFFFF',
}: MenuIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 12L10 12"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 5L4 5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
