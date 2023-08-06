import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import "./slider.css"
 const SliderData = [
    {
      image:
        '/image.jpg',
        text:"Chaque clic, chaque leçon vous rapproche de la réalisation de vos ambitions. Continuez à avancer avec détermination."
    },
    {
      image:
      '/image2.jpg',
      text:"Votre apprentissage vous suit, que vous soyez à la maison, en déplacement ou quelque part entre les deux."
    },
    {
      image:
      '/image3.jpg',
      text:"Accédez à un monde de possibilités avec nos certifications en ligne reconnues, propulsant votre carrière vers de nouveaux sommets."
    },
  ];
  

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} color='white'/>
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} color='white'/>
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (<div className='relative'>
              <img src={slide.image} alt='travel image' className='image' />
              <p className='bg-white text-lg p-6 text-black w-[40%] rounded absolute bottom-[5%] right-3 opacity-[0.6]' >{slide.text}</p>
              </div>
            )}

          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
