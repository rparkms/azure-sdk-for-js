/// <reference  path="./shims-public.d.ts" />
import { AbortSignalLike } from "@azure/ms-rest-js";

type AbortEventListener = (this: AbortSignalLike, ev?: any) => any;

const listenersMap = new WeakMap<AbortSignal, AbortEventListener[]>();
const abortedMap = new WeakMap<AbortSignal, boolean>();

/**
 * An aborter instance implements AbortSignal interface, can abort HTTP requests.
 *
 * - Call AbortSignal.none to create a new AbortSignal instance that cannot be cancelled.
 * Use `AbortSignal.none` when you are required to pass a cancellation token but the operation
 * cannot or will not ever be cancelled.
 *
 * @example
 * // Abort without timeout
 * await doAsyncWork(AbortSignal.none);
 *
 * @export
 * @class AbortSignal
 * @implements {AbortSignalLike}
 */
export class AbortSignal implements AbortSignalLike {
  constructor() {
    listenersMap.set(this, []);
    abortedMap.set(this, false);
  }

  /**
   * Status of whether aborted or not.
   *
   * @readonly
   * @type {boolean}
   * @memberof AbortSignal
   */
  public get aborted(): boolean {
    if (!abortedMap.has(this)) {
      throw new TypeError("Expected `this` to be an instance of AbortSignal.");
    }

    return abortedMap.get(this)!;
  }

  /**
   * Creates a new AbortSignal instance that will never be aborted.
   *
   * @readonly
   * @static
   * @type {AbortSignal}
   * @memberof AbortSignal
   */
  public static get none(): AbortSignal {
    return new AbortSignal();
  }

  /**
   * onabort event listener.
   *
   * @memberof AbortSignal
   */
  public onabort?: (ev?: Event) => any;

  /**
   * Added new "abort" event listener, only support "abort" event.
   *
   * @param {"abort"} _type Only support "abort" event
   * @param {(this: AbortSignalLike, ev: any) => any} listener
   * @memberof AbortSignal
   */
  public addEventListener(
    // tslint:disable-next-line:variable-name
    _type: "abort",
    listener: (this: AbortSignalLike, ev: any) => any
  ): void {
    if (!listenersMap.has(this)) {
      throw new TypeError("Expected `this` to be an instance of AbortSignal.");
    }

    const listeners = listenersMap.get(this)!;
    listeners.push(listener);
  }

  /**
   * Remove "abort" event listener, only support "abort" event.
   *
   * @param {"abort"} _type Only support "abort" event
   * @param {(this: AbortSignalLike, ev: any) => any} listener
   * @memberof AbortSignal
   */
  public removeEventListener(
    // tslint:disable-next-line:variable-name
    _type: "abort",
    listener: (this: AbortSignalLike, ev: any) => any
  ): void {
    if (!listenersMap.has(this)) {
      throw new TypeError("Expected `this` to be an instance of AbortSignal.");
    }

    const listeners = listenersMap.get(this)!;

    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }
}

/**
 * Helper to trigger an abort event immediately, the onabort and all abort event listeners will be triggered.
 * Will try to trigger abort event for all children AbortSignal nodes.
 *
 * - If there is a timeout, the timer will be cancelled.
 * - If aborted is true, nothing will happen.
 *
 * @returns
 * @internal
 */
export function abortSignal(signal: AbortSignal) {
  if (signal.aborted) {
    return;
  }

  if (signal.onabort) {
    signal.onabort.call(signal);
  }

  const listeners = listenersMap.get(signal)!;
  listeners.forEach((listener) => {
    listener.call(signal);
  });

  abortedMap.set(signal, true);
}
