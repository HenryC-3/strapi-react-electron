import {EventEmitter} from 'node:events';

const emitter = new EventEmitter();
const wrapper = (eventName: string) => {
  return {
    emit: () => {
      console.log('Event Emit:', eventName);
      emitter.emit(eventName);
    },
    on: (action: () => void) => {
      emitter.on(eventName, () => {
        console.log('Event on:', eventName);
        action();
      });
    },
  };
};

/**
 * strapi server 启动
 */
export const strapiUp = wrapper('strapiUp');
