import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap2World_Star2: THREE.Bone
    Snap2World_Star1: THREE.Bone
  }
  materials: {
    AurelionSol_Skin01_MD_blinn2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'aurelionsol_attack2'
  | 'Turn_0'
  | 'aurelionsol_turn_lft45_add'
  | 'aurelionsol_turn_rgt45_add'
  | 'aurelionsol_turn_lft90_add'
  | 'aurelionsol_turn_rgt90_add'
  | 'Spell4'
  | 'aurelionsol_attack1'
  | 'Spell2_Rgt90'
  | 'Spell2_Lft90'
  | 'Idle1_Base'
  | 'IdleIn'
  | 'Run1A'
  | 'Run1B'
  | 'Run1C'
  | 'Run1D'
  | 'Idlein2'
  | 'Death'
  | 'Spell1'
  | 'Spell3'
  | 'Spell1_2Run'
  | 'Recall'
  | 'Taunt'
  | 'Joke_Loop'
  | 'Spell1_2Idle'
  | 'RunIn'
  | 'Idle2_Base'
  | 'Spell2_Rgt90_2run'
  | 'Spell2_Lft90_2run'
  | 'Spell4_2Idle'
  | 'aurelionsol_runspin'
  | 'aurelionsol_runspin2'
  | 'Respawn'
  | 'JokeIn'
  | 'Laugh'
  | 'Channel'
  | 'Channel_Wndup'
  | 'DanceIn'
  | 'DanceLoop'
  | 'Recall_Winddown'
  | 'Spell3_Run'
  | 'Run2A'
  | 'Run2B'
  | 'Run2C'
  | 'Run2D'
  | 'Run2E'
  | 'Run2F'
  | 'Run2G'
  | 'Run2H'
  | 'Run_Hastea'
  | 'Run_Hasteb'
  | 'Run_Hastec'
  | 'Run_Hasted'
  | 'Spell4_ToRun'
  | 'Spell2_Lft90_2RunHaste'
  | 'Spell2_Rgt90_2RunHaste'
  | 'aurelionsol_hasterunin'
  | 'Spell1_2RuHaste'
  | 'aurelionsol_runa_torunhasteb'
  | 'Run_ToRunHaste'
  | 'aurelionsol_idle1'
  | 'aurelionsol_spell1_inflight'
  | 'Spell2_Lft90_2Idle'
  | 'Spell2_Rgt90_2Idle'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snap2World_Star2} />
        <primitive object={nodes.Snap2World_Star1} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.AurelionSol_Skin01_MD_blinn2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-117.59, -44.83, -451.81]}
        scale={0.04}
      />
    </group>
  )
}, areEqual)

export default Model
