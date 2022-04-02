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
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Passive_Trail: THREE.Bone
    C_Surfboard: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Taliyah_Skin03_MAT: THREE.MeshBasicMaterial
    SurfStone_MAT: THREE.MeshBasicMaterial
    TauntRock_MAT: THREE.MeshBasicMaterial
    Crab: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'taliyah_idle1_in'
  | 'Idle1_Base'
  | 'Joke'
  | 'Laugh'
  | 'Recall'
  | 'Run_Base'
  | 'taliyah_spell1_exhaust'
  | 'Spell3_Base'
  | 'Taunt'
  | 'Death'
  | 'Crit'
  | 'Attack1'
  | 'Attack2'
  | 'Spell1_0'
  | 'Spell1_180'
  | 'Spell1_-180'
  | 'Spell1_90'
  | 'Spell1_-90'
  | 'Spell2_Cast'
  | 'Spell2_Moving_0'
  | 'Spell2_Moving_180'
  | 'Spell2_Moving_-180'
  | 'Spell2_Moving_90'
  | 'Spell2_Moving_-90'
  | 'Spell2_0'
  | 'Spell2_180'
  | 'Spell2_-180'
  | 'Spell2_90'
  | 'Spell2_-90'
  | 'Spell4'
  | 'Dance_Loop'
  | 'Dance_Start'
  | 'Run_Passive_Transition'
  | 'Idle1_Var1'
  | 'Run_Injured'
  | 'taliyah_run_passive'
  | 'Turn90'
  | 'Turn-90'
  | 'Spell4_Run'
  | 'Spell4_To_Run'
  | 'Spell4_GroundRun'
  | 'Spell4_To_Idle'
  | 'Spell4_KnockOff'
  | 'Run_Passive_BuildUp'
  | 'taliyah_spell4_jumpoff_run'
  | 'Idle_Passive'
  | 'Run_Passive_Alt1'
  | 'Spell4_GroundRun_R'
  | 'Recall_Winddown'
  | 'Spell3_Upper'
  | 'Transition_To_Idle'
  | 'PassRun_To_PassIdle'
  | 'Run_Haste'
  | 'Respawn'
  | 'Spell1_Exhaust_Moving'
  | 'Run_Passive_Break1'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Passive_Trail} />
        <primitive object={nodes.C_Surfboard} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <group position={[-101.94, -46.96, -66.92]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Taliyah_Skin03_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.SurfStone_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.TauntRock_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Crab}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
