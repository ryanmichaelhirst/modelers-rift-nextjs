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
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Weapon_Snap: THREE.Bone
    BrokenSword: THREE.Bone
  }
  materials: {
    Ult: THREE.MeshBasicMaterial
    Champ: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack1_Ult'
  | 'Attack2'
  | 'Attack2_Ult'
  | 'Attack3'
  | 'riven_skin16_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle1_Ult'
  | 'Laugh'
  | 'Spell1A'
  | 'riven_skin16_spell1a'
  | 'Spell1B'
  | 'riven_skin16_spell1b'
  | 'Spell1C'
  | 'riven_skin16_spell1c'
  | 'Spell3'
  | 'Spell3_ULT'
  | 'Spell4B'
  | 'Taunt'
  | 'Joke'
  | 'Run'
  | 'Run_Ult'
  | 'Recall'
  | 'Crit_In'
  | 'Crit_Out'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'riven_skin16_idle1'
  | 'riven_skin16_idle2'
  | 'riven_skin16_idle3'
  | 'Idle_In'
  | 'riven_skin16_idlein_ult'
  | 'Joke_Ult'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run1_In'
  | 'Run2_In'
  | 'riven_skin16_run_haste'
  | 'Run_Fast'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'riven_skin16_run_ult'
  | 'riven_skin16_spell1a_toidle'
  | 'riven_skin16_spell1b_toidle'
  | 'riven_skin16_spell1c_toidle'
  | 'Spell2_In'
  | 'Spell2_Out'
  | 'Spell4a_In'
  | 'Spell4a_Out'
  | 'riven_skin16_spell4b_toidle'
  | 'Turn0'
  | 'TurnL'
  | 'riven_skin16_turnl180'
  | 'TurnR'
  | 'riven_skin16_turnr180'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Weapon_Snap} />
        <primitive object={nodes.BrokenSword} />
      </group>
      <group position={[-56.67, -54.9, -99.27]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Ult} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Champ} skeleton={nodes.mesh_0_1.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
