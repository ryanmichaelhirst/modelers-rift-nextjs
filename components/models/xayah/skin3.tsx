import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_FX_Loc: THREE.Bone
    Wing4_Ground: THREE.Bone
    Wing_A3_Ground: THREE.Bone
    Wing_B3_Ground: THREE.Bone
    Summoners_Cup: THREE.Bone
    Fan_Base: THREE.Bone
    Rakan_Flower1: THREE.Bone
    Palanquin: THREE.Bone
  }
  materials: {
    Xayah_Skin03_MAT: THREE.MeshBasicMaterial
    Xayah_Skin03_Wing_MAT: THREE.MeshBasicMaterial
    Skin03_Duo_Recall_MAT: THREE.MeshBasicMaterial
    Xayah_Skin03_Recall_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Dance_Loop'
  | 'Duo_Recall'
  | 'Duo_Recall_Unto'
  | 'Duo_Recall_Ready'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'IdleIn'
  | 'Run_Haste'
  | 'Spell4_2Idle'
  | 'Spell4_2run'
  | 'Spell4_2run_Fast'
  | 'Spell4_Lft180'
  | 'Spell4_Lft90'
  | 'Spell4_Rgt180'
  | 'Spell4_Rgt90'
  | 'xayah_duo_dance_loop'
  | 'xayah_duo_dance_into'
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Crit1'
  | 'Crit2'
  | 'Dance_Base'
  | 'Death'
  | 'Idle_ToRun'
  | 'Idlein_Torun'
  | 'IdleIn_toRun_Fast'
  | 'Joke'
  | 'Laugh'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Base'
  | 'Run_Fast'
  | 'Run_Slow'
  | 'Spell1'
  | 'Spell1_2Idle'
  | 'Spell1_2Run'
  | 'Spell1_2runfast'
  | 'Spell2'
  | 'Spell2_To_Idle'
  | 'Spell2_To_RunBase'
  | 'Spell2_To_RunFast'
  | 'Spell3'
  | 'Spell3_2idle'
  | 'Spell3_2run'
  | 'Spell3_2runfast'
  | 'Spell4_Base'
  | 'Taunt'
  | 'xayah_wingturn'
  | 'xayah_wingturn_lft'
  | 'xayah_wingturn_rgt'
  | 'Wingturn_Lft_Small'
  | 'Wingturn_Rgt_Small'
  | 'Attack_W1'
  | 'Attack_W2'
  | 'Attack_W3'
  | 'Attack_W4'
  | 'xayah_skin03_duo_recall'
  | 'xayah_skin03_duo_recall_into'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_FX_Loc} />
        <primitive object={nodes.Wing4_Ground} />
        <primitive object={nodes.Wing_A3_Ground} />
        <primitive object={nodes.Wing_B3_Ground} />
        <primitive object={nodes.Summoners_Cup} />
        <primitive object={nodes.Fan_Base} />
        <primitive object={nodes.Rakan_Flower1} />
        <primitive object={nodes.Palanquin} />
      </group>
      <group position={[-176.31, -157.01, -91.36]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Xayah_Skin03_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Xayah_Skin03_Wing_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Skin03_Duo_Recall_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Xayah_Skin03_Recall_MAT}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
