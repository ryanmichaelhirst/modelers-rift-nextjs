import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    R_Arm_Socket: THREE.Bone
    L_Arm_Socket: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    true_World: THREE.Bone
    Weapon_Snap: THREE.Bone
    Cstm_Buffbone_Mist1: THREE.Bone
    Cstm_Buffbone_Mist2: THREE.Bone
    Cstm_Buffbone_Mist3: THREE.Bone
    Cstm_Buffbone_Mist4: THREE.Bone
    Cstm_Buffbone_Mist5: THREE.Bone
  }
  materials: {
    Body_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'riven_skin20_attack1'
  | 'riven_skin20_attack2'
  | 'riven_skin20_attack2_ult'
  | 'riven_skin20_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Crit_Ult'
  | 'riven_skin22_dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Laugh'
  | 'Spell1A'
  | 'riven_skin22_spell1a'
  | 'Spell1B'
  | 'riven_skin22_spell1b'
  | 'Spell1C'
  | 'riven_skin22_spell1c'
  | 'Spell2'
  | 'riven_skin20_spell2'
  | 'Spell3'
  | 'Spell3_ULT'
  | 'Spell4A'
  | 'Spell4B'
  | 'Taunt'
  | 'Joke'
  | 'Run'
  | 'Run_Ult'
  | 'Recall'
  | 'Idle2_Ult'
  | 'riven_skin23_idle3_ult.pie_c_10_16'
  | 'riven_skin22_dance_ult'
  | 'Joke_Ult'
  | 'Laugh_ult'
  | 'Taunt_Ult'
  | 'Channel_Ult'
  | 'riven_skin20_channel_windup_ult'
  | 'riven_skin23_run_ult_toidle.pie_c_10_16'
  | 'riven_dance'
  | 'riven_attack3_v02'
  | 'riven_attack1_v05'
  | 'riven_skin20_attack1_ult'
  | 'riven_attack2_v03'
  | 'riven_attack2_ult_v05'
  | 'riven_skin20_idle3_ult'
  | 'Idle1_Ult'
  | 'riven_dance_ult'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.true_World} />
        <primitive object={nodes.Weapon_Snap} />
        <primitive object={nodes.Cstm_Buffbone_Mist1} />
        <primitive object={nodes.Cstm_Buffbone_Mist2} />
        <primitive object={nodes.Cstm_Buffbone_Mist3} />
        <primitive object={nodes.Cstm_Buffbone_Mist4} />
        <primitive object={nodes.Cstm_Buffbone_Mist5} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-43.8, -15.76, -22.83]}
        scale={0.01}
      />
    </group>
  )
}
