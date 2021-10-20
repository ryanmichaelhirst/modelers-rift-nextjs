import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Healthbar_Loc: THREE.Bone
    Recall_Shield_Root: THREE.Bone
  }
  materials: {
    lambert2: THREE.MeshBasicMaterial
    Recall_Shield: THREE.MeshBasicMaterial
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
  | 'Recall_Loop'
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
  | 'syndra_skin05_recall'
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
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Healthbar_Loc} />
        <primitive object={nodes.Recall_Shield_Root} />
      </group>
      <group position={[-70.04, -9.34, -68.48]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.lambert2}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall_Shield}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
