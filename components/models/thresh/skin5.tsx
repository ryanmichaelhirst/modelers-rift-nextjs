import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Cstm_Lantern_Ground: THREE.Bone
    Mini_Root: THREE.Bone
  }
  materials: {
    ThreshHeadTentacles: THREE.MeshBasicMaterial
    SRU_Gromp_mini_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle1_Base'
  | 'Run_Haste'
  | 'thresh_skin05_attack1_mid'
  | 'thresh_skin05_attack1_short'
  | 'Channel'
  | 'Crit'
  | 'Dance_Windup'
  | 'Idle2_Base'
  | 'Joke'
  | 'thresh_skin05_laugh'
  | 'thresh_skin05_spell4'
  | 'Taunt_Base'
  | 'thresh_skin05_idle1'
  | 'Respawn'
  | 'thresh_skin05_attack1_long'
  | 'thresh_skin05_spell2'
  | 'Spell3_P0'
  | 'thresh_skin05_spell3'
  | 'thresh_skin05_spell1_pull1'
  | 'thresh_skin05_spell1_in'
  | 'Spell1_Grab'
  | 'thresh_skin05_spell1_pull2'
  | 'thresh_skin05_spell1_out'
  | 'Run_Haste_In'
  | 'thresh_skin05_spell1_dash'
  | 'Attack1_Long_P90'
  | 'Attack1_Long_P-90'
  | 'Attack1_Long_P180'
  | 'Attack1_Long_P-180'
  | 'Run_Base'
  | 'Run_In'
  | 'Run_Fast'
  | 'Run_Fast_In'
  | 'Lantern_Open'
  | 'thresh_skin05_taunt'
  | 'Dance_Loop'
  | 'thresh_skin05_spell3_p-90'
  | 'Spell3_P90'
  | 'Spell3_P180'
  | 'thresh_skin05_spell3_p-180'
  | 'Lantern_Null'
  | 'thresh_skin05_spell1_pull2null'
  | 'thresh_skin05_attack2_mid'
  | 'thresh_skin05_attack2_short'
  | 'Turn_L90'
  | 'Turn_L180'
  | 'Turn_R90'
  | 'Turn_R180'
  | 'Turn_0'
  | 'thresh_skin05_run_variant1'
  | 'Idle_In'
  | 'Spell1_Pull1_P-90'
  | 'Spell1_Pull1_P90'
  | 'thresh_skin05_spell1_pull1_p90'
  | 'thresh_skin05_spell1_pull1_p-90'
  | 'Spell1_Pull2_P-90'
  | 'Spell1_Pull2_P90'
  | 'Spell2_P90'
  | 'Spell2_P-90'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'Run_Homeguard_toRun'
  | 'Idle_IN_homeguard'
  | 'Spell3_P-30'
  | 'Spell3_P30'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Lantern_Ground} />
        <primitive object={nodes.Mini_Root} />
      </group>
      <group position={[-78.16, -36, -116.72]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.ThreshHeadTentacles}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.SRU_Gromp_mini_mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
