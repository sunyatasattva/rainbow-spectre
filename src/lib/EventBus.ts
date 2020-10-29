export interface DefaultEventMap {
  [name: string]: (...args: any[]) => any;
}

type EventHandlersContainer<T extends DefaultEventMap> = {
  [eventName in keyof T]?: Function[]
};

export default class EventBus<EventMap extends DefaultEventMap> {
  private eventHandlers: EventHandlersContainer<EventMap> = {};

  emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>) {
    const handlers = this.eventHandlers[event];
    if(!handlers) {
      console.warn(`No handlers where registered for Event: ${event}`);
      return;
    }

    handlers.forEach(f => f(...args));

    return this;
  }

  off<K extends keyof EventMap>(event: K, cb?: EventMap[K]) {
    if(!cb) {
      this.eventHandlers[event] = [];
      return this;
    }
    
    const handlers = this.eventHandlers[event];
    if(!handlers) throw new Error(`No handlers where registered for Event: ${event}`);
      
    this.eventHandlers[event] = handlers.filter(handler => handler !== cb);

    return this;
  }

  on<K extends keyof EventMap>(event: K, cb: EventMap[K]) {
    const handlers = this.eventHandlers[event as string] || [];

    this.eventHandlers[event] = [...handlers, cb];

    return this;
  }

  once<K extends keyof EventMap>(event: K, cb: EventMap[K]) {
    const selfRemovingCallback = (...args: any[]) => {
      this.off(event, cb);
      return cb(...args);
    };

    return this.on(event, selfRemovingCallback as EventMap[K]);
  }
}
