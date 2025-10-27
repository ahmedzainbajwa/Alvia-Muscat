# Hero Video Placeholder

## Required Video File

**File Name:** `alvia-flythrough.mp4`  
**Location:** `/public/assets/hero/alvia-flythrough.mp4`

## Video Specifications

### Recommended Settings:
- **Resolution:** 1920x1080 (Full HD) or higher
- **Format:** MP4 (H.264 codec)
- **Frame Rate:** 24-30 fps
- **Duration:** 10-30 seconds (will loop seamlessly)
- **File Size:** < 10MB (compressed for web)
- **Aspect Ratio:** 16:9

### Content Requirements:
- 3D architectural flythrough of Alvia Estate
- Smooth camera movement (no jerky transitions)
- Professional quality rendering
- Good lighting showcasing the property
- Clean, uncluttered view of the building/landscape

### Export Settings (for InspaceXR or similar):
1. Export as MP4 with H.264 compression
2. Use web-optimized preset
3. Remove audio track (video uses muted autoplay)
4. Optimize for streaming

## Temporary Placeholder

Until you provide the actual video, the component will:
- Show a black/dark background
- Display the overlay and particles
- Show all text and buttons correctly
- Work with any video format once added

## How to Add the Video

1. Export your 3D flythrough from InspaceXR or your 3D software
2. Optimize/compress the video for web delivery
3. Rename it to `alvia-flythrough.mp4`
4. Place it in `/public/assets/hero/` directory
5. The video will automatically load and play

## Testing

To test with a placeholder video:
- Use any MP4 video file temporarily
- Rename it to `alvia-flythrough.mp4`
- Place it in the correct location
- The component will work with any video

---

**Note:** The video element has been configured with:
- `autoPlay` - starts immediately
- `muted` - silent playback (required for autoplay)
- `loop` - continuous playback
- `playsInline` - prevents fullscreen on mobile

