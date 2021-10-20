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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    L_Weapon_World: THREE.Bone
    R_Weapon_World: THREE.Bone
    bag_a_World: THREE.Bone
    R_in_elbow: THREE.Bone
    L_in_elbow: THREE.Bone
    RecallRobot_RORoot: THREE.Bone
    RecallRobot2_RORoot: THREE.Bone
    RecallFort_DtRoot: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Bottle: THREE.MeshBasicMaterial
    Robot: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Spell5'
  | 'Idle2Run'
  | 'Run2Idle'
  | 'Recall'
  | 'Recall_Winddown'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.L_Weapon_World} />
        <primitive object={nodes.R_Weapon_World} />
        <primitive object={nodes.bag_a_World} />
        <primitive object={nodes.R_in_elbow} />
        <primitive object={nodes.L_in_elbow} />
        <primitive object={nodes.RecallRobot_RORoot} />
        <primitive object={nodes.RecallRobot2_RORoot} />
        <primitive object={nodes.RecallFort_DtRoot} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-71.27, -0.61, -146.28]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Bottle}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Robot}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
