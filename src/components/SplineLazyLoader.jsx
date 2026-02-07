import { useState, useEffect, useRef } from 'react';
import { usePerformanceDetection } from '../hooks/usePerformanceDetection';

/**
 * Lazy loader for Spline 3D viewer
 * Only loads Spline when the component is visible in viewport
 * Shows fallback image on low-end devices or slow networks
 * 
 * @param {Object} props
 * @param {string} props.url - Spline scene URL
 * @param {string} props.fallbackImage - Fallback image URL for low-end devices
 * @param {string} props.className - CSS class name
 */
export default function SplineLazyLoader({ url, fallbackImage, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);
  const { isLowEndDevice, isSlowNetwork } = usePerformanceDetection();

  // Determine if we should show fallback
  const shouldShowFallback = isLowEndDevice || isSlowNetwork;

  useEffect(() => {
    // If we should show fallback, don't load Spline
    if (shouldShowFallback) {
      setIsLoading(false);
      return;
    }

    // Create Intersection Observer to detect when component is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing once visible
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of component is visible
        rootMargin: '50px', // Start loading 50px before component enters viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [shouldShowFallback]);

  useEffect(() => {
    // Only load Spline script when component is visible
    if (!isVisible || shouldShowFallback) return;

    // Check if script is already loaded
    if (document.querySelector('script[src*="spline-viewer"]')) {
      setIsScriptLoaded(true);
      setIsLoading(false);
      return;
    }

    // Load Spline script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.12.47/build/spline-viewer.js';
    
    script.onload = () => {
      setIsScriptLoaded(true);
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error('Failed to load Spline viewer script');
      setHasError(true);
      setIsLoading(false);
    };

    // Set timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (!isScriptLoaded) {
        console.warn('Spline viewer script loading timeout');
        setHasError(true);
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    document.head.appendChild(script);

    return () => {
      clearTimeout(timeout);
    };
  }, [isVisible, shouldShowFallback, isScriptLoaded]);

  // Show fallback image for low-end devices or slow networks
  if (shouldShowFallback) {
    return (
      <div ref={containerRef} className={className} style={{ position: 'relative' }}>
        <img
          src={fallbackImage}
          alt="3D Scene Preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
          }}
        />
      </div>
    );
  }

  // Show loading placeholder
  if (isLoading || !isVisible) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderRadius: 'inherit',
          minHeight: '400px',
        }}
      >
        <div style={{ textAlign: 'center', color: '#2563eb' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '4px solid #dbeafe',
              borderTop: '4px solid #2563eb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem',
            }}
          />
          <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>Loading 3D Scene...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Show error fallback
  if (hasError) {
    return (
      <div ref={containerRef} className={className} style={{ position: 'relative' }}>
        <img
          src={fallbackImage}
          alt="3D Scene Preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
          }}
        />
      </div>
    );
  }

  // Render Spline viewer
  return (
    <div ref={containerRef} className={className} style={{ position: 'relative' }}>
      <spline-viewer url={url} style={{ width: '100%', height: '100%' }}></spline-viewer>
    </div>
  );
}
