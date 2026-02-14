import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'
import { 
  Upload, Download, RotateCcw, RotateCw, FlipHorizontal, FlipVertical,
  Sun, Contrast, Droplets, Thermometer, Aperture, Sparkles,
  Crop, Undo, Redo, Image as ImageIcon,
  Sliders, Wand2, Palette, Share2, X, Menu, Camera,
  Instagram, Twitter, Facebook, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Types
interface FilterSettings {
  brightness: number
  contrast: number
  saturation: number
  blur: number
  hue: number
  sepia: number
  grayscale: number
  invert: number
  warmth: number
  vignette: number
}

interface FilterPreset {
  name: string
  settings: Partial<FilterSettings>
  thumbnail?: string
}

// Filter Presets
const filterPresets: FilterPreset[] = [
  { name: 'Normal', settings: {} },
  { name: 'Vintage', settings: { sepia: 30, contrast: 110, saturation: 85 } },
  { name: 'Warm', settings: { warmth: 30, saturation: 120 } },
  { name: 'Cool', settings: { warmth: -20, saturation: 90, hue: 10 } },
  { name: 'Dramatic', settings: { contrast: 130, saturation: 120 } },
  { name: 'Soft', settings: { brightness: 110, contrast: 90, saturation: 90 } },
  { name: 'Noir', settings: { grayscale: 100, contrast: 150 } },
  { name: 'Fade', settings: { brightness: 115, contrast: 85, saturation: 80 } },
  { name: 'Vivid', settings: { saturation: 150, contrast: 110, brightness: 105 } },
]

// Default filter settings
const defaultSettings: FilterSettings = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  hue: 0,
  sepia: 0,
  grayscale: 0,
  invert: 0,
  warmth: 0,
  vignette: 0,
}

