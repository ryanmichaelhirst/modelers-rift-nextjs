import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death_Body'
  | 'Idle1'
  | 'Idle2'
  | 'syndra_idle3'
  | 'syndra_idle4'
  | 'syndra_joke'
  | 'syndra_laugh'
  | 'syndra_skin06_recall'
  | 'Recall_Windup'
  | 'Run'
  | 'Run1'
  | 'Run2'
  | 'Spell1'
  | 'Spell2_Pull'
  | 'Spell3_Start'
  | 'Spell4_Start'
  | 'syndra_taunt'
  | 'Orbs'
  | 'Spell2_Throw'
  | 'syndra_death'
  | 'Recall_Winddown'
  | 'Spell3_Cast'
  | 'Spell4_Cast'
  | 'Dance'
  | 'syndra_idle1'
  | 'syndra_skin06_homeguard'
  | 'syndra_skin06_homeguard_variant'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert1}
        skeleton={nodes.mesh_0.skeleton}
        position={[0, -0.05, 0]}
        scale={0}
      />
    </group>
  )
}
