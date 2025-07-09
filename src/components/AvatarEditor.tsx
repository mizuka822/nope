import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Crop, Palette, RotateCw, ZoomIn, ZoomOut, Download, X, Check } from 'lucide-react';

interface AvatarEditorProps {
  currentAvatar: string;
  onSave: (newAvatar: string) => void;
  onClose: () => void;
}

interface CropSettings {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  rotation: number;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({ currentAvatar, onSave, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropSettings, setCropSettings] = useState<CropSettings>({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    scale: 1,
    rotation: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setSelectedImage(result);
        // Reset crop settings for new image
        setCropSettings({
          x: 0,
          y: 0,
          width: 200,
          height: 200,
          scale: 1,
          rotation: 0,
        });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropSettings.x, y: e.clientY - cropSettings.y });
  }, [cropSettings.x, cropSettings.y]);

  const handleDragMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setCropSettings(prev => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      }));
    }
  }, [isDragging, dragStart]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleScaleChange = useCallback((delta: number) => {
    setCropSettings(prev => ({
      ...prev,
      scale: Math.max(0.5, Math.min(3, prev.scale + delta)),
    }));
  }, []);

  const handleRotationChange = useCallback(() => {
    setCropSettings(prev => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360,
    }));
  }, []);

  const generateAvatar = useCallback(async () => {
    if (!selectedImage && !currentAvatar) return;
    
    setIsProcessing(true);
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      // Set canvas size
      canvas.width = 200;
      canvas.height = 200;

      // Create image element
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = selectedImage || currentAvatar;
      });

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Save context
      ctx.save();

      // Apply transformations
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((cropSettings.rotation * Math.PI) / 180);
      ctx.scale(cropSettings.scale, cropSettings.scale);

      // Draw image
      const drawWidth = canvas.width / cropSettings.scale;
      const drawHeight = canvas.height / cropSettings.scale;
      ctx.drawImage(
        img,
        -drawWidth / 2 + cropSettings.x / cropSettings.scale,
        -drawHeight / 2 + cropSettings.y / cropSettings.scale,
        drawWidth,
        drawHeight
      );

      // Restore context
      ctx.restore();

      // Create circular mask
      ctx.globalCompositeOperation = 'destination-in';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
      ctx.fill();

      // Get data URL
      const dataURL = canvas.toDataURL('image/png', 0.9);
      onSave(dataURL);
      onClose();
    } catch (error) {
      console.error('Error generating avatar:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, currentAvatar, cropSettings, onSave, onClose]);

  const generateRandomAvatar = useCallback(() => {
    const seed = Math.random().toString(36).substring(7);
    const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
    onSave(randomAvatar);
    onClose();
  }, [onSave, onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Edit Avatar</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Upload New Image</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-500 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag & drop an image or click to browse
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-gray-500/20 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:from-pink-500/30 hover:to-gray-500/30 transition-all duration-300"
                >
                  Choose File
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Supports JPG, PNG, GIF (max 5MB)
                </p>
              </div>
            </div>

            {/* Quick Options */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Quick Options</h4>
              <div className="space-y-2">
                <button
                  onClick={generateRandomAvatar}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-blue-400/20 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:from-blue-500/30 hover:to-blue-400/30 transition-all duration-300"
                >
                  <Palette className="w-4 h-4" />
                  <span>Generate Random Avatar</span>
                </button>
                
                <button
                  onClick={() => {
                    navigator.mediaDevices.getUserMedia({ video: true })
                      .then(stream => {
                        // In a real implementation, you'd show a camera interface
                        console.log('Camera access granted');
                        stream.getTracks().forEach(track => track.stop());
                      })
                      .catch(err => console.error('Camera access denied:', err));
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-500/20 to-green-400/20 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:from-green-500/30 hover:to-green-400/30 transition-all duration-300"
                >
                  <Camera className="w-4 h-4" />
                  <span>Take Photo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Preview & Edit Section */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Preview</h4>
              <div className="relative">
                <div 
                  className="w-48 h-48 mx-auto border-2 border-gray-300 rounded-full overflow-hidden bg-gray-100 relative"
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                >
                  {(selectedImage || currentAvatar) && (
                    <img
                      ref={imageRef}
                      src={selectedImage || currentAvatar}
                      alt="Avatar preview"
                      className="w-full h-full object-cover cursor-move"
                      style={{
                        transform: `translate(${cropSettings.x}px, ${cropSettings.y}px) scale(${cropSettings.scale}) rotate(${cropSettings.rotation}deg)`,
                      }}
                      onMouseDown={handleDragStart}
                      draggable={false}
                    />
                  )}
                  {!selectedImage && !currentAvatar && (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No image selected</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            {(selectedImage || currentAvatar) && (
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Zoom</h5>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleScaleChange(-0.1)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full transition-all duration-200"
                        style={{ width: `${((cropSettings.scale - 0.5) / 2.5) * 100}%` }}
                      />
                    </div>
                    <button
                      onClick={() => handleScaleChange(0.1)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Scale: {cropSettings.scale.toFixed(1)}x</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Rotation</h5>
                  <button
                    onClick={handleRotationChange}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span className="text-sm">Rotate 90°</span>
                  </button>
                  <p className="text-xs text-gray-500 mt-1">Current: {cropSettings.rotation}°</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={generateAvatar}
            disabled={isProcessing || (!selectedImage && !currentAvatar)}
            className="px-6 py-2 bg-gradient-to-r from-pink-500/20 to-gray-500/20 border border-gray-300 rounded-lg font-medium text-gray-700 hover:from-pink-500/30 hover:to-gray-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save Avatar</span>
              </>
            )}
          </button>
        </div>

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default AvatarEditor;