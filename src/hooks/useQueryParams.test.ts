import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useQueryParams } from './useQueryParams';

describe('useQueryParams', () => {
  // Mock window.location and history
  const mockLocation = {
    ...window.location,
    search: '',
    pathname: '/test',
  };

  beforeEach(() => {
    // Reset URL parameters before each test
    mockLocation.search = '';
    Object.defineProperty(window, 'location', {
      writable: true,
      value: mockLocation,
    });

    // Mock history.pushState
    window.history.pushState = vi.fn();
  });

  it('should initialize with empty params when no query string exists', () => {
    const { result } = renderHook(() => useQueryParams());

    expect(result.current.params).toEqual({});
  });

  it('should initialize with correct params from URL', () => {
    mockLocation.search = '?name=john&age=25';

    const { result } = renderHook(() => useQueryParams());

    expect(result.current.params).toEqual({
      name: 'john',
      age: '25',
    });
  });

  it('should get specific param value using getParam', () => {
    mockLocation.search = '?name=john&age=25';

    const { result } = renderHook(() => useQueryParams());

    expect(result.current.getParam('name')).toBe('john');
    expect(result.current.getParam('age')).toBe('25');
    expect(result.current.getParam('nonexistent')).toBe('');
  });

  it('should update params and push new state', () => {
    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.updateParams({ name: 'jane', age: '30' });
    });

    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      '/test?name=jane&age=30'
    );
  });

  it('should remove params when value is empty', () => {
    mockLocation.search = '?name=john&age=25';

    const { result } = renderHook(() => useQueryParams());

    act(() => {
      result.current.updateParams({ name: '', age: '30' });
    });

    expect(window.history.pushState).toHaveBeenCalledWith(
      {},
      '',
      '/test?age=30'
    );
  });

  it('should handle URL changes through popstate event', async () => {
    const { result } = renderHook(() => useQueryParams());

    await act(async () => {
      mockLocation.search = '?name=alice';
      window.dispatchEvent(new Event('popstate'));
      // Pequeño delay para permitir que el estado se actualice
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.params).toEqual({
      name: 'alice',
    });
  });

  it('should handle URL changes through custom urlChange event', async () => {
    const { result } = renderHook(() => useQueryParams());

    await act(async () => {
      mockLocation.search = '?name=bob';
      window.dispatchEvent(new Event('urlChange'));
      // Pequeño delay para permitir que el estado se actualice
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.params).toEqual({
      name: 'bob',
    });
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useQueryParams());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'popstate',
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'urlChange',
      expect.any(Function)
    );
  });
});
