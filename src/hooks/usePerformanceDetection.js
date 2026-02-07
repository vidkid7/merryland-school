import { useState, useEffect } from 'react';

/**
 * Custom hook to detect device performance capabilities and network conditions
 * Used to adaptively deliver content based on device capabilities
 * 
 * @returns {Object} Performance metrics
 * @property {boolean} isLowEndDevice - True if device has limited resources
 * @property {boolean} isSlowNetwork - True if network connection is slow
 * @property {boolean} prefersReducedMotion - True if user prefers reduced motion
 * @property {number} deviceMemory - Device memory in GB (if available)
 * @property {string} connectionType - Network connection type
 * @property {boolean} isMobile - True if viewport is mobile size
 */
export function usePerformanceDetection() {
  const [metrics, setMetrics] = useState({
    isLowEndDevice: false,
    isSlowNetwork: false,
    prefersReducedMotion: false,
    deviceMemory: 8, // Default to 8GB
    connectionType: '4g',
    isMobile: false,
  });

  useEffect(() => {
    // Detect device memory
    const deviceMemory = navigator.deviceMemory || 8; // Default to 8GB if not available
    
    // Detect if low-end device (< 4GB RAM or slow hardware concurrency)
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const isLowEndDevice = deviceMemory < 4 || hardwareConcurrency < 4;
    
    // Detect network speed using Network Information API
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let isSlowNetwork = false;
    let connectionType = '4g';
    
    if (connection) {
      connectionType = connection.effectiveType || '4g';
      // Consider 2g and slow-2g as slow networks
      isSlowNetwork = connectionType === 'slow-2g' || connectionType === '2g';
      
      // Also check if saveData is enabled (user wants to save data)
      if (connection.saveData) {
        isSlowNetwork = true;
      }
    }
    
    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Detect mobile viewport
    const isMobile = window.innerWidth < 768;
    
    setMetrics({
      isLowEndDevice,
      isSlowNetwork,
      prefersReducedMotion,
      deviceMemory,
      connectionType,
      isMobile,
    });
    
    // Listen for viewport changes
    const handleResize = () => {
      setMetrics(prev => ({
        ...prev,
        isMobile: window.innerWidth < 768,
      }));
    };
    
    // Listen for network changes
    const handleConnectionChange = () => {
      if (connection) {
        const newConnectionType = connection.effectiveType || '4g';
        const newIsSlowNetwork = 
          newConnectionType === 'slow-2g' || 
          newConnectionType === '2g' || 
          connection.saveData;
        
        setMetrics(prev => ({
          ...prev,
          isSlowNetwork: newIsSlowNetwork,
          connectionType: newConnectionType,
        }));
      }
    };
    
    // Listen for reduced motion preference changes
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
      setMetrics(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
      }));
    };
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }
    if (motionMediaQuery.addEventListener) {
      motionMediaQuery.addEventListener('change', handleMotionChange);
    } else {
      // Fallback for older browsers
      motionMediaQuery.addListener(handleMotionChange);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
      if (motionMediaQuery.removeEventListener) {
        motionMediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        motionMediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  return metrics;
}
