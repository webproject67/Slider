!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=2)}([function(t,e,i){"use strict";var n,s,r;Object.defineProperty(e,"__esModule",{value:!0}),e.PanelHandler=e.ViewHandler=e.ModelUpdate=void 0,function(t){t.UPDATE="update"}(n||(n={})),e.ModelUpdate=n,function(t){t.FROMCIRCLE="fromCircle",t.TOCIRCLE="toCircle",t.TRACK="track",t.SCALE="scale"}(s||(s={})),e.ViewHandler=s,function(t){t.MIN="min",t.MAX="max",t.STEP="step",t.VIEW="view",t.RANGE="range",t.FLAG="flag",t.SCALE="scale",t.PROGRESS="progress"}(r||(r={})),e.PanelHandler=r},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){this.observers=[]}return t.prototype.subscribe=function(t){this.observers.push(t)},t.prototype.broadcast=function(t){this.observers.forEach((function(e){return e(t)}))},t}();e.default=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i(3),i(13),i(16)},function(t,e,i){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=n(i(4));$.fn.slider=function(t){return new s.default(this[0],t)}},function(t,e,i){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=n(i(5)),r=function(){function t(t,e){this.init(t,e)}return t.prototype.getState=function(){return this.presenter.getState().value},t.prototype.setState=function(t){this.presenter.setState(t)},t.prototype.updateState=function(t){this.presenter.updateState(t)},t.prototype.subscribe=function(t){this.presenter.subscribe(t)},t.prototype.init=function(t,e){return this.state=$.extend({min:0,max:100,from:0,fromPercent:0,to:100,toPercent:100,step:1,view:!1,range:!1,flag:!0,progress:!0,scale:!0},e),this.presenter=new s.default(t,this.state),this.presenter},t}();e.default=r},function(t,e,i){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=n(i(6)),r=n(i(7)),a=i(0),o=function(){function t(t,e){this.model=new s.default(e),this.view=new r.default(t),this.init()}return t.prototype.getState=function(){return this.model.getState()},t.prototype.setState=function(t){this.model.setState(t)},t.prototype.updateState=function(t){this.model.updateState(t)},t.prototype.subscribe=function(t){this.model.subscribe(t)},t.prototype.init=function(){var t=this;this.view.subscribe((function(e){switch(e.type){case a.ViewHandler.FROMCIRCLE:t.model.setStateFrom(e.value);break;case a.ViewHandler.TOCIRCLE:t.model.setStateTo(e.value);break;case a.ViewHandler.TRACK:case a.ViewHandler.SCALE:t.model.setStateFromOrTo(e.value);break;default:throw new Error("there is no such event")}}));this.model.subscribe((function(e){switch(e.type){case a.ModelUpdate.UPDATE:t.view.updateView(e.value);break;default:throw new Error("no state")}})),this.model.broadcast(this.model.getState())},t}();e.default=o},function(t,e,i){"use strict";var n,s=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var s in e=arguments[i])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t}).apply(this,arguments)},a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=a(i(1)),l=i(0),c=function(t){function e(e){var i=t.call(this)||this;return i.state=e,i.setState(e),i}return s(e,t),e.prototype.getState=function(){return{type:l.ModelUpdate.UPDATE,value:r({},this.state)}},e.prototype.setStateFrom=function(t){var e=t;t>this.state.toPercent&&(e=this.state.toPercent);var i=this.calculateValue(e);this.setState({fromPercent:e,from:i})},e.prototype.setStateTo=function(t){var e=t;t<this.state.fromPercent&&(e=this.state.fromPercent);var i=this.calculateValue(e);this.setState({toPercent:e,to:i})},e.prototype.setStateFromOrTo=function(t){this.state.fromPercent>t?this.setStateFrom(t):this.setStateTo(t)},e.prototype.setState=function(t){if(void 0!==t.min){if("number"!=typeof t.min)throw new Error("invalid value");this.state.min=Number(t.min),this.state.from=this.state.min}if(void 0!==t.max){if("number"!=typeof t.max)throw new Error("invalid value");this.state.max=Number(t.max),this.state.to=this.state.max}if(void 0!==t.step){if("number"!=typeof t.step)throw new Error("invalid value");this.state.step=Number(t.step),this.state.from=this.state.min,this.state.to=this.state.max}if(void 0!==t.from){if("number"!=typeof t.from)throw new Error("invalid value");this.state.from=Number(t.from)}if(void 0!==t.fromPercent&&(this.state.fromPercent=Number(t.fromPercent)),void 0!==t.to){if("number"!=typeof t.to)throw new Error("invalid value");this.state.to=Number(t.to)}if(void 0!==t.toPercent&&(this.state.toPercent=Number(t.toPercent)),void 0!==t.view){if("boolean"!=typeof t.view)throw new Error("invalid value");this.state.view=Boolean(t.view)}if(void 0!==t.range){if("boolean"!=typeof t.range)throw new Error("invalid value");this.state.range=Boolean(t.range),this.state.from=this.state.min}if(void 0!==t.flag){if("boolean"!=typeof t.flag)throw new Error("invalid value");this.state.flag=Boolean(t.flag)}if(void 0!==t.progress){if("boolean"!=typeof t.progress)throw new Error("invalid value");this.state.progress=Boolean(t.progress)}if(void 0!==t.scale){if("boolean"!=typeof t.scale)throw new Error("invalid value");this.state.scale=Boolean(t.scale)}this.validation()},e.prototype.updateState=function(t){var e,i=t.type,n=t.value;this.setState(((e={})[""+i]=n,e))},e.prototype.calculateValue=function(t){var e=this.state,i=e.min,n=e.max,s=e.step,r=100/((n-i)/s),a=Math.round(t/r)*r;return Number((a/r*s).toFixed())+i},e.prototype.validation=function(){this.state.min>=this.state.max&&(this.state.min=this.state.max-1,this.state.from=this.state.max-1);var t=this.state.max-this.state.min;0===this.state.step&&(this.state.step=1),this.state.step<0&&(this.state.step=Math.abs(this.state.step)),(this.state.step>t||this.state.step>t)&&(this.state.step=t);var e=100/(t/this.state.step),i=this.state.from>this.state.max,n=this.state.from<this.state.min,s=this.state.from>this.state.to;(n||i||s)&&(this.state.from=this.state.min),this.state.fromPercent=(this.state.from-this.state.min)/this.state.step*e;var a=this.state.to>this.state.max,o=this.state.to<this.state.min,c=this.state.to<this.state.from;(o||a||c)&&(this.state.to=this.state.max),this.state.toPercent=(this.state.to-this.state.min)/this.state.step*e,this.broadcast({type:l.ModelUpdate.UPDATE,value:r({},this.state)})},e}(o.default);e.default=c},function(t,e,i){"use strict";var n,s=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var a=r(i(1)),o=r(i(8)),l=r(i(9)),c=r(i(10)),u=r(i(11)),d=r(i(12)),h=i(0),p=function(t){function e(e){var i=t.call(this)||this;return i.main=e,i.start=!0,i}return s(e,t),e.prototype.updateView=function(t){this.state=t,this.start?this.render():(this.toggleClassNameSlider(),this.track.updateElement(this.state),this.progress.updateElement(this.state),this.circle.updateElement(this.state),this.flag.updateElement(this.state),this.scale.updateElement(this.state),this.state.progress?this.track.getElement().appendChild(this.progress.getElement()):this.progress.getElement().remove(),this.state.flag?this.slider.appendChild(this.flag.getElement()):this.flag.getElement().remove(),this.state.scale?this.slider.appendChild(this.scale.getElement()):this.scale.getElement().remove())},e.prototype.render=function(){var t=this;this.start=!1,this.slider=this.createElement("slider__inner"),this.toggleClassNameSlider(),this.track=new o.default(this.state),this.track.getElement().addEventListener("click",this.handleTrackClick.bind(this)),this.slider.appendChild(this.track.getElement()),this.progress=new l.default(this.state),this.state.progress&&this.track.getElement().appendChild(this.progress.getElement()),this.circle=new c.default(this.state),this.circle.getElement().querySelectorAll("div").forEach((function(e){e.addEventListener("mousedown",t.handleCircleMouseDown.bind(t)),e.addEventListener("touchstart",t.handleCircleMouseDown.bind(t))})),this.slider.appendChild(this.circle.getElement()),this.flag=new u.default(this.state),this.flag.getElement().querySelectorAll("div").forEach((function(e){e.addEventListener("mousedown",t.handlePinMouseDown.bind(t)),e.addEventListener("touchstart",t.handlePinMouseDown.bind(t))})),this.state.flag&&this.slider.appendChild(this.flag.getElement()),this.scale=new d.default(this.state),this.scale.getElement().querySelectorAll(".slider__item").forEach((function(e){return e.addEventListener("click",t.handleScaleClick.bind(t))})),this.state.scale&&this.slider.appendChild(this.scale.getElement()),this.wrapper=this.createElement("slider__wrapper"),this.wrapper.appendChild(this.slider),this.main.appendChild(this.wrapper)},e.prototype.handlePinMouseDown=function(t){var e=t.currentTarget,i=e.classList.contains("slider__pin_position_maximum"),n=e.classList.contains("slider__pin-vertical_position_maximum"),s=this.circle.getElement().querySelector("div:first-child");(i||n)&&(s=this.state.range?this.circle.getElement().querySelector("div:last-child"):this.circle.getElement().querySelector("div:first-child")),null!==s&&this.replaceCircle(t,s)},e.prototype.handleCircleMouseDown=function(t){var e=t.currentTarget;this.replaceCircle(t,e)},e.prototype.replaceCircle=function(t,e){var i=this;t.preventDefault();var n=function(t){var n=t instanceof TouchEvent?t.targetTouches[0]:t,s=e.classList.contains("slider__circle_position_minimum"),r=e.classList.contains("slider__circle_position_maximum"),a=e.classList.contains("slider__circle_position_vertical-minimum"),o=e.classList.contains("slider__circle_position_vertical-maximum"),l=(n.pageX-i.slider.offsetLeft)/i.track.getElement().clientWidth*100;i.state.view&&(l=(n.pageY-i.slider.offsetTop)/i.track.getElement().clientHeight*100),(s||a)&&i.broadcast({type:h.ViewHandler.FROMCIRCLE,value:l}),(r||o)&&i.broadcast({type:h.ViewHandler.TOCIRCLE,value:l})},s=function(){document.removeEventListener("touchmove",n),document.removeEventListener("mousemove",n),document.removeEventListener("touchend",s),document.removeEventListener("mouseup",s)};document.addEventListener("touchmove",n),document.addEventListener("mousemove",n),document.addEventListener("touchend",s),document.addEventListener("mouseup",s)},e.prototype.handleTrackClick=function(t){var e=t.offsetX/this.track.getElement().clientWidth*100;this.state.view&&(e=t.offsetY/this.track.getElement().clientHeight*100),this.broadcast({type:h.ViewHandler.TRACK,value:e})},e.prototype.handleScaleClick=function(t){var e=t.currentTarget,i=parseFloat(e.style.left);this.broadcast({type:h.ViewHandler.SCALE,value:i})},e.prototype.createElement=function(t){var e=document.createElement("div");return e.className=t,e},e.prototype.toggleClassNameSlider=function(){var t="slider__inner_size_height";this.state.view?this.slider.classList.add(t):this.slider.classList.remove(t)},e}(a.default);e.default=p},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.createElement(t)}return t.prototype.getElement=function(){return this.element},t.prototype.updateElement=function(t){var e="slider__track_size_height";return t.view?this.element.classList.add(e):this.element.classList.remove(e),this.element},t.prototype.createElement=function(t){this.element=document.createElement("div"),this.element.className="slider__track",this.updateElement(t)},t}();e.default=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.createElement(t)}return t.prototype.getElement=function(){return this.element},t.prototype.updateElement=function(t){var e=t.view,i=t.fromPercent,n=t.toPercent,s="slider__bar_size_width";return this.element.style.top="",this.element.style.height="",this.element.style.marginLeft="",this.element.style.marginRight="",e?(this.element.classList.add(s),this.element.style.top=i+"%",this.element.style.height=n-i+"%"):(this.element.classList.remove(s),this.element.style.marginLeft=i+"%",this.element.style.marginRight=100-n+"%"),this.element},t.prototype.createElement=function(t){this.element=document.createElement("div"),this.element.className="slider__bar",this.updateElement(t)},t}();e.default=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.quantityCircle=2,this.circle=[],this.createElements(t)}return t.prototype.getElement=function(){return this.element},t.prototype.updateElement=function(t){for(var e=this,i=t.range,n=t.view,s=t.fromPercent,r=t.toPercent,a=function(t){o.circle[t].className="",o.circle[t].style.left="",o.circle[t].style.top="";var a=function(){e.circle[t].className="slider__circle slider__circle_position_maximum",e.circle[t].style.left=r+"%"},l=function(){e.circle[t].className="slider__circle slider__circle_position_vertical-maximum",e.circle[t].style.top=r+"%"},c=t&&i;c||n||a(),!c&&n&&l(),i&&!n&&(t?a():(e.circle[t].className="slider__circle slider__circle_position_minimum",e.circle[t].style.left=s+"%")),i&&n&&(t?l():(e.circle[t].className="slider__circle slider__circle_position_vertical-minimum",e.circle[t].style.top=s+"%"))},o=this,l=0;l<this.quantityCircle;l+=1)a(l);return this.element},t.prototype.createElements=function(t){this.element=this.createElement("slider__circles");for(var e=0;e<this.quantityCircle;e+=1)this.circle[e]=this.createElement(),this.element.appendChild(this.circle[e]);this.updateElement(t)},t.prototype.createElement=function(t){var e=document.createElement("div");return t&&(e.className=t),e},t}();e.default=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.quantityPin=2,this.pin=[],this.createElements(t)}return t.prototype.getElement=function(){return this.element},t.prototype.updateElement=function(t){for(var e=this,i=t.range,n=t.view,s=t.fromPercent,r=t.toPercent,a=t.from,o=t.to,l=function(t){c.pin[t].className="",c.pin[t].textContent="",c.pin[t].style.left="",c.pin[t].style.top="";var l=function(){e.pin[t].className="slider__pin slider__pin_position_maximum",e.pin[t].textContent=String(o),e.pin[t].style.left=r+"%"},u=function(){e.pin[t].className="slider__pin-vertical slider__pin-vertical_position_maximum",e.pin[t].textContent=String(o),e.pin[t].style.top=r+"%"},d=t&&i;d||n||l(),!d&&n&&u(),i&&!n&&(t?l():(e.pin[t].className="slider__pin slider__pin_position_minimum",e.pin[t].textContent=String(a),e.pin[t].style.left=s+"%")),i&&n&&(t?u():(e.pin[t].className="slider__pin-vertical slider__pin-vertical_position_minimum",e.pin[t].textContent=String(a),e.pin[t].style.top=s+"%"))},c=this,u=0;u<this.quantityPin;u+=1)l(u);return this.element},t.prototype.createElements=function(t){this.element=this.createElement("slider__pins");for(var e=0;e<this.quantityPin;e+=1)this.pin[e]=this.createElement(),this.element.appendChild(this.pin[e]);this.updateElement(t)},t.prototype.createElement=function(t){var e=document.createElement("div");return t&&(e.className=t),e},t}();e.default=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.quantityItem=20,this.item=[],this.quantity=[],this.createElements(t)}return t.prototype.getElement=function(){return this.element},t.prototype.updateElement=function(t){var e=t.min,i=t.max,n=t.step,s=t.view,r="slider__list_state_transformed",a="slider__quantity_state_transformed",o=(i-e)/n,l=100/o,c=1;o>this.quantityItem&&(c=Math.ceil(o/this.quantityItem));for(var u=l*c,d=0;d<=this.quantityItem;d+=1)if(s?(this.element.classList.add(r),this.quantity[d].classList.add(a)):(this.element.classList.remove(r),this.quantity[d].classList.remove(a)),0!==d)if(20!==d)if(this.item[d].style.display="",u>99)this.item[d].style.display="none";else{var h=Number((u/l*n).toFixed())+e;this.quantity[d].textContent=String(h),this.item[d].style.left=u+"%",u+=l*c}else this.item[d].style.left="100%",this.quantity[d].textContent=String(i);else this.item[d].style.left="0%",this.quantity[d].textContent=String(e);return this.element},t.prototype.createElements=function(t){this.element=this.createElement("slider__list");for(var e=0;e<=this.quantityItem;e+=1)this.item[e]=this.createElement("slider__item"),this.item[e].textContent="|",this.quantity[e]=this.createElement("slider__quantity"),this.item[e].appendChild(this.quantity[e]),this.element.appendChild(this.item[e]);this.updateElement(t)},t.prototype.createElement=function(t){var e=document.createElement("div");return e.className=t,e},t}();e.default=n},function(t,e,i){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=n(i(14));$.fn.panel=function(t){return new s.default(this[0],t)}},function(t,e,i){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=n(i(15)),r=i(0),a=function(){function t(t,e){this.main=t,this.slider=e,this.init()}return t.prototype.init=function(){this.configuringPanel=new s.default(this.slider.getState());var t=this.main.querySelector(".slider__wrapper");null!==t&&t.appendChild(this.configuringPanel.getElement()),this.subscribe()},t.prototype.subscribe=function(){var t=this;this.configuringPanel.subscribe((function(e){switch(e.type){case r.PanelHandler.MIN:case r.PanelHandler.MAX:case r.PanelHandler.STEP:case r.PanelHandler.VIEW:case r.PanelHandler.RANGE:case r.PanelHandler.FLAG:case r.PanelHandler.PROGRESS:case r.PanelHandler.SCALE:t.slider.updateState(e);break;default:throw new Error("there is no such event")}}));this.slider.subscribe((function(e){switch(e.type){case r.ModelUpdate.UPDATE:t.configuringPanel.updateElement(e.value);break;default:throw new Error("no state")}}))},t}();e.default=a},function(t,e,i){"use strict";var n,s=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var a=r(i(1)),o=i(0),l=function(t){function e(e){var i=t.call(this)||this;return i.state=e,i.data=[{label:"Минимальное значение",dataset:"min",type:"number"},{label:"Максимальное значение",dataset:"max",type:"number"},{label:"От",dataset:"from",type:"number",readonly:!0},{label:"До",dataset:"to",type:"number",readonly:!0},{label:"Шаг",dataset:"step",type:"number"},{label:"Вертикальный",dataset:"view",type:"checkbox"},{label:"Интервал",dataset:"range",type:"checkbox"},{label:"Значение",dataset:"flag",type:"checkbox"},{label:"Шкала",dataset:"scale",type:"checkbox"},{label:"Прогресс",dataset:"progress",type:"checkbox"}],i.label=[],i.input=[],i.createElements(),i}return s(e,t),e.prototype.getElement=function(){return this.element},e.prototype.updateElement=function(t){var e=this;this.state=t;var i=this.state,n=i.range,s=i.from,r=i.to,a=i.min,o=i.max,l=i.step;return this.data.forEach((function(t,i){"min"===e.input[i].dataset.name&&(e.input[i].value=String(a)),"max"===e.input[i].dataset.name&&(e.input[i].value=String(o)),"step"===e.input[i].dataset.name&&(e.input[i].value=String(l)),"from"===e.input[i].dataset.name&&(e.label[i].style.display=n?"":"none",e.input[i].value=String(s)),"to"===e.input[i].dataset.name&&(e.label[i].textContent=n?"До":"Текущее значение",e.input[i]=e.createElementInput(e.data[3]),e.input[i].value=String(r),e.label[i].appendChild(e.input[i]))})),this.element},e.prototype.createElements=function(){var t=this;this.element=this.createElement("div","slider__labels"),this.data.forEach((function(e,i){t.label[i]=t.createElementLabel(e,i),t.element.appendChild(t.label[i])})),this.updateElement(this.state)},e.prototype.createElement=function(t,e){var i=document.createElement(t);return i.className=e,i},e.prototype.createElementLabel=function(t,e){var i=this.createElement("label","slider__label");i.textContent=t.label;var n="min"===t.dataset,s="max"===t.dataset,r="from"===t.dataset,a="to"===t.dataset,o="step"===t.dataset;return(n||s||r||a||o)&&i.classList.add("slider__label_state_displayed"),this.input[e]=this.createElementInput(t),this.input[e].addEventListener("change",this.handleInputChange.bind(this)),i.appendChild(this.input[e]),i},e.prototype.createElementInput=function(t){var e=this.state,i=e.range,n=e.view,s=e.flag,r=e.scale,a=e.progress,o=this.createElement("input","slider__"+t.dataset);return o.dataset.name=t.dataset,o.type=t.type,t.readonly&&(o.readOnly=t.readonly),"view"===t.dataset&&(o.checked=n),"range"===t.dataset&&(o.checked=i),"flag"===t.dataset&&(o.checked=s),"scale"===t.dataset&&(o.checked=r),"progress"===t.dataset&&(o.checked=a),o},e.prototype.handleInputChange=function(t){var e=t.currentTarget;switch(e.dataset.name){case o.PanelHandler.MIN:this.broadcast({type:o.PanelHandler.MIN,value:Number(e.value)});break;case o.PanelHandler.MAX:this.broadcast({type:o.PanelHandler.MAX,value:Number(e.value)});break;case o.PanelHandler.STEP:this.broadcast({type:o.PanelHandler.STEP,value:Number(e.value)});break;case o.PanelHandler.VIEW:this.broadcast({type:o.PanelHandler.VIEW,value:e.checked});break;case o.PanelHandler.RANGE:this.broadcast({type:o.PanelHandler.RANGE,value:e.checked});break;case o.PanelHandler.FLAG:this.broadcast({type:o.PanelHandler.FLAG,value:e.checked});break;case o.PanelHandler.PROGRESS:this.broadcast({type:o.PanelHandler.PROGRESS,value:e.checked});break;case o.PanelHandler.SCALE:this.broadcast({type:o.PanelHandler.SCALE,value:e.checked});break;default:throw new Error("invalid type")}},e}(a.default);e.default=l},function(t,e,i){}]);
//# sourceMappingURL=bundle.js.map