import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    WeaponAndHands: THREE.Bone
    Snap_WeaponToWorld: THREE.Bone
    Recall_Candle1_Jnt_Root: THREE.Bone
    Recall_Candle2_Jnt_Root: THREE.Bone
    Recall_Ghost1_Root: THREE.Bone
    Recall_Ghost2_Root: THREE.Bone
    Recall_Ghost3_Root: THREE.Bone
    Recall_Root: THREE.Bone
    Recall_tonb_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    RecallCandle: THREE.MeshBasicMaterial
    RecallGhost: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'poppy_idle1'
  | 'Laugh'
  | 'Run_Fast'
  | 'Spell1'
  | 'Spell3'
  | 'Taunt'
  | 'Spell4_Instant'
  | 'Spell4_Charged'
  | 'Passive_Attack'
  | 'poppy_spell4_runcharging'
  | 'Spell4_Windup'
  | 'IdleIn'
  | 'poppy_spell4_charged_to_idle'
  | 'poppy_spell4_charged_to_run'
  | 'poppy_spell1_to_idle'
  | 'poppy_spell1_to_run'
  | 'Spell2_Run'
  | 'Spell2_Idle'
  | 'Recall'
  | 'Dance_In'
  | 'Joke'
  | 'Joke02'
  | 'Attack3'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Run_Base'
  | 'Joke03'
  | 'Run_Homeguard'
  | 'Run_Haste'
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
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.WeaponAndHands} />
        <primitive object={nodes.Snap_WeaponToWorld} />
        <primitive object={nodes.Recall_Candle1_Jnt_Root} />
        <primitive object={nodes.Recall_Candle2_Jnt_Root} />
        <primitive object={nodes.Recall_Ghost1_Root} />
        <primitive object={nodes.Recall_Ghost2_Root} />
        <primitive object={nodes.Recall_Ghost3_Root} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.Recall_tonb_Root} />
      </group>
      <group position={[-266.81, -168.13, -88.64]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.RecallCandle}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.RecallGhost}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
