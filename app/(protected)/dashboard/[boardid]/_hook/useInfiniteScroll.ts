import { MutableRefObject, useEffect } from 'react';

interface Props {
  target: MutableRefObject<HTMLElement | null>;
  onIntersect: IntersectionObserverCallback;
  size: string;
}

export default function useInfiniteScroll({ target, onIntersect, size }: Props) {
  useEffect(() => {
    let observer: IntersectionObserver;
    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect);
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, size]);
}
