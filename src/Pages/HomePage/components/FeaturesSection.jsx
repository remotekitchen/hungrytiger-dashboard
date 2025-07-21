import DigitalMenu from "./DigitalMenu";
import FSec1 from "./FSec1";
import FSec2 from "./FSec2";
import FSec3 from "./FSec3";
import FSec4 from "./FSec4";
import UnmatchedFlexibility from "./UnmatchedFlexibility";

const FeaturesSection = () => {
  return (
    <div className="flex flex-col gap-24">
      <FSec1 />
      <FSec2 />
      <FSec3 />
      <FSec4 />
      <UnmatchedFlexibility/>
      <DigitalMenu/>
    </div>
  );
};

export default FeaturesSection;
