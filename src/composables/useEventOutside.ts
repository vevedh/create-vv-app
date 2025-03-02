/**
 * A composable for adding and removing an event listener on an outer element that triggers a handler function
 * when the specified event occurs outside the specified target element.
 *
 * @param outerElement - A VueJS reference to the outer HTML element to listen for events on.
 * @param target - A VueJS reference to the target HTML element to check for outside events.
 * @param eventType - The type of event to listen for.
 * @param handler - A function to handle the event when it occurs outside the target element.
 * @param [options] - Optional options object for the event listener.
 *
 * @returns {() => void} - A function to remove the event listener.
 *
 * @example
 * ```ts
 * const stop = useEventOutside(outerElement, targetElement, 'click', (e) => {
 *   console.log('Clicked outside:', e);
 * });
 *
 * onUnmounted(() => {
 *   stop();
 * });
 * ```
 */
export function useEventOutside<
  T extends Ref<HTMLElement | null>,
  F extends Ref<HTMLElement | null>,
  E extends keyof HTMLElementEventMap,
  Fn extends (e: HTMLElementEventMap[E]) => void,
>(
  outerElement: T,
  target: F,
  eventType: E,
  handler: Fn,
  options?: boolean | AddEventListenerOptions,
): () => void {
  const targetValue = unref(target)

  const eventHandler = (e: HTMLElementEventMap[E]) => {
    const el = targetValue
    const toRe = !!(el && !e.composedPath().includes(el))
    toRe && handler(e)
  }

  const stop = useEventListener(outerElement, eventType, eventHandler, options)

  return stop
}
