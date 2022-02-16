import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    l_thigh: THREE.Bone
    r_thigh: THREE.Bone
    taill1_a: THREE.Bone
    taill2_a: THREE.Bone
    taill3_a: THREE.Bone
    taill4_a: THREE.Bone
    tailr1_a: THREE.Bone
    tailr2_a: THREE.Bone
    tailr3_a: THREE.Bone
    tailr4_a: THREE.Bone
    tail_a: THREE.Bone
    weapon: THREE.Bone
    buffbone_glb_channel_loc: THREE.Bone
    buffbone_glb_ground_loc: THREE.Bone
    c_buffbone_glb_center_loc: THREE.Bone
    c_buffbone_glb_layout_loc: THREE.Bone
    c_buffbone_glb_overhead_loc: THREE.Bone
  }
  materials: {
    Ahri_Skin04_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Idle5'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Dance'
  | 'Recall'
  | 'Turn_0'
  | 'Turn_L'
  | 'Turn_L180'
  | 'Turn_R'
  | 'Turn_R180'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.l_thigh} />
        <primitive object={nodes.r_thigh} />
        <primitive object={nodes.taill1_a} />
        <primitive object={nodes.taill2_a} />
        <primitive object={nodes.taill3_a} />
        <primitive object={nodes.taill4_a} />
        <primitive object={nodes.tailr1_a} />
        <primitive object={nodes.tailr2_a} />
        <primitive object={nodes.tailr3_a} />
        <primitive object={nodes.tailr4_a} />
        <primitive object={nodes.tail_a} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.buffbone_glb_channel_loc} />
        <primitive object={nodes.buffbone_glb_ground_loc} />
        <primitive object={nodes.c_buffbone_glb_center_loc} />
        <primitive object={nodes.c_buffbone_glb_layout_loc} />
        <primitive object={nodes.c_buffbone_glb_overhead_loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ahri_Skin04_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-123.5, -6.93, -105.08]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
