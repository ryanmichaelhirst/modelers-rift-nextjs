import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    lambert2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'ashe_spell3'
  | 'ashe_crit1'
  | 'ashe_run_jog'
  | 'ashe_queen_jog'
  | 'ashe_attack1'
  | 'ashe_queen_attack1'
  | 'ashe_attack2'
  | 'ashe_queen_idle1'
  | 'ashe_idle1'
  | 'ashe_idle2'
  | 'ashe_queen_idle2'
  | 'ashe_queen_idle3'
  | 'ashe_idle3'
  | 'ashe_idle4'
  | 'ashe_queen_idle4'
  | 'ashe_queen_idle5'
  | 'ashe_idle5'
  | 'ashe_queen_dance1'
  | 'ashe_dance1'
  | 'ashe_queen_joke'
  | 'ashe_joke'
  | 'ashe_taunt'
  | 'ashe_queen_taunt'
  | 'ashe_laugh'
  | 'ashe_queen_laugh'
  | 'ashe_spell1'
  | 'ashe_queen_spell1'
  | 'ashe_spell2'
  | 'ashe_queen_spell2'
  | 'ashe_channel'
  | 'ashe_queen_channel'
  | 'ashe_channel_windup'
  | 'ashe_queen_death'
  | 'ashe_death'
  | 'ashe_run'
  | 'ashe_queen_run'
  | 'ashe_queen_walk'
  | 'ashe_run_walk'
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
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-74.53, -0.59, -44.85]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
