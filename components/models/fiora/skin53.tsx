import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_BUFFBONE_GLB_Healthbar_LOC: THREE.Bone
    Recall_Fireworks4: THREE.Bone
    Recall_Fireworks2: THREE.Bone
    Recall_Fireworks6: THREE.Bone
    Recall_Fireworks3: THREE.Bone
    Recall_Fireworks8: THREE.Bone
    Recall_Fireworks7: THREE.Bone
    Recall_Fireworks1: THREE.Bone
    Recall_Fireworks5: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'fiora_idle1'
  | 'fiora_idle3'
  | 'Laugh'
  | 'RunFast'
  | 'Spell1'
  | 'Taunt'
  | 'Dance'
  | 'Joke'
  | 'Spell2_In'
  | 'Spell2'
  | 'Spell1_Attack'
  | 'IdleIn'
  | 'RunWalk'
  | 'Spell1_To_Run'
  | 'Recall'
  | 'Recall_Winddown'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_BUFFBONE_GLB_Healthbar_LOC} />
        <primitive object={nodes.Recall_Fireworks4} />
        <primitive object={nodes.Recall_Fireworks2} />
        <primitive object={nodes.Recall_Fireworks6} />
        <primitive object={nodes.Recall_Fireworks3} />
        <primitive object={nodes.Recall_Fireworks8} />
        <primitive object={nodes.Recall_Fireworks7} />
        <primitive object={nodes.Recall_Fireworks1} />
        <primitive object={nodes.Recall_Fireworks5} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <group position={[-52.97, 0, -29.85]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
