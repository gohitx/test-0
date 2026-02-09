import Svg, { Path } from 'react-native-svg';

type PlusIconProps = {
  size?: number;
  color?: string;
};

export default function PlusIcon({
  size = 24,
  color = '#141B34',
}: PlusIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path
        d="M12 5l0 14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 12l14 0"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
