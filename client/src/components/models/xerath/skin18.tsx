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
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    L_Uparm: THREE.Bone
    L_Forearm: THREE.Bone
    R_Uparm: THREE.Bone
    R_Forearm: THREE.Bone
    L_Thigh: THREE.Bone
    L_Knee: THREE.Bone
    R_Thigh: THREE.Bone
    R_Knee: THREE.Bone
    Armor_Root: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Root_H: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Hand: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Attack3'
  | 'Crit'
  | 'Death'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt_Base'
  | 'Attack1'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Laugh'
  | 'Run'
  | 'Joke'
  | 'Spell2'
  | 'spell1.pie_c_11_10'
  | 'spell2_channel.pie_c_11_10'
  | 'Spell5start'
  | 'Spell5Loop'
  | 'spell5end.pie_c_11_10'
  | 'taunt.pie_c_11_10'
  | 'Recall'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.L_Uparm} />
        <primitive object={nodes.L_Forearm} />
        <primitive object={nodes.R_Uparm} />
        <primitive object={nodes.R_Forearm} />
        <primitive object={nodes.L_Thigh} />
        <primitive object={nodes.L_Knee} />
        <primitive object={nodes.R_Thigh} />
        <primitive object={nodes.R_Knee} />
        <primitive object={nodes.Armor_Root} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Root_H} />
      </group>
      <group position={[-55.91, -5.67, -27.33]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Hand}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
