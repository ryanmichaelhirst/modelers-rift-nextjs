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
    Snap_Weapon2World: THREE.Bone
    True_World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    L_Cape1_Ground: THREE.Bone
    C_Scroll1: THREE.Bone
    R_Cape1_Ground: THREE.Bone
    SandWraith_Recall_Throne: THREE.Bone
    SandWraith_Recall_Crown: THREE.Bone
    SandWraith_Recall_UrnLarge: THREE.Bone
    SandWraith_Recall_UrnSmall: THREE.Bone
    SandWraith_Recall_Sceptre: THREE.Bone
  }
  materials: {
    Pyke_Skin01_Mat: THREE.MeshBasicMaterial
    Pyke_Skin01_Recall_Mat: THREE.MeshBasicMaterial
    Pyke_Skin01_Scroll_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Laugh'
  | 'Run_Base'
  | 'Run_Fast'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Idle_In'
  | 'Spell2_Move'
  | 'Spell2_Idle'
  | 'pyke_spell2_exit2move'
  | 'Spell1_Long_NoMove'
  | 'Spell1_Long_Move'
  | 'Spell1_Short_Hit'
  | 'Spell1_Long_Hit'
  | 'Spell1_Short_Hit_ToRun'
  | 'pyke_spell4_hit'
  | 'Spell1_Long_Hook_ToRun'
  | 'Spell1_Short_Hit_ToIdle'
  | 'Spell1_Long_Hook_ToIdle'
  | 'Spell1_Long_Hook_Move'
  | 'pyke_spell1_long_hook'
  | 'Run_In'
  | 'Spell4_ToRun'
  | 'Run_Haste'
  | 'Spell4_Hit_ToRun'
  | 'Spell4_ToIdle'
  | 'Spell4_Hit_ToIdle'
  | 'Spell4_Hit_Move'
  | 'pyke_skin01_recall'
  | 'Spell3_Move'
  | 'Spell3_Hit'
  | 'Spell3_Hit_ToRun'
  | 'Spell3_Idle'
  | 'pyke_spell2_exit2idle'
  | 'Respawn'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Spell3_hit_toIdle'
  | 'Recall_Winddown'
  | 'Spell1_Long_Hit_ToIdle'
  | 'Spell1_Long_NoMove_ToIdle'
  | 'Spell1_Long_Move_ToRun'
  | 'Spell2_Move2Idle'
  | 'Spell2_Exit2Spell1'
  | 'Spell1_Long_Hook_Move_ToRun'
  | 'Spell1_Long_Hit_ToRun'
  | 'Promo_Walk'
  | 'pyke_promo_dialog'
  | 'Run_Slow'
  | 'Taunt_Base'
  | 'Taunt_loop'
  | 'Joke'
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
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.L_Cape1_Ground} />
        <primitive object={nodes.C_Scroll1} />
        <primitive object={nodes.R_Cape1_Ground} />
        <primitive object={nodes.SandWraith_Recall_Throne} />
        <primitive object={nodes.SandWraith_Recall_Crown} />
        <primitive object={nodes.SandWraith_Recall_UrnLarge} />
        <primitive object={nodes.SandWraith_Recall_UrnSmall} />
        <primitive object={nodes.SandWraith_Recall_Sceptre} />
      </group>
      <group position={[-117.57, -4.44, -122.22]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Pyke_Skin01_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Pyke_Skin01_Recall_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Pyke_Skin01_Scroll_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
