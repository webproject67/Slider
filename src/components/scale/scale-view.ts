import AbstractView from '../../scripts/abstract-view';

export default class ScaleView extends AbstractView {
  get template(): string {
    return `
      <ul class="slider__list"> 
        <li class="slider__item">|
          <span class="slider__item--number">0</span>
        </li>
        <li class="slider__item">|
          <span class="slider__item--number">25</span>
        </li>
        <li class="slider__item">|
          <span class="slider__item--number">50</span>
        </li>
        <li class="slider__item">|
          <span class="slider__item--number">75</span>
        </li>
        <li class="slider__item">|
          <span class="slider__item--number">100</span>
        </li>
      </ul>
    `
  }
}