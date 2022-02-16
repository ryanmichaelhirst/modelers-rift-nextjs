import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
  }
  materials: {
    Skin04_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'Run'
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Death'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2_LNG'
  | 'Spell3'
  | 'Taunt'
  | 'Crit'
  | 'tristana_dance_in'
  | 'tristana_dance_loop'
  | 'Idle_In'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Spell2_Mid'
  | 'Spell2_Shrt'
  | 'Channel_Wndup'
  | 'Stunned'
  | 'tristana_knockedup'
  | 'KnockedUp_In'
  | 'Run90'
  | 'Run-90'
  | 'Spell4'
  | 'tristana_attack1'
  | 'Run_Slow'
  | 'Run_Slow_IN_TRAN'
  | 'Run_Slow_OUT_TRAN'
  | 'Recall'
  | 'Respawn'
  | 'Spell2_In'
  | 'Recall_Winddown'
  | 'Joke'
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
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Skin04_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-58.89, 0, -88.17]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
