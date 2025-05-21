import { useState, useEffect } from 'react';

/**
 * Hook to check if the current viewport is mobile size
 * @param breakpoint - Optional breakpoint in pixels to determine mobile view (default: 576)
 * @returns boolean indicating if current viewport is mobile size
 */
const useIsMobile = (breakpoint = 576): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener('resize', handleResize);
    
    // Call handler right away to set initial value
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
