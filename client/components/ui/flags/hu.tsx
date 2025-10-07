import { View } from "react-native";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

export const HuFlag = () => (
  <View>
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
      <G clipPath="url(#HU_svg__a)">
        <Path
          d="M.746 7.825A11.975 11.975 0 0 0 0 12c0 1.468.264 2.874.746 4.174L12 17.217l11.254-1.044c.482-1.3.746-2.706.746-4.174 0-1.468-.264-2.874-.746-4.174L12 6.782.746 7.825Z"
          fill="#F0F0F0"
        />
        <Path
          d="M12-.001C6.842-.001 2.444 3.256.748 7.825h22.507C21.56 3.255 17.16 0 12.001 0Z"
          fill="#D80027"
        />
        <Path
          d="M12 24c5.16 0 9.559-3.257 11.254-7.827H.747C2.443 20.743 6.841 24 12.001 24Z"
          fill="#6DA544"
        />
      </G>
      <Defs>
        <ClipPath id="HU_svg__a">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  </View>
);
