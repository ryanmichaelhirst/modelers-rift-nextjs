import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Cstm_R_Foot: THREE.Bone
    Buffbone_Cstm_L_Foot: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    lambert2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'sru_crab_flee'
  | 'Crab_Spawn'
  | 'Crab_Burrow'
  | 'Crab_Dance'
  | 'Crab_Dash'
  | 'Crab_Dash_Out'
  | 'Crab_Flee_toRun'
  | 'Crab_Hide'
  | 'Crab_Idle_toRun'
  | 'sru_crab_flee2'
  | 'Crab_Run_toFlee'
  | 'Crab_Stun'
  | 'Idle1'
  | 'Run'
  | 'Run_Backwards'
  | 'Turn_Left_180'
  | 'Turn_Left_45'
  | 'Turn_Right_180'
  | 'Turn_Right_45'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Cstm_R_Foot} />
        <primitive object={nodes.Buffbone_Cstm_L_Foot} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert2} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
