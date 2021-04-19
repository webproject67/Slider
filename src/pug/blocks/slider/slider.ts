import slider from '../../../components/presenter/slider-presenter';

slider.showAll();

// const slider: JQuery<HTMLElement> = $('.slider__slider');
// const sliderToggle: JQuery<HTMLElement> = $('.slider__toggle');
// const min: number = +$('.slider__min').val()!;
// const max: number = +$('.slider__max').val()!;
// const stepSize: number = +$('.slider__step').val()!;

// // Запишем текущее значение 
// $('.slider__current').val(min);


// // Найдем координаты
// const getCoords = (
//   elem: JQuery<HTMLElement>
// ): {
//   left: number;
//   width: number;
// } => {
//   const boxLeft: number = <number>elem.offset()!.left;
//   const boxRight: number = boxLeft + <number>elem.outerWidth();

//   return {
//     left: boxLeft + pageXOffset,
//     width: boxRight - boxLeft,
//   };
// }


// // Нажимаем и удерживаем ползунка
// sliderToggle.on('mousedown', function (evt) {
//   const sliderCoords: {
//     left: number;
//     width: number;
//   } = getCoords(slider);

//   const sliderToggleCoords: {
//     left: number;
//     width: number;
//   } = getCoords(sliderToggle);

//   const shift: number = evt.pageX - sliderToggleCoords.left;


//   //Начнем движение ползунка
//   $(document).on('mousemove', function (evt) {
//     let left: number = ((evt.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
//     if (left < 0) left = 0;
//     if (left > 100) left = 100;

//     //Шаг слайдера
//     const stepCount: number = (max - min) / stepSize;
//     const stepPercent: number = 100 / stepCount;
//     let stepLeft: number = Math.round(left / stepPercent) * stepPercent;
//     if (stepLeft < 0) stepLeft = 0;
//     if (stepLeft > 100) stepLeft = 100;
//     sliderToggle.css({'left': stepLeft + '%'});

//     //Расчитаем значение равное шагу слайдера
//     const result: number = <number><unknown>(((stepLeft / stepPercent) * stepSize).toFixed());
//     const values: number = +result + min;
//     $('.slider__current').val(values);
//     const reverseValue: number = 100 - values;
//     $('.slider__bar').css({'marginRight': reverseValue + '%'});
//   })

//   //Остановим движение ползунка
//   $(document).on('mouseup', function () {
//     $(document).off('mousemove')
//   })
// })