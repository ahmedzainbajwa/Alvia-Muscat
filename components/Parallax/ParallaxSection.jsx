'use client'

/**
 * PARALLAX SECTION - COMPLEX SCROLL-TRIGGERED IMAGE GALLERY
 * 
 * HOW IT WORKS:
 * 1. Initially shows a large square image container
 * 2. As user scrolls, container expands to fullscreen
 * 3. Continues scrolling through 3 images horizontally
 * 4. After last image, container shrinks back to square
 * 
 * CUSTOMIZATION:
 * - To change images: Update the `images` array with new paths in /public/assets/parallax/
 * - To adjust scroll speed: Modify SCROLL_HEIGHT (higher = slower transitions)
 * - To tune thresholds: Adjust expandStart, imageTransition, shrinkStart values
 * - Image dimensions: Use 1920x1080 or similar high-res images for best quality
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import styles from './ParallaxSection.module.css'

// Scroll configuration - tune these values to adjust scroll behavior
const SCROLL_HEIGHT = 200 // Total scroll height in vh (higher = slower transitions)

export default function ParallaxSection({ images = [] }) {
  const containerRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Transforms for expansion/shrinking
  // 0-0.2: Expand to fullscreen
  // 0.2-0.8: Transition through images
  // 0.8-1: Shrink back to square
  
  const width = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ['80%', '100vw', '100vw', '80%']
  )

  const height = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ['50vh', '80vh', '80vh', '50vh']
  )

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ['0%', '-50%', '-50%', '0%']
  )

  // Track scroll progress to determine current image
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest >= 0.2 && latest <= 0.8) {
        // In the image transition zone
        const imageProgress = (latest - 0.2) / 0.6
        const index = Math.min(
          Math.floor(imageProgress * images.length),
          images.length - 1
        )
        setCurrentImageIndex(index)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, images.length])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <section 
      id="parallax" 
      className={styles.section}
      ref={containerRef}
      style={{ height: `${SCROLL_HEIGHT}vh` }}
    >
      <div className={styles.sticky}>
        <motion.div
          className={styles.imageContainer}
          style={{
            width,
            height,
            x,
            left: '50%',
          }}
        >
          {images.map((image, index) => (
            <div
              key={image}
              className={styles.imageWrapper}
              style={{
                opacity: currentImageIndex === index ? 1 : 0,
                transition: 'opacity 0.8s ease'
              }}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="100vw"
                quality={90}
              />
            </div>
          ))}

          {/* Image Counter */}
          <div className={styles.counter}>
            {String(currentImageIndex + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

