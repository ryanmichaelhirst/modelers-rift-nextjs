import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
    C_BuffBone_Glb_Layout_Loc: THREE.Bone
    BuffBone_Glb_Channel_Loc: THREE.Bone
    BuffBone_Glb_Ground_Loc: THREE.Bone
    C_BuffBone_Glb_Center_Loc: THREE.Bone
    L_Weapon_Snap: THREE.Bone
    R_Weapon_Snap: THREE.Bone
  }
  materials: {
    MF1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Laugh'
  | 'Taunt'
  | 'Run1'
  | 'Spell1'
  | 'Spell2'
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Joke'
  | 'Recall'
  | 'Run2'
  | 'Spell3'
  | 'Spell4'
  | 'Recall_Winddown'
  | 'Idle2'
  | 'katarina_skin10_spell3'
  | 'katarina_skin10_crit'
  | 'RunHaste'
  | 'Idle_In'
  | 'Spell2_Throw'
  | 'Turn_0'
  | 'Turn_L180'
  | 'Turn_L90'
  | 'Turn_R180'
  | 'Turn_R90'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Layout_Loc} />
        <primitive object={nodes.BuffBone_Glb_Channel_Loc} />
        <primitive object={nodes.BuffBone_Glb_Ground_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Center_Loc} />
        <primitive object={nodes.L_Weapon_Snap} />
        <primitive object={nodes.R_Weapon_Snap} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.MF1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-40.42, -14.55, -72.61]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
