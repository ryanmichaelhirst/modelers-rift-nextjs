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
    Snap_Weapon2World: THREE.Bone
    True_World: THREE.Bone
    L_Cape1_Ground: THREE.Bone
    C_Scroll1: THREE.Bone
    R_Cape1_Ground: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Cstm_Nensi_Head: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    SandWraith_Recall_Throne: THREE.Bone
    Spheres_Base: THREE.Bone
  }
  materials: {
    Pyke_Base_Mat: THREE.MeshBasicMaterial
    Pyke_Base_Scroll_Mat: THREE.MeshBasicMaterial
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
  | 'Spell3_Move'
  | 'Spell3_Hit'
  | 'Spell3_Hit_ToRun'
  | 'Spell3_Idle'
  | 'pyke_spell2_exit2idle'
  | 'Respawn'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Spell3_hit_toIdle'
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
  | 'Recall'
  | 'Recall_Winddown'
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
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.L_Cape1_Ground} />
        <primitive object={nodes.C_Scroll1} />
        <primitive object={nodes.R_Cape1_Ground} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Cstm_Nensi_Head} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.SandWraith_Recall_Throne} />
        <primitive object={nodes.Spheres_Base} />
      </group>
      <group position={[-114.27, -5.63, -107.84]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Pyke_Base_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Pyke_Base_Scroll_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
