import { useState, useEffect } from 'react';

const CarouselTestimoni = ({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <div className="overflow-hidden relative pb-28 pt-14">
        <div
          className="w-[3952px] flex gap-x-8 transition-transform ease-out duration-300"
          style={{ transform: `translateX(-${curr * 430}px)` }}
        >
          {slides}
        </div>

        {/* Indicator */}
        <div className="absolute bottom-5 left-">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`
                  transition-all w-[15px] h-[15px] rounded-full
                  ${curr === i ? 'w-[45px] h-[15px] bg-brown' : 'bg-[#DDE0E4]'}
                `}
              ></button>
            ))}
          </div>
        </div>
        {/* prev and next */}
        <div className="absolute bottom-0 right-0 flex flex-row gap-x-3">
          <button
            onClick={prev}
            className="flex flex-row justify-center items-center w-[60px] h-[60px] border-2 border-brown rounded-full  rotate-180"
          >
            <span className="-mt-2 w-fit text-[30px] text-brown text-center">&#8594;</span>
          </button>
          <button
            onClick={next}
            className="flex flex-row justify-center items-center w-[60px] h-[60px] bg-brown rounded-full"
          >
            <span className="-mt-2 w-fit text-[30px] text-white text-center">&#8594;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CarouselTestimoni;
