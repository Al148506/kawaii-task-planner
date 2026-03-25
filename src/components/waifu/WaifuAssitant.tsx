import { waifuImages, type WaifuMood } from "./waifuExpressions";
import "./WaifuAssistant.css";

interface Props {
  mood: WaifuMood;
  message: string;
}
const WaifuAssistant = ({ mood, message }: Props) => {
  return (
    <div className="waifu-container">
      <div className="waifu-image-wrap">
        <img src={waifuImages[mood]} alt="waifu" className="waifu-image" />
      </div>
      <div className="waifu-dialog">{message}</div>
    </div>
  );
};

export default WaifuAssistant;
