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
    mesh_0_6: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    L_Shoulder_Rope: THREE.Bone
    Weapon: THREE.Bone
    Gun_Eyeball: THREE.Bone
    Cup_Base: THREE.Bone
    Book_Base: THREE.Bone
    Spoon: THREE.Bone
    Plate: THREE.Bone
    Trap_Root: THREE.Bone
    Destroyed_01: THREE.Bone
    Destroyed_02: THREE.Bone
    Destroyed_03: THREE.Bone
    Stage: THREE.Bone
  }
  materials: {
    Body_Mat: THREE.MeshBasicMaterial
    Gun_Mat: THREE.MeshBasicMaterial
    Gun_T3_Mat: THREE.MeshBasicMaterial
    Props_Mat: THREE.MeshBasicMaterial
    Spells_Mat: THREE.MeshBasicMaterial
    Target_01_Mat: THREE.MeshBasicMaterial
    Center_Stage_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit_Base'
  | 'Death'
  | 'Idle_In'
  | 'Idle1'
  | 'Joke'
  | 'Laugh'
  | 'Passive'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell3B'
  | 'Spell4'
  | 'Taunt'
  | 'heelie.pie_c_11_6'
  | 't2_open.pie_c_11_6'
  | 't3_open.pie_c_11_6'
  | 'Spell1_ToRun'
  | 'Spell3_ToRun'
  | 'Run_In'
  | 'hg_variant.pie_c_11_6'
  | 'hg_into_idle.pie_c_11_6'
  | 'idle_into_hg.pie_c_11_6'
  | 'run_base.pie_c_11_6'
  | 'hg_into_run.pie_c_11_6'
  | 'Spell4_To_Run'
  | 'Run_Variant'
  | 'Crit_Fast'
  | 'Spell1_ToIdle'
  | 'idlein_standing.pie_c_11_6'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Idle2'
  | 'upgrade.pie_c_11_6'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.L_Shoulder_Rope} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Gun_Eyeball} />
        <primitive object={nodes.Cup_Base} />
        <primitive object={nodes.Book_Base} />
        <primitive object={nodes.Spoon} />
        <primitive object={nodes.Plate} />
        <primitive object={nodes.Trap_Root} />
        <primitive object={nodes.Destroyed_01} />
        <primitive object={nodes.Destroyed_02} />
        <primitive object={nodes.Destroyed_03} />
        <primitive object={nodes.Stage} />
      </group>
      <group position={[-116.82, -70.87, -113.11]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body_Mat} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Gun_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Gun_T3_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Props_Mat}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Spells_Mat}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Target_01_Mat}
          skeleton={nodes.mesh_0_5.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_6.geometry}
          material={materials.Center_Stage_Mat}
          skeleton={nodes.mesh_0_6.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
