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
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    Weapon1: THREE.Bone
    Root: THREE.Bone
    DragonTech_Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Bird_Root: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Weapon: THREE.MeshBasicMaterial
    Main: THREE.MeshBasicMaterial
    Smear: THREE.MeshBasicMaterial
    Bird: THREE.MeshBasicMaterial
    Leaves: THREE.MeshBasicMaterial
    BurntTree: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance_In'
  | 'Death'
  | 'Idle_In1'
  | 'Idle1_Base'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Laugh_In'
  | 'Recall'
  | 'Spell2'
  | 'Spell4'
  | 'Run_In'
  | 'lillia_run2_0.lillia'
  | 'lillia_run2_-90.lillia'
  | 'lillia_run2_90.lillia'
  | 'Idle2_Base'
  | 'Turn_0'
  | 'Turn_L'
  | 'Turn_R'
  | 'lillia_run_passive.lillia'
  | 'lillia_run_passive_full.lillia'
  | 'Spell1'
  | 'lillia_run_passive_torun.lillia'
  | 'lillia_run2_30.lillia'
  | 'lillia_run2_-30.lillia'
  | 'lillia_run_passive_90.lillia'
  | 'lillia_run_passive_-90.lillia'
  | 'Spell3_0'
  | 'Spell3_ToRun'
  | 'Spell3_ToIdle'
  | 'Spell4_ToIdle'
  | 'lillia_spell2_close.lillia'
  | 'spell3_close.pie_c_11_19'
  | 'Spell1_ToRun'
  | 'attack1.pie_c_11_19'
  | 'attack1_run.pie_c_11_19'
  | 'attack1_run_90.pie_c_11_19'
  | 'attack1_-180.pie_c_11_19'
  | 'attack1_180.pie_c_11_19'
  | 'attack1_run_-90.pie_c_11_19'
  | 'lillia_attack1_short.lillia'
  | 'lillia_attack1_short_run.lillia'
  | 'lillia_attack1_short_180.lillia'
  | 'lillia_attack1_short_run_90.lillia'
  | 'lillia_attack1_short_run_-90.lillia'
  | 'lillia_attack1_short_-180.lillia'
  | 'spell3_close_-90.pie_c_11_19'
  | 'spell3_close_90.pie_c_11_19'
  | 'Spell3_-90'
  | 'Spell3_90'
  | 'lillia_run_passive_180.lillia'
  | 'lillia_run_passive_-180.lillia'
  | 'lillia_run_passive_out.lillia'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Dance_Loop'
  | 'Laugh_Loop'
  | 'Taunt'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'Idle_In2'
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
        <primitive object={nodes.Weapon1} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.DragonTech_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Bird_Root} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <group position={[-160.04, -1.58, -142.16]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Weapon}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Main}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Smear}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Bird}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Leaves}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.BurntTree}
          skeleton={nodes.mesh_0_5.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
