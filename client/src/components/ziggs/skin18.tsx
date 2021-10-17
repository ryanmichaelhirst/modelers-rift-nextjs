import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    R_Snap_Bomb2World: THREE.Bone
    L_Snap_Bomb2World: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Snap_Bomb_c_World: THREE.Bone
    Candle_VFX: THREE.Bone
    Candle1: THREE.Bone
    MatchStick: THREE.Bone
    BombCandle1: THREE.Bone
    Mask: THREE.Bone
  }
  materials: {
    Ziggs_Skin14_MAT: THREE.MeshBasicMaterial
    Ziggs_Skin14_Recall_MAT: THREE.MeshBasicMaterial
    Recall_Mask_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Joke'
  | 'Laugh'
  | 'ziggs_idle1'
  | 'ziggs_idle2'
  | 'ziggs_idle3'
  | 'ziggs_idle4'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Taunt'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.R_Snap_Bomb2World} />
        <primitive object={nodes.L_Snap_Bomb2World} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Snap_Bomb_c_World} />
        <primitive object={nodes.Candle_VFX} />
        <primitive object={nodes.Candle1} />
        <primitive object={nodes.MatchStick} />
        <primitive object={nodes.BombCandle1} />
        <primitive object={nodes.Mask} />
      </group>
      <group position={[-47.76, 0, -74.4]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Ziggs_Skin14_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Ziggs_Skin14_Recall_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Recall_Mask_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
