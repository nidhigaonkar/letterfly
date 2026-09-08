import { PaperStar, PaperHeart, SingleFlower, FlowerBouquet, RibbonBow, WashiTape } from './StickerArt';

export default function Sticker({ type, color }) {
  switch (type) {
    case 'star':
      return <PaperStar color={color} />;
    case 'heart':
      return <PaperHeart color={color} />;
    case 'flower':
      return <SingleFlower color={color} />;
    case 'bouquet':
      return <FlowerBouquet colors={color} />;
    case 'bow':
      return <RibbonBow color={color} />;
    case 'washi':
      return <WashiTape color={color} />;
    default:
      return null;
  }
}
