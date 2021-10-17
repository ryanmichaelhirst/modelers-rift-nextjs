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
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Sword_World: THREE.Bone
  }
  materials: {
    Armor: THREE.MeshBasicMaterial
    Ult_Armor: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Spell1'
  | 'Spell3'
  | 'masteryi_skin09_attack1'
  | 'masteryi_skin09_attack2'
  | 'Channel'
  | 'masteryi_skin09_crit'
  | 'Death'
  | 'masteryi_skin09_idle1'
  | 'masteryi_skin09_idle2'
  | 'masteryi_skin09_laugh'
  | 'Run'
  | 'masteryi_skin09_spell2_in'
  | 'masteryi_skin09_taunt'
  | 'masteryi_skin09_idle_enter'
  | 'Spell2_In'
  | 'Spell2_Loop'
  | 'Stun'
  | 'masteryi_skin09_passive'
  | 'Channel_Wndup'
  | 'Dance_Loop'
  | 'Run_Fast'
  | 'Run_Haste'
  | '2013_Run_Haste'
  | 'masteryi_2013_attack1'
  | 'masteryi_2013_attack2'
  | 'masteryi_2013_crit'
  | 'masteryi_2013_passive'
  | 'Buffbones'
  | 'Spell4_Start'
  | 'Spell4_Loop'
  | 'masteryi_skin09_idle_enter2'
  | 'Dance_In'
  | 'Run_Ult'
  | 'TurnLeft'
  | 'TurnRight'
  | 'Respawn'
  | 'masteryi_skin09_idleult_loop'
  | 'masteryi_skin09_idleult_in'
  | 'Recall'
  | 'Joke'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Sword_World} />
      </group>
      <group position={[-58.23, -26.62, -87.34]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Armor}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Ult_Armor}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
