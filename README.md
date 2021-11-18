# Slider
Плагин делает выбранные элементы ползунками. Существует горизонтальный или вертикальный вид и имеет одну ручку или две, перемещает с помощью мыши и тач устройствах.

## Demo
[online](https://webproject67.github.io/Slider/)

## Команды запуска
- npm i - установка
- npm run test - тест
- npm run build - компиляция
- npm run start - запуск

## Синтаксис
```typescript
$(селектор).slider(опции)
```
- Селектор выбирает элемент, который будет превращен в виджет.
- Опции настраивают дополнительные аспекты поведения виджета.

## Пример использования
```typescript
$('#block').slider();
$('#block').slider({view: 'vertical'});
$('#block').slider({
  range: 'range',
  min: 10,
  max: 50,
  step: 10,
  progress: false,
});
```

## Получить состояние
```typescript
const slider1 = $('#block').slider();
slider1.slider('getState');
```

## Обновить состояние
```typescript
const slider1 = $('#block').slider();
slider1.slider('setState', {range: 'range'});
```

## Показать панель конфигурирования
```typescript
const slider1 = $('#block').slider();
slider1.slider('getConfiguring');
```

## Настройки по умолчанию
- max: 100, максимальное значение,
- min: 0, минимальное значение,
- step: 1, минимальное расстояния, на которое может быть перетащен ползунок,
- range: 'one' | 'range', один ползунок или два,
- view: 'horizontal' | 'vertical', горизонтальный или вертикальный вид,
- flag: true | false, показать или скрыть значения,
- progress: true | false, показать или скрыть прогресс бар,
- scale: true | false, показать или скрыть шкалу

## UML
[open](https://github.com/webproject67/Slider/blob/master/UML.svg)

## Приложение написано с использованием паттерна MVP (Model-View-Presenter).
- Model — содержит бизнес-логика, хранит данные для отображения. 
- View — реализует отображение данных (из Модели), принимает ввод пользователя. Абстрактный класс не создает экземпляр, реализован потомкам track, progress, flag, scale, configuring, содержит структура всех представлений: форматирование разметки, отрисовка разметки, навешивание обработчиков.
- Presenter — реализует взаимодействие между Моделью и Видом.
