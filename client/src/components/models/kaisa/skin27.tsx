import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
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
    Root: THREE.Bone
    Mini_Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    True_World: THREE.Bone
    Platform: THREE.Bone
    Flower1: THREE.Bone
    Flower2: THREE.Bone
    Chair2: THREE.Bone
    Chair1: THREE.Bone
  }
  materials: {
    Pistols: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Stage: THREE.MeshBasicMaterial
    Props: THREE.MeshBasicMaterial
    Frog: THREE.MeshBasicMaterial
    VoidFrog: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1_-180'
  | 'Attack1_-90'
  | 'Attack1_0'
  | 'Attack1_180'
  | 'Attack1_90'
  | 'Attack2_-180'
  | 'Attack2_-90'
  | 'Attack2_0'
  | 'Attack2_180'
  | 'Attack2_90'
  | 'Attack3_-180'
  | 'Attack3_-90'
  | 'Attack3_0'
  | 'Attack3_180'
  | 'Attack3_90'
  | 'kaisa_e_warpattack01'
  | 'kaisa_e_warpattack02'
  | 'kaisa_e_warpattack03'
  | 'kaisa_e_warpattack04'
  | 'kaisa_e_warpattack05'
  | 'kaisa_passivefinisher01'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance_Loop'
  | 'Dash_To_RunE'
  | 'Death'
  | 'kaisa_run_e_base03'
  | 'kaisa_dash_to_run01'
  | 'kaisa_run_to_e'
  | 'kaisa_idle_e'
  | 'E_Idle_in'
  | 'kaisa_idle_e_to_idle01'
  | 'kaisa_e_passivefinisher01'
  | 'kaisa_run_e'
  | 'E_Run_to_Run01'
  | 'E_WarpToIdle'
  | 'kaisa_helmet'
  | 'HasteToRun'
  | 'Idle1_Base'
  | 'Idle1_Var1'
  | 'Idle1_Var2'
  | 'Idle1_Var3'
  | 'Idle_In2'
  | 'Idle_to_E'
  | 'kaisa_joke01'
  | 'kaisa_laugh'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'kaisa_run1_in'
  | 'Run_Base'
  | 'Run_Fast'
  | 'Run_Fast_In'
  | 'Run_Haste'
  | 'kaisa_runhaste01'
  | 'Run_Slow'
  | 'kaisa_spell1'
  | 'Spell1_Upper'
  | 'Spell1_To_Idle'
  | 'Spell2_-90'
  | 'Spell2_0'
  | 'Spell2_90'
  | 'kaisa_spell2'
  | 'Spell2_ToIdle'
  | 'Spell4'
  | 'Spell4_Out'
  | 'Spell4_Ready_In'
  | 'Spell4_Ready_Loop'
  | 'Spell4_Ready_Var'
  | 'Spell4_In'
  | 'Taunt'
  | 'Turn_0'
  | 'Turn_L'
  | 'Turn_R'
  | 'kaisa_idle_in'
  | 'Evolve'
  | 'Evolve_Into_Idle'
  | 'Spawn'
  | 'Dance_Intro'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Mini_Root} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Platform} />
        <primitive object={nodes.Flower1} />
        <primitive object={nodes.Flower2} />
        <primitive object={nodes.Chair2} />
        <primitive object={nodes.Chair1} />
      </group>
      <group position={[-106.09, -0.93, -108.39]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Pistols} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Body} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Stage} skeleton={nodes.mesh_0_2.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Props} skeleton={nodes.mesh_0_3.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Frog} skeleton={nodes.mesh_0_4.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.VoidFrog}
          skeleton={nodes.mesh_0_5.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
