import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1_Base'
  | 'lucian_joke'
  | 'lucian_laugh'
  | 'Taunt_Base'
  | 'Recall_Windup'
  | 'Recall_Winddown'
  | 'Idle2_Base'
  | 'lucian_idle3'
  | 'Attack1_Fast'
  | 'Attack2_Fast'
  | 'lucian_run1'
  | 'Crit2'
  | 'Run1_In'
  | 'lucian_idle_in'
  | 'Idle_Ready'
  | 'Idle_ReadyOut'
  | 'Spell3'
  | 'Run_Haste'
  | 'Spell4_0'
  | 'Spell4_90'
  | 'Spell4_-90'
  | 'Spell3_0'
  | 'Spell3_180'
  | 'Spell3_-180'
  | 'Spell3_90'
  | 'Spell3_-90'
  | 'Dance'
  | 'Crit1_Fast'
  | 'Crit2_Fast'
  | 'Spell4_180'
  | 'Spell4_-180'
  | 'lucian_spell3'
  | 'Spell4_Arms'
  | 'Spell4_Idle_0'
  | 'Spell4_Idle_180'
  | 'Spell4_Idle_-180'
  | 'Spell4_Idle_90'
  | 'Spell4_Idle_-90'
  | 'lucian_spell4_arms'
  | 'Spell2_0'
  | 'Spell2_180'
  | 'Spell2_-180'
  | 'Spell2_90'
  | 'Spell2_-90'
  | 'lucian_passive'
  | 'lucian_run2'
  | 'Run2_In'
  | 'Passive_180'
  | 'Passive_-180'
  | 'Passive_90'
  | 'Passive_-90'
  | 'Buffbones'
  | 'lucian_passive_crit'
  | 'Passive_Override'
  | 'Spell1'
  | 'lucian_taunt'
  | 'lucian_idle1'
  | 'lucian_npe_spawn'
  | 'Recall'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
        position={[-68.02, -0.04, -51.08]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
