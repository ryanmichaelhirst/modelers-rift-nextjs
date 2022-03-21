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
    Weapon_Snap: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    BigSword1_A: THREE.Bone
    BigSword1_B: THREE.Bone
    BigSword1_C: THREE.Bone
    BigSword1_D: THREE.Bone
    BigSword1_E: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Riven_Immortal_Jorney_MD_Riven_Immortal_Jorney_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack1_Ult'
  | 'Attack2'
  | 'Attack2_Ult'
  | 'Attack3'
  | 'riven_skin20_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Crit_Ult'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle1_Ult'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Laugh'
  | 'Spell1A'
  | 'riven_skin20_spell1a'
  | 'Spell1B'
  | 'riven_skin20_spell1b'
  | 'Spell1C'
  | 'riven_skin20_spell1c'
  | 'Spell2'
  | 'riven_skin20_spell2'
  | 'Spell3'
  | 'Spell3_ULT'
  | 'Spell4A'
  | 'Spell4B'
  | 'Taunt'
  | 'Joke'
  | 'Run'
  | 'Run_Ult'
  | 'Recall'
  | 'Run_Homeguard_IN'
  | 'Run_Homeguard'
  | 'Recall_Winddown'
  | 'Run_Homeguard_OUT'
  | 'riven_skin20_homeguard_out2'
  | 'Idle2_Ult'
  | 'Idle3_Ult'
  | 'riven_skin20_idle1_ult'
  | 'Dance_Ult'
  | 'Joke_Ult'
  | 'Laugh_ult'
  | 'Taunt_Ult'
  | 'Channel_Ult'
  | 'riven_skin20_channel_windup_ult'
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
        <primitive object={nodes.Weapon_Snap} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.BigSword1_A} />
        <primitive object={nodes.BigSword1_B} />
        <primitive object={nodes.BigSword1_C} />
        <primitive object={nodes.BigSword1_D} />
        <primitive object={nodes.BigSword1_E} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Riven_Immortal_Jorney_MD_Riven_Immortal_Jorney_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-43.86, -31.98, -43.37]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
