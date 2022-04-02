import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Arrow: THREE.Bone
    ash: THREE.Bone
    Mask: THREE.Bone
    ArrowVFX2: THREE.Bone
    ArrowVFX1: THREE.Bone
    ArrowVFX: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Quinn_Skin05_Body_Mat: THREE.MeshBasicMaterial
    Mask: THREE.MeshBasicMaterial
    Valor: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'quinn_attack1'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3_Dash'
  | 'Spell3_Flip'
  | 'Run_Base'
  | 'Idle1_In'
  | 'Idle1_Base'
  | 'Run_Fast'
  | 'Joke'
  | 'Laugh'
  | 'Taunt'
  | 'Channel'
  | 'quinn_channel_leadin'
  | 'quinn_channel_windup'
  | 'Idle2_Base'
  | 'quinn_idle3'
  | 'Spell4'
  | 'Spell4_In'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'quinn_dance_in'
  | 'Dance_Base'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Crit'
  | 'Attack1_P'
  | 'Stunned'
  | 'Channel_Wndup'
  | 'quinn_spell4_flap'
  | 'quinn_spell4_glide'
  | 'quinn_spell4_idle'
  | 'quinn_spell4_runin'
  | 'quinn_spell4_idlein'
  | 'Spell4_Channel'
  | 'quinn_spell4_idle_tra'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Arrow} />
        <primitive object={nodes.ash} />
        <primitive object={nodes.Mask} />
        <primitive object={nodes.ArrowVFX2} />
        <primitive object={nodes.ArrowVFX1} />
        <primitive object={nodes.ArrowVFX} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <group position={[-98.25, -0.17, -32.76]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Quinn_Skin05_Body_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Mask}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Valor}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
