import decorativeSymbol from '@/assets/decorative-symbol.svg';

interface DecorativeSymbolProps {
  rotation?: number;
  position?: string; // tailwind positioning classes
  size?: string; // tailwind width class
}

const DecorativeSymbol = ({
  rotation = -15,
  position = 'bottom-0 left-1/2 -translate-x-1/2',
  size = 'w-[800px] md:w-[800px] lg:w-[1000px]',
}: DecorativeSymbolProps) => (
  <div className={`absolute ${position} pointer-events-none z-0`}>
    <img
      src={decorativeSymbol}
      alt=""
      aria-hidden="true"
      className={`${size} h-auto opacity-[0.03]`}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  </div>
);

export default DecorativeSymbol;
