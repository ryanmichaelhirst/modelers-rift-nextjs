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
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Butterfly_Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Recall_Scroll01: THREE.Bone
    Recall_Root: THREE.Bone
    Recall_Rabbit_World: THREE.Bone
    Recall_Bird_World: THREE.Bone
    Recall_Fish_World: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Butterfly: THREE.MeshBasicMaterial
    Recall_Scroll: THREE.MeshBasicMaterial
    Recall_Rabbit: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2_Run'
  | 'Spell4'
  | 'Idlein_Animal'
  | 'Idle1_Base'
  | 'Run_Variation'
  | 'Passive_Attack'
  | 'Spell1_ToIdle'
  | 'neeko_idlein_toidle1'
  | 'Spell3_ToIdle'
  | 'Spell4_ToIdle'
  | 'Spell4_ToRun'
  | 'JG_Run_0'
  | 'JG_Run_90'
  | 'JG_Run_-90'
  | 'neeko_jg_run_0'
  | 'Spell2_ToRun'
  | 'neeko_jg_run_180'
  | 'neeko_jg_run_-180'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Laugh'
  | 'Taunt'
  | 'Idle2_Base'
  | 'neeko_idle3'
  | 'Recall'
  | 'Run_Slow'
  | 'Spell3_0'
  | 'Spell3_90'
  | 'Spell3_180'
  | 'Spell3_-90'
  | 'Spell3_-180'
  | 'Spell1_ToRun'
  | 'Run_Haste'
  | 'Recall_Winddown'
  | 'Respawn'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Butterfly_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Recall_Scroll01} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.Recall_Rabbit_World} />
        <primitive object={nodes.Recall_Bird_World} />
        <primitive object={nodes.Recall_Fish_World} />
      </group>
      <group position={[-239.65, -0.17, -255.18]} scale={0.03}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Butterfly}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Recall_Scroll}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Recall_Rabbit}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
