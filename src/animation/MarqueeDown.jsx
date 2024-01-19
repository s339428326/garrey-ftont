import PropType from 'prop-types';

const MarqueeDown = ({ data }) => {
  return (
    <div className="relative">
      <ul className="flex flex-col gap-4 h-full justify-between animate-marquee-Down-1">
        {data.map((img) => (
          <li key={`${crypto.randomUUID()}-down-1`}>
            <img
              className="h-auto max-w-full rounded-lg object-cover"
              src={img}
              alt="background-down-1"
            />
          </li>
        ))}
      </ul>
      <ul className="absolute top-0 flex flex-col h-full  justify-between gap-4 animate-marquee-Down-2 mb-4">
        {data.map((img) => (
          <li key={`${crypto.randomUUID()}-down-2`}>
            <img
              className="h-auto max-w-full rounded-lg object-cover"
              src={img}
              alt="background-down-2"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
MarqueeDown.propTypes = {
  data: PropType.array,
};

export default MarqueeDown;
