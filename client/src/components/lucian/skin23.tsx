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
    mesh_0_4: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Hair1_Grnd: THREE.Bone
    L_Cloth1_Grnd: THREE.Bone
    R_Cloth1_Grnd: THREE.Bone
    LightGun2World: THREE.Bone
    DarkGun2World: THREE.Bone
    Buffbone_HealthBar: THREE.Bone
    Hat2World: THREE.Bone
    Q_Gun: THREE.Bone
    Tumbleweed: THREE.Bone
    Recall1_Elbow: THREE.Bone
    Recall2_Elbow: THREE.Bone
    Recall3_Elbow: THREE.Bone
    Recall4_Elbow: THREE.Bone
    Grave: THREE.Bone
  }
  materials: {
    Lucian_Base_Mat: THREE.MeshBasicMaterial
    Q_Gun_MAT: THREE.MeshBasicMaterial
    Hands_MAT: THREE.MeshBasicMaterial
    Lucian_Skin08_Grave_MAT: THREE.MeshBasicMaterial
    Demon_Form_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1_Base'
  | 'lucian_skin08_joke'
  | 'Taunt_loop'
  | 'Idle2_Base'
  | 'Attack1_Fast'
  | 'Attack2_Fast'
  | 'hn_lucian_run_base'
  | 'Crit2'
  | 'lucian_skin08_idle_in'
  | 'Idle_ReadyOut'
  | 'Run_Haste'
  | 'Spell4_90'
  | 'Spell4_-90'
  | 'Spell3_0'
  | 'Spell3_180'
  | 'Spell3_-180'
  | 'Spell3_90'
  | 'Spell3_-90'
  | 'Dance_Intro'
  | 'Crit1_Fast'
  | 'Crit2_Fast'
  | 'Spell4_180'
  | 'Spell4_-180'
  | 'lucian_skin08_spell2'
  | 'Spell4_Arms'
  | 'Spell4_Idle_0'
  | 'Spell4_Idle_180'
  | 'Spell4_Idle_-180'
  | 'Spell4_Idle_90'
  | 'Spell4_Idle_-90'
  | 'lucian_spell4_arms_2'
  | 'Spell2_0'
  | 'Spell2_180'
  | 'Spell2_-180'
  | 'Spell2_90'
  | 'Spell2_-90'
  | 'lucian_skin08_passive'
  | 'hn_lucian_run_2'
  | 'Run2_In'
  | 'Passive_180'
  | 'Passive_-180'
  | 'Passive_90'
  | 'Passive_-90'
  | 'Buffbones'
  | 'lucian_skin08_passive_crit'
  | 'Passive_Override'
  | 'Spell1'
  | 'lucian_taunt'
  | 'lucian_skin08_idle_base'
  | 'hn_lucian_run_base_2'
  | 'Dance_Loop'
  | 'Recall_Winddown'
  | 'Spell4_0'
  | 'hn_lucian_run_base_in'
  | 'hn_lucian_run_base_in2'
  | 'Taunt_In'
  | 'lucian_skin08_recall'
  | 'lucian_skin08_taunttumbleweed1'
  | 'lucian_skin08_taunttumbleweed2'
  | 'Run_Homeguard'
  | 'lucian_skin08_idle_4'
  | 'hn_lucian_spell_4_in2_neg180'
  | 'hn_lucian_spell_4_in2_neg90'
  | 'hn_lucian_spell_4_in2_90'
  | 'hn_lucian_spell_4_in2'
  | 'hn_lucian_spell_4_in2_180'
  | 'Spell3'
  | 'lucian_skin08_taunttumbleweed3'
  | 'lucian_skin08_laughnew'
  | 'Idle_Ready1'
  | 'Idle_Ready2'
  | 'Idle_Ready3'
  | 'Idle_Out'
  | 'Death_GA'
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
        <primitive object={nodes.Hair1_Grnd} />
        <primitive object={nodes.L_Cloth1_Grnd} />
        <primitive object={nodes.R_Cloth1_Grnd} />
        <primitive object={nodes.LightGun2World} />
        <primitive object={nodes.DarkGun2World} />
        <primitive object={nodes.Buffbone_HealthBar} />
        <primitive object={nodes.Hat2World} />
        <primitive object={nodes.Q_Gun} />
        <primitive object={nodes.Tumbleweed} />
        <primitive object={nodes.Recall1_Elbow} />
        <primitive object={nodes.Recall2_Elbow} />
        <primitive object={nodes.Recall3_Elbow} />
        <primitive object={nodes.Recall4_Elbow} />
        <primitive object={nodes.Grave} />
      </group>
      <group position={[-113.09, -26.03, -100.63]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Lucian_Base_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Q_Gun_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Hands_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Lucian_Skin08_Grave_MAT}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Demon_Form_MAT}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}
