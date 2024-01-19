import PropType from 'prop-types';

const MarqueeTop = ({ data }) => {
  return (
    <div className="relative">
      <ul className="flex flex-col gap-4 h-full justify-between animate-marquee-Top-1">
        {data.map((img) => (
          <li key={`${crypto.randomUUID()}-img-top-1`}>
            <img
              className="h-auto max-w-full rounded-lg object-cover"
              src={img}
              alt={'background-banner'}
            />
          </li>
        ))}
      </ul>
      <ul className="absolute top-0 flex flex-col h-full  justify-between gap-4 animate-marquee-Top-2 mt-[16px]">
        {data.map((img) => (
          <li key={`${crypto.randomUUID()}-img-top-2`}>
            <img
              className="h-auto max-w-full rounded-lg object-cover"
              src={img}
              alt={'background-banner'}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

MarqueeTop.propTypes = {
  data: PropType.array,
};

export default MarqueeTop;
