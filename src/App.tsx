import React from 'react';
import { Camera } from 'lucide-react';
import CameraFeed from './components/CameraFeed';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="p-6 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Camera className="w-8 h-8 text-indigo-400" />
          <h1 className="text-2xl font-bold">WebRTC Camera Interface</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Camera Preview</h2>
          <p className="text-gray-400">Access your device's camera with permissions handling and controls.</p>
        </div>
        
        <CameraFeed />
        
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-medium mb-2 text-indigo-400">Features</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Real-time camera feed with WebRTC</li>
            <li>Front/back camera switching support</li>
            <li>Graceful error handling</li>
            <li>Responsive design</li>
            <li>Camera controls with visual feedback</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;