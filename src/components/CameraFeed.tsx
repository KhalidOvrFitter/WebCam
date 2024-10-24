import React, { useRef, useState, useCallback } from 'react';
import { Camera, CameraOff, FlipHorizontal } from 'lucide-react';

const CameraFeed = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError('');
      }
    } catch (err) {
      setError('Camera access denied. Please check permissions.');
      setIsStreaming(false);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const toggleCamera = useCallback(() => {
    if (isStreaming) {
      stopCamera();
    } else {
      startCamera();
    }
  }, [isStreaming, startCamera, stopCamera]);

  const switchCamera = useCallback(() => {
    stopCamera();
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  }, [stopCamera]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video shadow-xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        
        {!isStreaming && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90">
            <Camera className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90">
            <div className="text-center p-4">
              <CameraOff className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={toggleCamera}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          {isStreaming ? (
            <>
              <CameraOff className="w-5 h-5" />
              Stop Camera
            </>
          ) : (
            <>
              <Camera className="w-5 h-5" />
              Start Camera
            </>
          )}
        </button>
        
        {isStreaming && (
          <button
            onClick={switchCamera}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
          >
            <FlipHorizontal className="w-5 h-5" />
            Switch Camera
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraFeed;