import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_SwordFX1: THREE.Bone
    Buffbone_Cstm_SwordFX2: THREE.Bone
    Buffbone_Cstm_SwordFX3: THREE.Bone
    Buffbone_Cstm_SwordFX4: THREE.Bone
    Buffbone_Cstm_SwordFX5: THREE.Bone
    Buffbone_Cstm_SwordFX6: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Facemask: THREE.Bone
    R_Robe_Base_grnd: THREE.Bone
    L_Robe_Base_grnd: THREE.Bone
    L_Arm_Socket: THREE.Bone
    R_Arm_Socket: THREE.Bone
    Buffbone_Cstm_HealthBar: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | '2013_Run_Haste'
  | 'attack1.pie_c_10_18'
  | 'attack2.pie_c_10_18'
  | 'Channel'
  | 'Channel_Wndup'
  | 'crit.pie_c_10_18'
  | 'Dance'
  | 'Death'
  | 'idle1.pie_c_10_18'
  | 'idle2.pie_c_10_18'
  | 'IdleIn'
  | 'joke.pie_c_10_18'
  | 'laugh.pie_c_10_18'
  | 'passive.pie_c_10_18'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Run_Homeguard'
  | 'Run_Ult'
  | 'Spell1'
  | 'Spell2_In'
  | 'Spell2_Loop'
  | 'masteryi_skin11_spell2'
  | 'Spell3'
  | 'Stun'
  | 'taunt.pie_c_10_18'
  | 'masteryi_skin11_attack1'
  | 'masteryi_skin11_attack2'
  | 'masteryi_skin11_crit'
  | 'masteryi_skin11_passive'
  | 'Respawn'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX1} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX2} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX3} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX4} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX5} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX6} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Facemask} />
        <primitive object={nodes.R_Robe_Base_grnd} />
        <primitive object={nodes.L_Robe_Base_grnd} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.Buffbone_Cstm_HealthBar} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
        position={[-60.93, 0.49, -85.19]}
        scale={0.01}
      />
    </group>
  )
}
