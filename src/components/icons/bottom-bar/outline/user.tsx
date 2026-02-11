import Svg, { Path } from 'react-native-svg';

type UserOutlineProps = {
  size?: number;
  color?: string;
};

export default function UserOutline({
  size = 24,
  color = '#FFFFFF',
}: UserOutlineProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.41016 22C3.41016 18.13 7.26015 15 12.0002 15C16.7402 15 20.5901 18.13 20.5901 22"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
