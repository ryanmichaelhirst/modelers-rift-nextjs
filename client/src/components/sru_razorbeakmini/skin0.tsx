import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Raptors_TX: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run'
  | 'Attack1'
  | 'sru_razorbeakmini_attack2'
  | 'Death_Base'
  | 'Spawn2'
  | 'Spawn3'
  | 'Spawn4'
  | 'Idle_Normal1'
  | 'Idle_Normal2'
  | 'sru_razorbeakmini_idle_aggro_0'
  | 'sru_razorbeakmini_idle_aggro_l45'
  | 'sru_razorbeakmini_idle_aggro_r45'
  | 'sru_razorbeakmini_idle_aggro_r135'
  | 'sru_razorbeakmini_idle_aggro_l135'
  | 'Idle_Aggro1'
  | 'Idle_Aggro2'
  | 'sru_razorbeakmini_attack3'
  | 'sru_razorbeakmini_n2a'
  | 'sru_razorbeakmini_a2n'
  | 'Idle_Aggro3'
  | 'sru_razorbeakmini_death2'
  | 'sru_razorbeakmini_nspawn2'
  | 'sru_razorbeakmini_nspawn3'
  | 'sru_razorbeakmini_nspawn4'
  | 'Idle_Normal3'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Raptors_TX}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
