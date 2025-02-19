import { FC, useEffect, useRef } from 'react'
import {
  AmbientLight,
  AnimationClip,
  AnimationMixer,
  Box3,
  Clock,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  ReinhardToneMapping,
  Scene,
  SpotLight,
  SpotLightHelper,
  sRGBEncoding,
  Vector3,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const sizes = {
  width: 400,
  height: 600,
}

export class Animator {
  public renderer: WebGLRenderer
  public scene: Scene
  public camera: PerspectiveCamera
  public controls: OrbitControls
  public clock: Clock
  public loader: GLTFLoader
  public mixer: AnimationMixer | null
  public clips: AnimationClip[]
  public animationNames: string[]
  public height: number
  public width: number
  public previousTime: number
  public gui: dat.GUI
  public group?: Group

  constructor(canvas: HTMLCanvasElement, gui: dat.GUI) {
    const width = canvas.parentElement?.clientWidth ?? sizes.width
    const height = canvas.parentElement?.clientHeight ?? sizes.height
    // console.log({ width, height })
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
    })
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(55, width / height, 0.1, 5000)
    this.controls = new OrbitControls(this.camera, canvas)
    this.clock = new Clock()
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
    const ambientLight = new AmbientLight('#fff', 10)
    this.scene.add(ambientLight)

    const spotLight = new SpotLight('#fff')
    // spotLight.position.set(5, 200, 34)
    spotLight.position.set(-32, 66, 127)
    spotLight.intensity = 100
    spotLight.castShadow = true
    spotLight.decay = 0
    spotLight.distance = 200
    spotLight.color = new Color('#fff')
    spotLight.castShadow = true
    spotLight.shadow.mapSize.set(1024, 1024)
    this.scene.add(spotLight)

    spotLight.target.position.x = 7
    spotLight.target.position.y = 14
    spotLight.target.position.z = 258
    this.scene.add(spotLight.target)

    const spotLightHelper = new SpotLightHelper(spotLight)

    const spotLightFolder = this.gui.addFolder('Spot Light')
    spotLightFolder
      .add({ enabled: false }, 'enabled')
      .name('enable helper')
      .onChange((value) => {
        if (value) this.scene.add(spotLightHelper)
        else this.scene.remove(spotLightHelper)
      })
    spotLightFolder.add(spotLight, 'intensity').min(0).max(500).step(0.01).name('intensity')
    spotLightFolder.add(spotLight.position, 'x').min(0).max(500).step(0.01).name('x')
    spotLightFolder.add(spotLight.position, 'y').min(0).max(500).step(0.01).name('y')
    spotLightFolder.add(spotLight.position, 'z').min(0).max(500).step(0.01).name('z')
    // window.requestAnimationFrame(() => {
    //   spotLightHelper.update()
    // })

    const pointLight = new PointLight(0xffffff, 10, 200, 0.01)
    pointLight.castShadow = true
    pointLight.shadow.mapSize.setX(1024)
    pointLight.shadow.mapSize.setY(1024)
    this.scene.add(pointLight)

    const pointLightHelper = new PointLightHelper(pointLight, 10)

    const pointLightFolder = this.gui.addFolder('Point Light')
    pointLightFolder
      .add({ enabled: false }, 'enabled')
      .name('enable helper')
      .onChange((value) => {
        if (value) this.scene.add(pointLightHelper)
        else this.scene.remove(pointLightHelper)
      })
    pointLightFolder.add(pointLight, 'intensity').min(0).max(10).step(0.001).name('intensity')
    pointLightFolder.add(pointLight.position, 'x').min(0).max(500).step(0.01).name('x')
    pointLightFolder.add(pointLight.position, 'y').min(0).max(500).step(0.01).name('y')
    pointLightFolder.add(pointLight.position, 'z').min(0).max(500).step(0.01).name('z')

    const meshFolder = this.gui.addFolder('Mesh')
    meshFolder
      .add({ enabled: true }, 'enabled')
      .name('enable floor')
      .onChange((value) => {
        if (value) this.addFloor()
        else this.removeFloor()
      })

    this.gui.addColor({ backgroundColor: '#FFFFFF' }, 'backgroundColor').onChange((value) => {
      this.renderer.setClearColor(value, 1)
    })

    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // sets the canvas background color, default is transparent
    this.renderer.setClearColor(0xffffff, 0)
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.toneMapping = ReinhardToneMapping
    this.renderer.toneMappingExposure = 1
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = PCFSoftShadowMap
  }

  removeFloor() {
    if (!this.group) return

    const floor = this.group?.children.find((c) => c.type === 'Mesh')
    if (!floor) return

    this.group.remove(floor)
  }

  addFloor() {
    if (!this.group) return

    const floor = new Mesh(
      new PlaneGeometry(this.width, 300),
      new MeshStandardMaterial({
        color: '#fff',
        metalness: 0,
        roughness: 0.5,
      }),
    )
    floor.receiveShadow = true
    floor.rotation.x = -Math.PI * 0.5
    this.group.add(floor)
  }

  async load(url: string) {
    await new Promise<void>((resolve) => {
      this.loader.load(url, (gltf) => {
        const box = new Box3().setFromObject(gltf.scene)
        const center = new Vector3()
        box.getCenter(center)
        const group = new Group()
        this.group = group

        group.position.sub(center)
        group.add(gltf.scene)
        this.addFloor()
        this.scene.add(group)
        this.castShadows()

        this.mixer = new AnimationMixer(gltf.scene)
        this.clips = gltf.animations
        this.animationNames = gltf.animations.map((a) => a.name)
        resolve()
      })
    })
  }

  castShadows() {
    this.scene.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
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
      console.log('setup Animator')
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
      console.log('unmounting Model')

      if (animator) animator.dispose()
      if (gui) {
        const guiContainer = guiRef.current
        guiContainer?.removeChild(gui.domElement)
      }
    }
  }, [url])

  return (
    <div className='relative h-full'>
      <div ref={guiRef} className='absolute top-3 left-0'></div>
      <canvas ref={ref}></canvas>
    </div>
  )
}
