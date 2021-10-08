import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Q_Spike: THREE.Bone
    CystalBase: THREE.Bone
  }
  materials: {
    Lissandra_Skin03_Mat: THREE.MeshBasicMaterial
    Platform: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death_Base'
  | 'lissandra_spell2'
  | 'Idle1_Base'
  | 'Attack1'
  | 'Attack2'
  | 'Spell1'
  | 'Spell3'
  | 'Spell4_Self'
  | 'Run_Base'
  | 'Run_In'
  | 'Joke'
  | 'Laugh'
  | 'Run_ICE'
  | 'Crit'
  | 'Spell4'
  | 'Taunt'
  | 'lissandra_dance'
  | 'lissandra_skin03_idle_in'
  | 'lissandra_run3'
  | 'Spell3_Port'
  | 'Run2_In'
  | 'Channel'
  | 'Channel_Wndup'
  | 'lissandra_run2'
  | 'Run_In2'
  | 'Idle2_Base'
  | 'lissandra_skin03_idle3'
  | 'Run3_In'
  | 'Run2_Var'
  | 'Run_Var'
  | 'lissandra_dance_loop'
  | 'Spell2_ICE'
  | 'lissandra_skin03_dance_ice'
  | 'Dance_LOOP_ICE'
  | 'Death_Ice'
  | 'lissandra_taunt'
  | 'Turn_0'
  | 'Turn_L'
  | 'Turn_L180'
  | 'Turn_R'
  | 'Turn_R180'
  | 'Recall'
  | 'Recall_Winddown'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Q_Spike} />
        <primitive object={nodes.CystalBase} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Lissandra_Skin03_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Platform}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
