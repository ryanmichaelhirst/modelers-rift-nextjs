import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Ice1: THREE.Bone
    Ice2: THREE.Bone
    Ice3: THREE.Bone
    Ice4: THREE.Bone
    Ice5: THREE.Bone
    Ice6: THREE.Bone
    Ice7: THREE.Bone
    Ice8: THREE.Bone
    Ice9: THREE.Bone
    Ice10: THREE.Bone
    Ice11: THREE.Bone
    Ice12: THREE.Bone
    Ice13: THREE.Bone
    Ice14: THREE.Bone
    Ice15: THREE.Bone
    Ice16: THREE.Bone
    Ice17: THREE.Bone
    Ice18: THREE.Bone
    Ice19: THREE.Bone
    Ice20: THREE.Bone
    Ice21: THREE.Bone
    Ice22: THREE.Bone
    Ice23: THREE.Bone
    Ice24: THREE.Bone
    Ice25: THREE.Bone
    Ice26: THREE.Bone
    Ice27: THREE.Bone
    Ice28: THREE.Bone
    Ice29: THREE.Bone
    Ice30: THREE.Bone
    Q_Spike: THREE.Bone
  }
  materials: {
    blinn2: THREE.MeshBasicMaterial
    Lissandra_Death_subm: THREE.MeshBasicMaterial
    Lissandra_Q_Spike2: THREE.MeshBasicMaterial
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
  | 'lissandra_idle_in'
  | 'lissandra_run3'
  | 'Spell3_Port'
  | 'Run2_In'
  | 'Channel'
  | 'Channel_Wndup'
  | 'lissandra_run2'
  | 'lissandra_recall_winddown'
  | 'Run_In2'
  | 'Idle2_Base'
  | 'lissandra_idle3'
  | 'Run3_In'
  | 'Run2_Var'
  | 'Run_Var'
  | 'lissandra_dance_loop'
  | 'Spell2_ICE'
  | 'Dance_LOOP_ICE'
  | 'Death_Ice'
  | 'Recall_Windup'
  | 'Recall_Loop'
  | 'Recall_Leadout'
  | 'lissandra_taunt'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_0'
  | 'Turn_L180'
  | 'Turn_R180'
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
        <primitive object={nodes.Ice1} />
        <primitive object={nodes.Ice2} />
        <primitive object={nodes.Ice3} />
        <primitive object={nodes.Ice4} />
        <primitive object={nodes.Ice5} />
        <primitive object={nodes.Ice6} />
        <primitive object={nodes.Ice7} />
        <primitive object={nodes.Ice8} />
        <primitive object={nodes.Ice9} />
        <primitive object={nodes.Ice10} />
        <primitive object={nodes.Ice11} />
        <primitive object={nodes.Ice12} />
        <primitive object={nodes.Ice13} />
        <primitive object={nodes.Ice14} />
        <primitive object={nodes.Ice15} />
        <primitive object={nodes.Ice16} />
        <primitive object={nodes.Ice17} />
        <primitive object={nodes.Ice18} />
        <primitive object={nodes.Ice19} />
        <primitive object={nodes.Ice20} />
        <primitive object={nodes.Ice21} />
        <primitive object={nodes.Ice22} />
        <primitive object={nodes.Ice23} />
        <primitive object={nodes.Ice24} />
        <primitive object={nodes.Ice25} />
        <primitive object={nodes.Ice26} />
        <primitive object={nodes.Ice27} />
        <primitive object={nodes.Ice28} />
        <primitive object={nodes.Ice29} />
        <primitive object={nodes.Ice30} />
        <primitive object={nodes.Q_Spike} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.blinn2} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Lissandra_Death_subm}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Lissandra_Q_Spike2}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
