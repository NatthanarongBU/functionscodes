'use client';

import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import Link from 'next/link';

export default function QRGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState('M');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text.trim()) return;
    
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, text, {
          width: size,
          margin: 2,
          errorCorrectionLevel: errorLevel as 'L' | 'M' | 'Q' | 'H'
        });
        
        const dataUrl = canvas.toDataURL();
        setQrCode(dataUrl);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQR = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCode;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              functions.codes
            </Link>
            <Link href="/" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📱</div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              QR Code Generator
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Generate custom QR codes for URLs, text, WiFi credentials, and more with customizable options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="mr-3">⚙️</span>
              Configuration
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Text or URL
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text, URL, or any data you want to encode..."
                  className="w-full h-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Size: {size}px
                </label>
                <input
                  type="range"
                  min="128"
                  max="512"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Error Correction Level
                </label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>

              <button
                onClick={generateQR}
                disabled={!text.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none"
              >
                Generate QR Code
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="mr-3">📱</span>
              Generated QR Code
            </h2>
            
            <div className="text-center">
              {qrCode ? (
                <div className="space-y-6">
                  <div className="inline-block p-4 bg-white rounded-2xl">
                    <canvas
                      ref={canvasRef}
                      className="max-w-full h-auto"
                      style={{ display: 'none' }}
                    />
                    <img src={qrCode} alt="Generated QR Code" className="max-w-full h-auto" />
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={downloadQR}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                    >
                      Download PNG
                    </button>
                    
                    <div className="text-sm text-gray-400">
                      Size: {size}x{size}px • Error Level: {errorLevel}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-16">
                  <div className="text-6xl mb-4 opacity-30">📱</div>
                  <p className="text-gray-400">
                    Enter some text and click "Generate QR Code" to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="mt-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 border-dashed">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-3">💡</span>
            Quick Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setText('https://functions.codes')}
              className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors"
            >
              <div className="font-medium text-blue-400">Website URL</div>
              <div className="text-sm text-gray-400">https://functions.codes</div>
            </button>
            <button
              onClick={() => setText('WIFI:T:WPA;S:MyNetwork;P:MyPassword;H:false;;')}
              className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors"
            >
              <div className="font-medium text-green-400">WiFi Network</div>
              <div className="text-sm text-gray-400">Network credentials</div>
            </button>
            <button
              onClick={() => setText('mailto:hello@functions.codes?subject=Hello')}
              className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors"
            >
              <div className="font-medium text-purple-400">Email</div>
              <div className="text-sm text-gray-400">Pre-filled email</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}