'use client';

import {useEffect, useRef, RefObject} from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Returns all visible, enabled focusable HTML elements inside a container.
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const nodes = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  );
  return nodes.filter((el) => {
    if (el.hasAttribute('disabled') || el.getAttribute('aria-hidden') === 'true') {
      return false;
    }
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden';
  });
}

/**
 * Accessible Focus Trap hook for modal dialogs.
 * - Traps Tab / Shift+Tab keyboard navigation inside the modal container while open.
 * - Closes the modal on Escape key press if `onClose` is provided.
 * - Saves the previously focused trigger element and restores focus on close/unmount.
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  isOpen: boolean,
  onClose?: () => void
): RefObject<T | null> {
  const containerRef = useRef<T | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    previousActiveElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const container = containerRef.current;
    if (container) {
      const focusables = getFocusableElements(container);
      if (focusables.length > 0) {
        focusables[0].focus({preventScroll: true});
      } else {
        container.focus({preventScroll: true});
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const activeContainer = containerRef.current;
      if (!activeContainer) return;

      if (event.key === 'Escape' && onCloseRef.current) {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(activeContainer);
      if (focusableElements.length === 0) {
        event.preventDefault();
        activeContainer.focus({preventScroll: true});
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (
          !activeElement ||
          activeElement === firstElement ||
          !activeContainer.contains(activeElement)
        ) {
          event.preventDefault();
          lastElement.focus({preventScroll: true});
        }
      } else {
        if (
          !activeElement ||
          activeElement === lastElement ||
          !activeContainer.contains(activeElement)
        ) {
          event.preventDefault();
          firstElement.focus({preventScroll: true});
        }
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      const activeContainer = containerRef.current;
      if (!activeContainer) return;
      const target = event.target as Node | null;
      if (target && !activeContainer.contains(target)) {
        const focusableElements = getFocusableElements(activeContainer);
        if (focusableElements.length > 0) {
          focusableElements[0].focus({preventScroll: true});
        } else {
          activeContainer.focus({preventScroll: true});
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('focusin', handleFocusIn);

      if (
        previousActiveElementRef.current &&
        typeof previousActiveElementRef.current.focus === 'function' &&
        document.contains(previousActiveElementRef.current)
      ) {
        previousActiveElementRef.current.focus({preventScroll: true});
      }
    };
  }, [isOpen]);

  return containerRef;
}
