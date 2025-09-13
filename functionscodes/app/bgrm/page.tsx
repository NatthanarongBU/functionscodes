'use client'

import { useState, useRef } from 'react'

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setOriginalImage(result)
        setProcessedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeBackground = async () => {
    if (!originalImage) return
    
    setIsProcessing(true)
    // Simulate background removal process
    setTimeout(() => {
      setProcessedImage(originalImage) // In real implementation, this would be the processed image
      setIsProcessing(false)
    }, 2000)
  }

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a')
      link.download = 'background-removed.png'
      link.href = processedImage
      link.click()
    }
  }

  const clearImages = () => {
    setOriginalImage(null)
    setProcessedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            Background Remover
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Remove backgrounds from your images instantly with AI-powered precision. Professional quality results in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="bg-purple-50 text-purple-600 p-3 rounded-xl mr-4 text-xl shadow-sm">
                📤
              </span>
              Upload Image
            </h2>
            
            <div className="space-y-6">
              {!originalImage ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer ${
                    dragOver 
                      ? 'border-purple-400 bg-purple-50' 
                      : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-6xl mb-4 text-gray-400">🖼️</div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Drop your image here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or click to browse files
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports JPG, PNG, WebP up to 10MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={originalImage}
                      alt="Original"
                      className="w-full h-auto rounded-xl border border-gray-200"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={clearImages}
                        className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-600 p-2 rounded-lg transition-all duration-200"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={removeBackground}
                    disabled={isProcessing}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    {isProcessing ? 'Removing Background...' : 'Remove Background'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Result Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="bg-green-50 text-green-600 p-3 rounded-xl mr-4 text-xl shadow-sm">
                ✨
              </span>
              Result
            </h2>
            
            <div className="text-center">
              {processedImage ? (
                <div className="space-y-6">
                  <div className="inline-block p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <img
                      src={processedImage}
                      alt="Processed"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                  
                  <button
                    onClick={downloadImage}
                    className="bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Image
                  </button>
                </div>
              ) : (
                <div className="py-16 text-gray-400">
                  <div className="text-6xl mb-4">✨</div>
                  <p className="text-lg">Upload an image and click &quot;Remove Background&quot; to see the result</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}