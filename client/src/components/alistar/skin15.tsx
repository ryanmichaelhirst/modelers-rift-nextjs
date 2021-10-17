import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Bottle: THREE.Bone
    Stick: THREE.Bone
    Cowbell: THREE.Bone
    Bowl: THREE.Bone
    Cork_World_Snap: THREE.Bone
    CatA_Root: THREE.Bone
    CatB_Root: THREE.Bone
    CatC_Root: THREE.Bone
  }
  materials: {
    Alistar_Moocow_MAT: THREE.MeshBasicMaterial
    recall_Milk: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Idle5'
  | 'alistar_idlein'
  | 'Laugh'
  | 'Recall'
  | 'Run'
  | 'Run2'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'alistar_idle1_angry'
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
        <primitive object={nodes.root} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.Bottle} />
        <primitive object={nodes.Stick} />
        <primitive object={nodes.Cowbell} />
        <primitive object={nodes.Bowl} />
        <primitive object={nodes.Cork_World_Snap} />
        <primitive object={nodes.CatA_Root} />
        <primitive object={nodes.CatB_Root} />
        <primitive object={nodes.CatC_Root} />
      </group>
      <group position={[-111.32, -0.39, -49.35]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Alistar_Moocow_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.recall_Milk}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
