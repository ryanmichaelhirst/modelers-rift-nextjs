import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Kicker_Root: THREE.Bone
    Weapon: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Bone: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    nasus_cerberus_weapon2: THREE.MeshBasicMaterial
    nasus_kicker: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'nasusult_skin05_spell1'
  | 'Idle1_Base'
  | 'Attack1'
  | 'Attack2'
  | 'nasusult_skin05_spell2'
  | 'Channel_Base'
  | 'Channel_Leadin'
  | 'Channel_Wndup'
  | 'Run_Base'
  | 'Crit'
  | 'Run_In'
  | 'Idle_In'
  | 'Spell1_Upper'
  | 'Recall'
  | 'Recall_Leadout'
  | 'Death'
  | 'Attack3'
  | 'Spell3_Upper'
  | 'Spell3_Base'
  | 'nasusult_skin05_winddown'
  | 'Dance'
  | 'nasusult_skin05_laugh'
  | 'Taunt_Base'
  | 'nasusult_skin05_joke'
  | 'Spell1'
  | 'Skin05_Spell3_Base'
  | 'nasusult_skin05_idle1'
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
        <primitive object={nodes.Kicker_Root} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Bone} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-120.62, -27.74, -219.38]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.nasus_cerberus_weapon2}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.nasus_kicker}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
