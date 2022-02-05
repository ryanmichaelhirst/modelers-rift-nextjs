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
    Snap_C_Fish1_2World: THREE.Bone
    Snap_C_Fish2_2World: THREE.Bone
    Snap_Gun2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap_C_Fish_Cut_Rear_2World: THREE.Bone
    Snap_C_Fish_Cut_Front_2World: THREE.Bone
    Snap_C_Fish_Cut_Mover_2World: THREE.Bone
    Poro01_Root: THREE.Bone
    Poro02_Root: THREE.Bone
    Poro03_Root: THREE.Bone
    Door: THREE.Bone
    Cauldron: THREE.Bone
  }
  materials: {
    Kled_Rider_Harrowing_MAT: THREE.MeshBasicMaterial
    Skin02_Recall_Poro_MAT: THREE.MeshBasicMaterial
    Skin02_Recall_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'Death'
  | 'rider_skin02_laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Joke'
  | 'Attack2'
  | 'Spell3'
  | 'Spell2'
  | 'Idle1'
  | 'Attack1'
  | 'rider_skin02_run2'
  | 'Mount_Off'
  | 'Mount_Off_to_Run'
  | 'Mount_On'
  | 'Spell2_1'
  | 'rider_spell2_3'
  | 'Spell2_2'
  | 'Spell2_3'
  | 'Recall'
  | 'Laugh_Loop'
  | 'rider_skin02_taunt'
  | 'rider_skin02_dance'
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
        <primitive object={nodes.Snap_C_Fish1_2World} />
        <primitive object={nodes.Snap_C_Fish2_2World} />
        <primitive object={nodes.Snap_Gun2World} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snap_C_Fish_Cut_Rear_2World} />
        <primitive object={nodes.Snap_C_Fish_Cut_Front_2World} />
        <primitive object={nodes.Snap_C_Fish_Cut_Mover_2World} />
        <primitive object={nodes.Poro01_Root} />
        <primitive object={nodes.Poro02_Root} />
        <primitive object={nodes.Poro03_Root} />
        <primitive object={nodes.Door} />
        <primitive object={nodes.Cauldron} />
      </group>
      <group position={[-217.2, -17.4, -108]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Kled_Rider_Harrowing_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Skin02_Recall_Poro_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Skin02_Recall_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
