'use client'

import { useState, useRef } from 'react'
import QRCode from 'qrcode'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [options, setOptions] = useState({
    width: 256,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    errorCorrectionLevel: 'M' as 'L' | 'M' | 'Q' | 'H'
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateQRCode = async () => {
    if (!text.trim()) return

    setIsGenerating(true)
    try {
      const canvas = canvasRef.current
      if (canvas) {
        await QRCode.toCanvas(canvas, text, options)
        const dataUrl = canvas.toDataURL()
        setQrCodeUrl(dataUrl)
      }
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
    setIsGenerating(false)
  }

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a')
      link.download = 'qrcode.png'
      link.href = qrCodeUrl
      link.click()
    }
  }

  const clearQRCode = () => {
    setText('')
    setQrCodeUrl('')
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            QR Code Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create beautiful, customizable QR codes in seconds. Professional quality with Apple-inspired design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-50 text-blue-600 p-3 rounded-xl mr-4 text-xl shadow-sm">
                ⚙️
              </span>
              Configuration
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
                  Text or URL
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text, URL, or any data to encode..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none text-gray-800 placeholder-gray-500 bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                    Size (px)
                  </label>
                  <input
                    id="size"
                    type="number"
                    value={options.width}
                    onChange={(e) => setOptions(prev => ({ ...prev, width: parseInt(e.target.value) || 256 }))}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                    min="128"
                    max="1024"
                  />
                </div>

                <div>
                  <label htmlFor="margin" className="block text-sm font-medium text-gray-700 mb-2">
                    Margin
                  </label>
                  <input
                    id="margin"
                    type="number"
                    value={options.margin}
                    onChange={(e) => setOptions(prev => ({ ...prev, margin: parseInt(e.target.value) || 2 }))}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                    min="0"
                    max="10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="darkColor" className="block text-sm font-medium text-gray-700 mb-2">
                    Dark Color
                  </label>
                  <input
                    id="darkColor"
                    type="color"
                    value={options.color.dark}
                    onChange={(e) => setOptions(prev => ({ 
                      ...prev, 
                      color: { ...prev.color, dark: e.target.value }
                    }))}
                    className="w-full h-12 p-1 border border-gray-200 rounded-xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                  />
                </div>

                <div>
                  <label htmlFor="lightColor" className="block text-sm font-medium text-gray-700 mb-2">
                    Light Color
                  </label>
                  <input
                    id="lightColor"
                    type="color"
                    value={options.color.light}
                    onChange={(e) => setOptions(prev => ({ 
                      ...prev, 
                      color: { ...prev.color, light: e.target.value }
                    }))}
                    className="w-full h-12 p-1 border border-gray-200 rounded-xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="errorCorrection" className="block text-sm font-medium text-gray-700 mb-2">
                  Error Correction Level
                </label>
                <select
                  id="errorCorrection"
                  value={options.errorCorrectionLevel}
                  onChange={(e) => setOptions(prev => ({ 
                    ...prev, 
                    errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H'
                  }))}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                >
                  <option value="L">Low (~7%)</option>
                  <option value="M">Medium (~15%)</option>
                  <option value="Q">Quartile (~25%)</option>
                  <option value="H">High (~30%)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={generateQRCode}
                  disabled={!text.trim() || isGenerating}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  {isGenerating ? 'Generating...' : 'Generate QR Code'}
                </button>
                
                <button
                  onClick={clearQRCode}
                  className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="bg-green-50 text-green-600 p-3 rounded-xl mr-4 text-xl shadow-sm">
                📱
              </span>
              Generated QR Code
            </h2>
            
            <div className="text-center">
              {qrCodeUrl ? (
                <div className="space-y-6">
                  <div className="inline-block p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <canvas
                      ref={canvasRef}
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                  
                  <button
                    onClick={downloadQRCode}
                    className="bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download QR Code
                  </button>
                </div>
              ) : (
                <div className="py-16 text-gray-400">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-lg">Enter text above and click &quot;Generate QR Code&quot; to create your QR code</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
