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
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    Root: THREE.Bone
    Orb_Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Bow: THREE.Bone
    Snow_Root: THREE.Bone
    Fox_Root: THREE.Bone
  }
  materials: {
    Ahri_Body_MAT: THREE.MeshBasicMaterial
    VFX_Sleeves_MAT: THREE.MeshBasicMaterial
    Ahri_Tails_MAT: THREE.MeshBasicMaterial
    Ahri_Tail_MAT: THREE.MeshBasicMaterial
    MidForm_MAT: THREE.MeshBasicMaterial
    Snow_MAT: THREE.MeshBasicMaterial
    Fox_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Channel_Loop'
  | 'Channel_In'
  | 'Crit'
  | 'Death'
  | 'Joke'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Dance'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_0'
  | 'Turn_L180'
  | 'Turn_R180'
  | 'Recall'
  | 'Run_Base'
  | 'spell3_0.pie_c_legacy_bugs_2021'
  | 'spell3_180.pie_c_10_16'
  | 'spell3_-180.pie_c_10_16'
  | 'Spell3_to_Run_90'
  | 'Spell3_to_Run_-90'
  | 'Spell3_To_Idle'
  | 'Spell1_To_Idle'
  | 'spell1_to_run_0.pie_c_legacy_bugs_11_2'
  | 'attack2_to_run.pie_c_10_16'
  | 'attack1_to_run.pie_c_10_16'
  | 'Spell1_to_Run_90'
  | 'Spell1_To_Run_-90'
  | 'Run_Haste_In'
  | 'Run_Haste'
  | 'ahri_skin27_idle_in.pie_c_10_16'
  | 'Spell2_Into_Idle'
  | 'Spell2_Into_Run'
  | 'Attack2_To_Idle'
  | 'Attack1'
  | 'Spell4_To_Run'
  | 'Attack1_To_Idle'
  | 'ahri_skin27_homeguard.pie_c_10_16'
  | 'Respawn'
  | 'ahri_skin27_homeguard_idle.pie_c_legacy_bugs_11_3'
  | 'ahri_skin27_homeguard_idle_2.pie_c_10_16'
  | 'Idle_IN_homeguard'
  | 'ahri_skin27_homeguard_into_run.pie_c_10_16'
  | 'Idle_Base'
  | 'Recall_Winddown'
  | 'ahri_skin27_run_into_homeguard_run.pie_c_10_16'
  | 'ahri_skin27_idle_into_homeguard_idle.pie_c_10_16'
  | 'ahri_skin27_homeguard_idle_into_idle.pie_c_10_16'
  | 'Idle2'
  | 'Spell4_To_Idle'
  | 'Idle3'
  | 'ahri_skin27_idle_in_2.pie_c_10_16'
  | 'Run_In'
  | 'ahri_skin27_run_variant01.pie_c_10_16'
  | 'ahri_skin27_run_variant02.pie_c_10_16'
  | 'idle4a.pie_c_10_16'
  | 'idle4b.pie_c_10_16'
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
        <primitive object={nodes.Orb_Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Bow} />
        <primitive object={nodes.Snow_Root} />
        <primitive object={nodes.Fox_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ahri_Body_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.VFX_Sleeves_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Ahri_Tails_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Ahri_Tail_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.MidForm_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Snow_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Fox_MAT}
        skeleton={nodes.mesh_0_6.skeleton}
      />
    </group>
  )
}
