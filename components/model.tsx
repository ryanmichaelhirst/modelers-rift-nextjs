import { FC, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const sizes = {
  width: 400,
  height: 600,
}

export class Animator {
  public renderer: THREE.WebGLRenderer
  public scene: THREE.Scene
  public camera: THREE.PerspectiveCamera
  public controls: OrbitControls
  public clock: THREE.Clock
  public loader: GLTFLoader
  public mixer: THREE.AnimationMixer | null
  public clips: THREE.AnimationClip[]
  public animationNames: string[]
  public height: number
  public width: number
  public previousTime: number
  public gui: dat.GUI

  constructor(canvas: HTMLCanvasElement, gui: dat.GUI) {
    const width = canvas.parentElement?.clientWidth ?? sizes.width
    const height = canvas.parentElement?.clientHeight ?? sizes.height
    // console.log({ width, height })
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    })
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 5000)
    this.controls = new OrbitControls(this.camera, canvas)
    this.clock = new THREE.Clock()
    this.loader = new GLTFLoader()
    this.mixer = null
    this.clips = []
    this.animationNames = []
    this.previousTime = 0
    this.width = width
    this.height = height
    this.gui = gui

    // camera
    this.camera.position.set(-101, 51, 547)
    this.scene.add(this.camera)

    // lights
    const ambientLight = new THREE.AmbientLight('#fff', 10)
    this.scene.add(ambientLight)

    const spotLight = new THREE.SpotLight('#fff')
    // spotLight.position.set(5, 200, 34)
    spotLight.position.set(-32, 66, 127)
    spotLight.intensity = 100
    spotLight.castShadow = true
    spotLight.decay = 0
    spotLight.distance = 200
    spotLight.color = new THREE.Color('#fff')
    spotLight.castShadow = true
    spotLight.shadow.mapSize.set(1024, 1024)

    this.gui.add(spotLight, 'intensity').min(0).max(500).step(0.01).name('spotLightIntensity')
    this.gui.add(spotLight.position, 'x').min(0).max(500).step(0.01).name('spotLightX')
    this.gui.add(spotLight.position, 'y').min(0).max(500).step(0.01).name('spotLightY')
    this.gui.add(spotLight.position, 'z').min(0).max(500).step(0.01).name('spotLightZ')
    this.scene.add(spotLight)

    spotLight.target.position.x = 7
    spotLight.target.position.y = 14
    spotLight.target.position.z = 258
    this.scene.add(spotLight.target)

    // const spotLightHelper = new THREE.SpotLightHelper(spotLight)
    // this.scene.add(spotLightHelper)

    // window.requestAnimationFrame(() => {
    //   spotLightHelper.update()
    // })

    const pointLight = new THREE.PointLight(0xffffff, 10, 200, 0.01)
    pointLight.castShadow = true
    pointLight.shadow.mapSize.setX(1024)
    pointLight.shadow.mapSize.setY(1024)

    this.gui.add(pointLight, 'intensity').min(0).max(10).step(0.001).name('pointLightIntensity')
    this.gui.add(pointLight.position, 'x').min(0).max(500).step(0.01).name('pointLightX')
    this.gui.add(pointLight.position, 'y').min(0).max(500).step(0.01).name('pointLightY')
    this.gui.add(pointLight.position, 'z').min(0).max(500).step(0.01).name('pointLightZ')
    this.scene.add(pointLight)

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
    this.scene.add(pointLightHelper)

    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xffffff, 0)
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.ReinhardToneMapping
    this.renderer.toneMappingExposure = 1
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
  }

  async load(url: string) {
    await new Promise<void>((resolve) => {
      this.loader.load(url, (gltf) => {
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const center = new THREE.Vector3()
        box.getCenter(center)
        const group = new THREE.Group()
        group.position.sub(center)
        group.add(gltf.scene)
        const floor = new THREE.Mesh(
          new THREE.PlaneGeometry(this.width, 300),
          new THREE.MeshStandardMaterial({
            color: '#fff',
            metalness: 0,
            roughness: 0.5,
          }),
        )
        floor.receiveShadow = true
        floor.rotation.x = -Math.PI * 0.5
        group.add(floor)
        this.scene.add(group)
        this.castShadows()

        this.mixer = new THREE.AnimationMixer(gltf.scene)
        this.clips = gltf.animations
        this.animationNames = gltf.animations.map((a) => a.name)
        resolve()
      })
    })
  }

  castShadows() {
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.needsUpdate = true
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }

  animate() {
    const elapsed = this.clock.getElapsedTime()
    const delta = elapsed - this.previousTime
    this.previousTime = elapsed
    // console.log(this.camera.position)

    if (this.mixer) {
      this.mixer.update(delta)
    }

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.animate.bind(this))
  }

  dispose() {
    console.log('dispose Animator objects')
    this.gui.destroy()
    this.controls.dispose()
    this.camera.clear()
    this.scene.clear()
    this.renderer.dispose()
  }
}

export const Model: FC<{ url: string; onSetModelConfig: any }> = ({ url, onSetModelConfig }) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const guiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let gui: dat.GUI | null = null
    let animator: Animator | null = null

    const setup = async () => {
      console.log('setup')
      const canvas = ref.current
      if (!canvas) return

      const guiContainer = guiRef.current
      const dat = await import('dat.gui')
      gui = new dat.GUI({
        autoPlace: false,
        closed: true,
      })
      guiContainer?.appendChild(gui.domElement)

      animator = new Animator(canvas, gui)
      await animator.load(url)
      animator.animate()
      onSetModelConfig(animator)
    }

    setup()

    // cleanup three assets
    return () => {
      console.log('unmounting model')

      if (animator) animator.dispose()
      if (gui) {
        const guiContainer = guiRef.current
        guiContainer?.removeChild(gui.domElement)
      }
    }
  }, [url])

  return (
    <div className='relative h-full'>
      <div ref={guiRef} className='absolute top-0 left-0 z-10'></div>
      <canvas ref={ref}></canvas>
    </div>
  )
}
