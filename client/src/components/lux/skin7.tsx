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
    mesh_0_3: THREE.SkinnedMesh
    Weapon: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
  }
  materials: {
    Light_Staff: THREE.MeshBasicMaterial
    Light_Staff_Ends: THREE.MeshBasicMaterial
    Light_Body: THREE.MeshBasicMaterial
    Light_Collar: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'lux_skin07_run_homeguard'
  | 'Dance_Intro'
  | 'Transform_Water'
  | 'lux_skin07_recall_beginningall'
  | 'Dance_Loop'
  | 'Channel'
  | 'Run_Haste'
  | 'Run_Homeguard_IN'
  | 'Transform_Air'
  | 'Transform_Nature'
  | 'lux_skin07_idle1'
  | 'Attack1'
  | 'Attack3'
  | 'Attack2'
  | 'Run_Variation'
  | 'Crit'
  | 'Idle3'
  | 'Idle2'
  | 'Idle1'
  | 'Respawn'
  | 'Idle4'
  | 'Channel_Wndup'
  | 'Recall_Winddown'
  | 'Spell1'
  | 'Spell3'
  | 'Spell2'
  | 'Laugh'
  | 'Idle_In'
  | 'Spell4'
  | 'Taunt'
  | 'Death'
  | 'Joke'
  | 'TurnR'
  | 'Run_Slow'
  | 'TurnL'
  | 'Transform_Fire'
  | 'lux_skin07_recall_exit_light'
  | 'Run_Base'
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
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Light_Staff}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Light_Staff_Ends}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Light_Body}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Light_Collar}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
