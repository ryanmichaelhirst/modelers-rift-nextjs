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
    CapeUpper_M1_Ground: THREE.Bone
    CapeUpper_R1_Ground: THREE.Bone
    CapeUpper_L1_Ground: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Recall_Bag_Root: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Recall_Arm_Right: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'DanceLoop'
  | 'Death'
  | 'Idle1'
  | 'Joke'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2_Idle'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'IdleIn'
  | 'Spell2_Run'
  | 'Spell1_Cast_Run'
  | 'yorick_spell1_cast'
  | 'Recall'
  | 'DanceIn'
  | 'yorick_run_hg'
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
        <primitive object={nodes.CapeUpper_M1_Ground} />
        <primitive object={nodes.CapeUpper_R1_Ground} />
        <primitive object={nodes.CapeUpper_L1_Ground} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Recall_Bag_Root} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <group position={[-160.94, -18.26, -307.33]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall_Arm_Right}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
