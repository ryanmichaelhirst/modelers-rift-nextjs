import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    pasted__lambert3: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Dance'
  | 'Death'
  | 'Run'
  | 'nasus_base_spell2_full'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'Idle1_Base'
  | 'Attack1'
  | 'Attack2'
  | 'Channel_Wndup'
  | 'Channel'
  | 'nasus_spell1'
  | 'Crit'
  | 'Spell3_Upper'
  | 'nasus_base_spell4_full'
  | 'Run_Haste'
  | 'Run_Fast'
  | 'nasus_base_joke'
  | 'nasus_base_leadin'
  | 'nasus_base_recall_leadin'
  | 'nasus_base_recall_loop'
  | 'nasus_base_recall_winddown'
  | 'nasus_base_laugh'
  | 'Run_Ult'
  | 'nasus_base_run_fast'
  | 'nasus_base_run_haste'
  | 'Run1_In'
  | 'nasus_base_taunt'
  | 'Idle2_Base'
  | 'Spell1_Upper'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.pasted__lambert3}
        skeleton={nodes.mesh_0.skeleton}
        position={[-130, -23.18, -33.93]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