// Toast component
function Toast({ message, show, onClose }: { message: string; show: boolean; onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      {message}
    </div>
  )
}

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass shadow-soft py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-8 h-8 text-coral" />
            <span className="font-display text-2xl font-bold text-charcoal-900">LUMINA</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Editor', 'Features', 'Gallery'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative text-charcoal-700 hover:text-coral transition-colors duration-300 font-medium group"
              >
                {item}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-coral transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection('editor')}
              className="bg-coral hover:bg-coral-600 text-white btn-magnetic"
            >
              Start Editing
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-slide-up">
            {['Home', 'Editor', 'Features', 'Gallery'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left py-2 text-charcoal-700 hover:text-coral transition-colors"
              >
                {item}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection('editor')}
              className="w-full bg-coral hover:bg-coral-600 text-white"
            >
              Start Editing
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-coral/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-soft animate-fade-in">
              <Sparkles className="w-4 h-4 text-coral" />
              <span className="text-sm font-medium text-charcoal-700">AI-Powered Photo Editor</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal-900 leading-tight animate-slide-up stagger-1">
              Transform Your <span className="text-coral">Photos</span> Into Art
            </h1>
            
            <p className="text-lg md:text-xl text-charcoal-600 max-w-lg animate-slide-up stagger-2">
              Professional-grade photo editing made simple. Apply stunning filters, adjust lighting, and create masterpieces in seconds.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up stagger-3">
              <Button 
                size="lg"
                onClick={() => document.getElementById('editor')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-coral hover:bg-coral-600 text-white btn-magnetic text-lg px-8"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Photo
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-charcoal-800 text-charcoal-800 hover:bg-charcoal-800 hover:text-white btn-magnetic text-lg px-8"
              >
                Explore Features
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4 animate-fade-in stagger-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-charcoal-200 overflow-hidden">
                    <img src={`/gallery-${i}.jpg`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-charcoal-600">Loved by 10,000+ creators</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-scale-in stagger-2">
            <div className="relative rounded-3xl overflow-hidden shadow-large">
              <img 
                src="/hero-image.jpg" 
                alt="Photography" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-2xl shadow-medium p-4 animate-float">
              <Palette className="w-full h-full text-coral" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-coral rounded-2xl shadow-glow p-4 animate-bounce-soft">
              <Wand2 className="w-full h-full text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Photo Editor Component
function PhotoEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [settings, setSettings] = useState<FilterSettings>(defaultSettings)
  const [activePreset, setActivePreset] = useState<string>('Normal')
  const [rotation, setRotation] = useState(0)
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)
  const [history, setHistory] = useState<FilterSettings[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [toast, setToast] = useState({ show: false, message: '' })
  const [isDragging, setIsDragging] = useState(false)

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message })
  }, [])

  // Apply filters to canvas
  const applyFilters = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !image) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Save context
    ctx.save()

    // Apply transformations
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1)
    ctx.translate(-canvas.width / 2, -canvas.height / 2)

    // Build filter string
    const filters = [
      `brightness(${settings.brightness}%)`,
      `contrast(${settings.contrast}%)`,
      `saturate(${settings.saturation}%)`,
      `blur(${settings.blur}px)`,
      `hue-rotate(${settings.hue}deg)`,
      `sepia(${settings.sepia}%)`,
      `grayscale(${settings.grayscale}%)`,
      `invert(${settings.invert}%)`,
    ].join(' ')

    ctx.filter = filters

    // Draw image
    ctx.drawImage(image, 0, 0)

    // Apply warmth (color overlay)
    if (settings.warmth !== 0) {
      ctx.filter = 'none'
      ctx.globalCompositeOperation = 'overlay'
      ctx.fillStyle = settings.warmth > 0 
        ? `rgba(255, 200, 100, ${settings.warmth / 200})` 
        : `rgba(100, 200, 255, ${Math.abs(settings.warmth) / 200})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Apply vignette
    if (settings.vignette > 0) {
      ctx.filter = 'none'
      ctx.globalCompositeOperation = 'multiply'
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.3,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      )
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(1, `rgba(0,0,0,${settings.vignette / 100})`)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    ctx.restore()
  }, [image, settings, rotation, flipH, flipV])

  // Apply filters when settings change
  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setImage(img)
        setSettings(defaultSettings)
        setHistory([defaultSettings])
        setHistoryIndex(0)
        setRotation(0)
        setFlipH(false)
        setFlipV(false)
        showToast('Image loaded successfully!')
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setImage(img)
          setSettings(defaultSettings)
          setHistory([defaultSettings])
          setHistoryIndex(0)
          showToast('Image loaded successfully!')
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  // Apply preset
  const applyPreset = (preset: FilterPreset) => {
    setActivePreset(preset.name)
    const newSettings = { ...defaultSettings, ...preset.settings }
    setSettings(newSettings)
    addToHistory(newSettings)
  }

  // Update setting
  const updateSetting = (key: keyof FilterSettings, value: number) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    setActivePreset('Custom')
  }

  // Add to history
  const addToHistory = (newSettings: FilterSettings) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newSettings)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setSettings(history[newIndex])
    }
  }

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setSettings(history[newIndex])
    }
  }

  // Reset
  const reset = () => {
    setSettings(defaultSettings)
    setActivePreset('Normal')
    setRotation(0)
    setFlipH(false)
    setFlipV(false)
    addToHistory(defaultSettings)
    showToast('Settings reset!')
  }

  // Rotate
  const rotate = (deg: number) => {
    setRotation((prev) => prev + deg)
  }

  // Flip
  const flip = (direction: 'h' | 'v') => {
    if (direction === 'h') setFlipH((prev) => !prev)
    else setFlipV((prev) => !prev)
  }

  // Download
  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `lumina-edited-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    showToast('Image downloaded!')
  }

  // Load sample image
  const loadSample = () => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      setImage(img)
      setSettings(defaultSettings)
      setHistory([defaultSettings])
      setHistoryIndex(0)
      showToast('Sample image loaded!')
    }
    img.src = '/gallery-1.jpg'
  }

  return (
    <section id="editor" className="py-20 bg-charcoal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
            Photo Editor
          </h2>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            Upload your photo and start editing with our professional tools
          </p>
        </div>

        {!image ? (
          <div 
            className={`border-3 border-dashed rounded-3xl p-16 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-coral bg-coral/5 scale-[1.02]' 
                : 'border-charcoal-300 hover:border-coral hover:bg-charcoal-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-coral/10 rounded-2xl flex items-center justify-center">
              <Upload className="w-12 h-12 text-coral" />
            </div>
            <h3 className="text-2xl font-display font-semibold text-charcoal-900 mb-3">
              Drop your photo here
            </h3>
            <p className="text-charcoal-600 mb-6">
              or click to browse from your device
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-coral hover:bg-coral-600 text-white btn-magnetic"
                size="lg"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Choose Photo
              </Button>
              <Button 
                onClick={loadSample}
                variant="outline"
                className="border-2 border-charcoal-300"
                size="lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Try Sample
              </Button>
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Canvas Area */}
            <div className="lg:col-span-2 space-y-4">
              <div className="editor-canvas-container bg-charcoal-900 rounded-2xl overflow-hidden">
                <canvas 
                  ref={canvasRef}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" size="sm" onClick={() => rotate(-90)}>
                  <RotateCcw className="w-4 h-4 mr-1" /> -90°
                </Button>
                <Button variant="outline" size="sm" onClick={() => rotate(90)}>
                  <RotateCw className="w-4 h-4 mr-1" /> +90°
                </Button>
                <Button variant="outline" size="sm" onClick={() => flip('h')}>
                  <FlipHorizontal className="w-4 h-4 mr-1" /> Flip H
                </Button>
                <Button variant="outline" size="sm" onClick={() => flip('v')}>
                  <FlipVertical className="w-4 h-4 mr-1" /> Flip V
                </Button>
                <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
                  <Undo className="w-4 h-4 mr-1" /> Undo
                </Button>
                <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
                  <Redo className="w-4 h-4 mr-1" /> Redo
                </Button>
              </div>
            </div>

            {/* Controls Panel */}
            <div className="space-y-6">
              <Tabs defaultValue="filters" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="filters">Filters</TabsTrigger>
                  <TabsTrigger value="adjust">Adjust</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                </TabsList>

                {/* Filters Tab */}
                <TabsContent value="filters" className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {filterPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className={`filter-preset p-3 rounded-xl bg-white shadow-soft text-center transition-all ${
                          activePreset === preset.name ? 'active' : ''
                        }`}
                      >
                        <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-charcoal-200 to-charcoal-300 mb-2 overflow-hidden">
                          {image && (
                            <img 
                              src={image.src} 
                              alt="" 
                              className="w-full h-full object-cover"
                              style={{
                                filter: [
                                  preset.settings.brightness && `brightness(${preset.settings.brightness}%)`,
                                  preset.settings.contrast && `contrast(${preset.settings.contrast}%)`,
                                  preset.settings.saturation && `saturate(${preset.settings.saturation}%)`,
                                  preset.settings.sepia && `sepia(${preset.settings.sepia}%)`,
                                  preset.settings.grayscale && `grayscale(${preset.settings.grayscale}%)`,
                                ].filter(Boolean).join(' ')
                              }}
                            />
                          )}
                        </div>
                        <span className="text-xs font-medium text-charcoal-700">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                {/* Adjust Tab */}
                <TabsContent value="adjust" className="space-y-6">
                  {[
                    { key: 'brightness', label: 'Brightness', icon: Sun, min: 0, max: 200 },
                    { key: 'contrast', label: 'Contrast', icon: Contrast, min: 0, max: 200 },
                    { key: 'saturation', label: 'Saturation', icon: Droplets, min: 0, max: 200 },
                  ].map(({ key, label, icon: Icon, min, max }) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-coral" />
                          <span className="text-sm font-medium text-charcoal-700">{label}</span>
                        </div>
                        <span className="text-sm text-charcoal-500">{settings[key as keyof FilterSettings]}%</span>
                      </div>
                      <input
                        type="range"
                        min={min}
                        max={max}
                        value={settings[key as keyof FilterSettings]}
                        onChange={(e) => updateSetting(key as keyof FilterSettings, Number(e.target.value))}
                        onMouseUp={() => addToHistory(settings)}
                        className="w-full"
                      />
                    </div>
                  ))}
                </TabsContent>

                {/* Effects Tab */}
                <TabsContent value="effects" className="space-y-6">
                  {[
                    { key: 'blur', label: 'Blur', icon: Aperture, min: 0, max: 20 },
                    { key: 'hue', label: 'Hue Rotate', icon: Palette, min: 0, max: 360 },
                    { key: 'sepia', label: 'Sepia', icon: Thermometer, min: 0, max: 100 },
                    { key: 'grayscale', label: 'Grayscale', icon: ImageIcon, min: 0, max: 100 },
                    { key: 'warmth', label: 'Warmth', icon: Sun, min: -50, max: 50 },
                    { key: 'vignette', label: 'Vignette', icon: Aperture, min: 0, max: 100 },
                  ].map(({ key, label, icon: Icon, min, max }) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-coral" />
                          <span className="text-sm font-medium text-charcoal-700">{label}</span>
                        </div>
                        <span className="text-sm text-charcoal-500">
                          {key === 'blur' ? `${settings[key as keyof FilterSettings]}px` : 
                           key === 'hue' ? `${settings[key as keyof FilterSettings]}°` :
                           `${settings[key as keyof FilterSettings]}%`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={min}
                        max={max}
                        value={settings[key as keyof FilterSettings]}
                        onChange={(e) => updateSetting(key as keyof FilterSettings, Number(e.target.value))}
                        onMouseUp={() => addToHistory(settings)}
                        className="w-full"
                      />
                    </div>
                  ))}
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-charcoal-200">
                <Button 
                  onClick={download}
                  className="w-full bg-coral hover:bg-coral-600 text-white btn-magnetic"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Image
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={reset}
                    variant="outline"
                    className="border-2 border-charcoal-300"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button 
                    onClick={() => {
                      setImage(null)
                      setSettings(defaultSettings)
                    }}
                    variant="outline"
                    className="border-2 border-charcoal-300"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    New Photo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Toast 
        message={toast.message} 
        show={toast.show} 
        onClose={() => setToast({ show: false, message: '' })} 
      />
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Sliders,
      title: 'Smart Adjustments',
      description: 'Fine-tune brightness, contrast, saturation, and more with intuitive controls.',
    },
    {
      icon: Sparkles,
      title: 'AI Filters',
      description: 'Apply stunning AI-powered filters that enhance your photos instantly.',
    },
    {
      icon: Crop,
      title: 'Precision Cropping',
      description: 'Crop, rotate, and flip your images with pixel-perfect accuracy.',
    },
    {
      icon: Palette,
      title: 'Color Grading',
      description: 'Professional color grading tools for cinematic looks.',
    },
    {
      icon: Aperture,
      title: 'Blur & Focus',
      description: 'Add depth with customizable blur and vignette effects.',
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description: 'Export in multiple formats and share directly to social media.',
    },
  ]

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-coral/10 text-coral rounded-full text-sm font-medium mb-4">
            Powerful Tools
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            Professional-grade editing tools designed for creators of all skill levels
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-8 rounded-2xl bg-charcoal-50 hover:bg-white hover:shadow-large transition-all duration-500 reveal-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-coral/10 flex items-center justify-center mb-6 group-hover:bg-coral group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-coral group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold text-charcoal-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-charcoal-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Gallery Section
function GallerySection() {
  const galleryImages = [
    { src: '/gallery-1.jpg', title: 'Portrait', category: 'People' },
    { src: '/gallery-2.jpg', title: 'Lifestyle', category: 'Moments' },
    { src: '/gallery-3.jpg', title: 'Vintage', category: 'Retro' },
    { src: '/gallery-4.jpg', title: 'Landscape', category: 'Nature' },
    { src: '/gallery-5.jpg', title: 'Portrait', category: 'People' },
    { src: '/gallery-6.jpg', title: 'Food', category: 'Lifestyle' },
  ]

  return (
    <section id="gallery" className="py-24 bg-charcoal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-coral/10 text-coral rounded-full text-sm font-medium mb-4">
            Inspiration
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
            Gallery Showcase
          </h2>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            See what others have created with Lumina
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-coral text-sm font-medium">{image.category}</span>
                  <h3 className="text-white font-display text-xl font-semibold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Photographer',
      image: '/gallery-1.jpg',
      text: 'Lumina has completely transformed my workflow. The AI filters are incredible!',
      rating: 5,
    },
    {
      name: 'John Davidson',
      role: 'Content Creator',
      image: '/gallery-5.jpg',
      text: 'Best photo editing app I\'ve ever used. So intuitive and powerful.',
      rating: 5,
    },
    {
      name: 'Emily Roberts',
      role: 'Influencer',
      image: '/gallery-2.jpg',
      text: 'My followers always ask how I get my photos to look so good. It\'s Lumina!',
      rating: 5,
    },
  ]

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-coral/10 text-coral rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
            Loved by Creators
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-charcoal-50 reveal-scale"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-charcoal-700 text-lg mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-900">{testimonial.name}</h4>
                  <p className="text-sm text-charcoal-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 bg-charcoal-900 relative overflow-hidden particles-bg">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-coral/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-coral/20 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Start Creating Today
        </h2>
        <p className="text-xl text-charcoal-300 mb-10 max-w-2xl mx-auto">
          Join thousands of creators who trust Lumina for their photo editing needs
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg"
            onClick={() => document.getElementById('editor')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-coral hover:bg-coral-600 text-white btn-magnetic text-lg px-10 py-6 animate-pulse-glow"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Your Photo
          </Button>
        </div>
        
        <div className="mt-16 flex justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-coral">10K+</div>
            <div className="text-charcoal-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-coral">1M+</div>
            <div className="text-charcoal-400">Photos Edited</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-coral">4.9</div>
            <div className="text-charcoal-400">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-8 h-8 text-coral" />
              <span className="font-display text-2xl font-bold">LUMINA</span>
            </div>
            <p className="text-charcoal-400 max-w-sm mb-6">
              Professional photo editing made simple. Transform your photos into stunning masterpieces.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a 
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center hover:bg-coral transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-3 text-charcoal-400">
              {['Features', 'Pricing', 'Gallery', 'Download'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-coral transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3 text-charcoal-400">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-coral transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-charcoal-800 text-center text-charcoal-500">
          <p>&copy; 2026 Lumina Photo Editor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  useEffect(() => {
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <PhotoEditor />
      <FeaturesSection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
