import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    effect_root: THREE.Bone
    root_b: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    hecarim_arcade_bluetail: THREE.MeshBasicMaterial
    hecarim_arcade_tail: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'hecarim_arcade_idle1'
  | 'hecarim_arcade_idle3'
  | 'hecarim_arcade_idle4'
  | 'Joke'
  | 'Run'
  | 'Run2'
  | 'Run3'
  | 'hecarim_arcade_spell2'
  | 'Spell4'
  | 'Spell3'
  | 'hecarim_arcade_spell1'
  | 'hecarim_arcade_spell4b'
  | 'Recall_Leadout'
  | 'Recall_Winddown'
  | 'Recall'
  | 'Arcade_Recall_Leadout'
  | 'UVtail'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Arcade_Crit'
  | 'Arcade_Dance'
  | 'Arcade_Spell4'
  | 'Arcade_Spell4b'
  | 'Taunt'
  | 'Laugh'
  | 'Arcade_Joke'
  | 'Spell4WindUp'
  | 'Arcade_Death'
  | 'Spell3run'
  | 'Respawn'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_0'
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
        <primitive object={nodes.effect_root} />
        <primitive object={nodes.root_b} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <group position={[-81.2, -25.62, -204.91]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.hecarim_arcade_bluetail}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.hecarim_arcade_tail}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
