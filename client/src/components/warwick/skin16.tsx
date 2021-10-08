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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar1: THREE.Bone
    Drone1: THREE.Bone
    Drone2: THREE.Bone
    Drone3: THREE.Bone
  }
  materials: {
    Warwick_Skin16_MD_Warwick_Skin16_MAT: THREE.MeshBasicMaterial
    Warwick_Skin16_MD_Warwick_Skin16_HumanHead_MAT: THREE.MeshBasicMaterial
    Warwick_Skin16_WolfHeadMesh_MAT: THREE.MeshBasicMaterial
    Warwick_Tongue_MAT: THREE.MeshBasicMaterial
    Warwick_Skin16_MD_MoveablePlates_MAT: THREE.MeshBasicMaterial
    Warwick_Skin16_MD_StaticPlates_MAT: THREE.MeshBasicMaterial
    Warwick_Skin16_Drones_MAT: THREE.MeshBasicMaterial
    Warwick_Skin16_FingerFresnel1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Channel'
  | 'Crit'
  | 'Death'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt'
  | 'Attack1Fast'
  | 'warwick_attackfast1'
  | 'warwick_attack1'
  | 'Attack2Fast'
  | 'warwick_attackfast2'
  | 'warwick_attack2'
  | 'Attack3Fast'
  | 'warwick_attackfast3'
  | 'warwick_attack3'
  | 'Attack4Fast'
  | 'warwick_attackfast4'
  | 'warwick_attack4'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Idle1_Base'
  | 'warwick_idle_v1'
  | 'Joke'
  | 'Recall'
  | 'Recall_Winddown'
  | 'warwick_runarmsback_to_runquad'
  | 'warwick_run_armsback'
  | 'warwick_runhunt'
  | 'RunHUnt_To_Idle'
  | 'RunStart'
  | 'Run_Base'
  | 'Run_Haste'
  | 'Run_To_Idle'
  | 'Run_Var1'
  | 'Run_Var2'
  | 'Respawn'
  | 'warwick_spell1_turn'
  | 'Spell1_Release'
  | 'Spell1_Turn'
  | 'warwick_spell2miss'
  | 'Spell2Miss_Run'
  | 'Spell2_To_Idle'
  | 'Spell2_To_RunHunt'
  | 'warwick_spell3_howl'
  | 'Spell3_Howl_Run'
  | 'Spell3_Idle'
  | 'Spell3_Run'
  | 'Spell4Dash'
  | 'Spell4Hit'
  | 'Spell4Miss'
  | 'Spell4Miss_to_Idle'
  | 'TurnHunt_-180'
  | 'TurnHunt_-90'
  | 'TurnHunt_0'
  | 'TurnHunt_180'
  | 'TurnHunt_90'
  | 'Turn_-180'
  | 'Turn_-90'
  | 'Turn_0'
  | 'Turn_180'
  | 'Turn_90'
  | 'Channel_In'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar1} />
        <primitive object={nodes.Drone1} />
        <primitive object={nodes.Drone2} />
        <primitive object={nodes.Drone3} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Warwick_Skin16_MD_Warwick_Skin16_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Warwick_Skin16_MD_Warwick_Skin16_HumanHead_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Warwick_Skin16_WolfHeadMesh_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Warwick_Tongue_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Warwick_Skin16_MD_MoveablePlates_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Warwick_Skin16_MD_StaticPlates_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Warwick_Skin16_Drones_MAT}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Warwick_Skin16_FingerFresnel1}
        skeleton={nodes.mesh_0_7.skeleton}
      />
    </group>
  )
}
