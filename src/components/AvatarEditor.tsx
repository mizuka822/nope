import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Upload, Crop, Palette, RotateCw, ZoomIn, ZoomOut, Move, X, Check, Square } from 'lucide-react';

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

interface ImageDimensions {
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({ currentAvatar, onSave, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);
  const [cropSettings, setCropSettings] = useState<CropSettings>({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    scale: 1,
    rotation: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropMode, setCropMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);

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
        setCropMode(true);
        
        // Load image to get dimensions
        const img = new Image();
        img.onload = () => {
          const containerWidth = 300;
          const containerHeight = 300;
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          
          let displayWidth, displayHeight;
          if (aspectRatio > 1) {
            displayWidth = containerWidth;
            displayHeight = containerWidth / aspectRatio;
          } else {
            displayHeight = containerHeight;
            displayWidth = containerHeight * aspectRatio;
          }
          
          setImageDimensions({
            width: displayWidth,
            height: displayHeight,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
          });
          
          // Center crop area
          const cropSize = Math.min(displayWidth, displayHeight) * 0.8;
          setCropSettings({
            x: (displayWidth - cropSize) / 2,
            y: (displayHeight - cropSize) / 2,
            width: cropSize,
            height: cropSize,
            scale: 1,
            rotation: 0,
          });
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent, type: 'move' | 'resize') => {
    e.preventDefault();
    if (type === 'move') {
      setIsDragging(true);
      setDragStart({ 
        x: e.clientX - cropSettings.x, 
        y: e.clientY - cropSettings.y 
      });
    } else {
      setIsResizing(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, [cropSettings.x, cropSettings.y]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageDimensions) return;
    
    if (isDragging) {
      const newX = Math.max(0, Math.min(imageDimensions.width - cropSettings.width, e.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(imageDimensions.height - cropSettings.height, e.clientY - dragStart.y));
      
      setCropSettings(prev => ({
        ...prev,
        x: newX,
        y: newY,
      }));
    } else if (isResizing) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      const delta = Math.max(deltaX, deltaY);
      
      const newSize = Math.max(50, Math.min(
        Math.min(imageDimensions.width - cropSettings.x, imageDimensions.height - cropSettings.y),
        cropSettings.width + delta
      ));
      
      setCropSettings(prev => ({
        ...prev,
        width: newSize,
        height: newSize,
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, isResizing, dragStart, cropSettings, imageDimensions]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
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

      // Set canvas size to final avatar size
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

      if (cropMode && imageDimensions) {
        // Calculate crop ratios
        const scaleX = img.naturalWidth / imageDimensions.width;
        const scaleY = img.naturalHeight / imageDimensions.height;
        
        // Crop from original image
        const sourceX = cropSettings.x * scaleX;
        const sourceY = cropSettings.y * scaleY;
        const sourceWidth = cropSettings.width * scaleX;
        const sourceHeight = cropSettings.height * scaleY;
        
        // Draw cropped image
        ctx.drawImage(
          img,
          sourceX, sourceY, sourceWidth, sourceHeight,
          0, 0, canvas.width, canvas.height
        );
      } else {
        // Fallback: center crop
        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;
        
        ctx.drawImage(
          img,
          x, y, size, size,
          0, 0, canvas.width, canvas.height
        );
      }

      // Apply rotation if needed
      if (cropSettings.rotation !== 0) {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCanvas.width = canvas.width;
          tempCanvas.height = canvas.height;
          
          tempCtx.translate(canvas.width / 2, canvas.height / 2);
          tempCtx.rotate((cropSettings.rotation * Math.PI) / 180);
          tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(tempCanvas, 0, 0);
        }
      }

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
  }, [selectedImage, currentAvatar, cropSettings, cropMode, imageDimensions, onSave, onClose]);

  const generateRandomAvatar = useCallback(() => {
    const seed = Math.random().toString(36).substring(7);
    const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
    onSave(randomAvatar);
    onClose();
  }, [onSave, onClose]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      const fakeEvent = {
        target: { files: [imageFile] }
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  }, [handleFileSelect]);

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging || isResizing) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const rect = cropContainerRef.current?.getBoundingClientRect();
        if (rect) {
          const fakeEvent = {
            clientX: e.clientX - rect.left,
            clientY: e.clientY - rect.top,
          } as React.MouseEvent;
          handleMouseMove(fakeEvent);
        }
      };

      const handleGlobalMouseUp = () => {
        handleMouseUp();
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div className="absolute right-0 top-full mt-2 w-[480px] bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 z-50 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Edit Avatar</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Upload Section */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Upload New Image</h4>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-500 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-3">
              Drag & drop an image or click to browse
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-gray-500/20 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:from-pink-500/30 hover:to-gray-500/30 transition-all duration-300"
            >
              Choose File
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Supports JPG, PNG, GIF (max 5MB)
            </p>
          </div>

          {/* Quick Options */}
          <div className="space-y-3 mt-4">
            <h4 className="font-semibold text-gray-800">Quick Options</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={generateRandomAvatar}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-blue-400/20 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:from-blue-500/30 hover:to-blue-400/30 transition-all duration-300"
              >
                <Palette className="w-4 h-4" />
                <span>Random</span>
              </button>
              
              <button
                onClick={() => {
                  navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => {
                      console.log('Camera access granted');
                      stream.getTracks().forEach(track => track.stop());
                    })
                    .catch(err => console.error('Camera access denied:', err));
                }}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500/20 to-green-400/20 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:from-green-500/30 hover:to-green-400/30 transition-all duration-300"
              >
                <Camera className="w-4 h-4" />
                <span>Camera</span>
              </button>
            </div>
          </div>
        </div>

        {/* Crop Interface */}
        {cropMode && selectedImage && imageDimensions && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">Crop Image</h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCropMode(false)}
                  className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Skip Crop
                </button>
                <Crop className="w-4 h-4 text-pink-600" />
              </div>
            </div>
            
            <div 
              ref={cropContainerRef}
              className="relative mx-auto bg-gray-100 rounded-lg overflow-hidden"
              style={{ 
                width: imageDimensions.width, 
                height: imageDimensions.height,
                maxWidth: '100%',
                maxHeight: '300px'
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                ref={imageRef}
                src={selectedImage}
                alt="Crop preview"
                className="w-full h-full object-contain select-none"
                draggable={false}
                style={{
                  transform: `scale(${cropSettings.scale}) rotate(${cropSettings.rotation}deg)`,
                }}
              />
              
              {/* Crop overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50">
                {/* Crop area */}
                <div
                  className="absolute border-2 border-white shadow-lg cursor-move"
                  style={{
                    left: cropSettings.x,
                    top: cropSettings.y,
                    width: cropSettings.width,
                    height: cropSettings.height,
                  }}
                  onMouseDown={(e) => handleDragStart(e, 'move')}
                >
                  {/* Clear area */}
                  <div className="absolute inset-0 bg-transparent">
                    <div className="absolute inset-0 border border-white border-opacity-50">
                      {/* Grid lines */}
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className="border border-white border-opacity-30" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Resize handle */}
                  <div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-white border border-gray-400 cursor-se-resize"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleDragStart(e, 'resize');
                    }}
                  >
                    <Square className="w-2 h-2 text-gray-600 m-0.5" />
                  </div>
                  
                  {/* Move indicator */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <Move className="w-6 h-6 text-white opacity-75" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              <p>Drag to move • Drag corner to resize • Use controls below to adjust</p>
            </div>
          </div>
        )}

        {/* Preview & Edit Section */}
        {!cropMode && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Preview</h4>
            <div className="relative">
              <div className="w-48 h-48 mx-auto border-2 border-gray-300 rounded-full overflow-hidden bg-gray-100 relative">
                {(selectedImage || currentAvatar) && (
                  <img
                    ref={imageRef}
                    src={selectedImage || currentAvatar}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                    style={{
                      transform: `scale(${cropSettings.scale}) rotate(${cropSettings.rotation}deg)`,
                    }}
                    draggable={false}
                  />
                )}
                {!selectedImage && !currentAvatar && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        {(selectedImage || currentAvatar) && (
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Zoom</h5>
              <div className="flex items-center space-x-3">
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
              <p className="text-sm text-gray-500 mt-1 text-center">Scale: {cropSettings.scale.toFixed(1)}x</p>
            </div>

            <div>
              <h5 className="font-medium text-gray-700 mb-2">Rotation</h5>
              <button
                onClick={handleRotationChange}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RotateCw className="w-4 h-4" />
                <span className="text-sm">Rotate 90°</span>
              </button>
              <p className="text-sm text-gray-500 mt-1 text-center">Current: {cropSettings.rotation}°</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={generateAvatar}
          disabled={isProcessing || (!selectedImage && !currentAvatar)}
          className="px-6 py-2 bg-gradient-to-r from-pink-500/20 to-gray-500/20 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:from-pink-500/30 hover:to-gray-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
  );
};

export default AvatarEditor;