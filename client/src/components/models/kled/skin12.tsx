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
    Snap_Gun2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Mount_Root: THREE.Bone
    Recall_Mini_Root: THREE.Bone
    Buffbone_Glb_Healthbar_Loc: THREE.Bone
  }
  materials: {
    Kled: THREE.MeshBasicMaterial
    Skaarl: THREE.MeshBasicMaterial
    Wheel: THREE.MeshBasicMaterial
    Frog: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'Run_Base'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Joke_Into'
  | 'Run_Fast'
  | 'Taunt'
  | 'Attack1'
  | 'Run0_to_1'
  | 'Run0_In'
  | 'Idle0'
  | 'Idle_In'
  | 'Idle2'
  | 'Idle3'
  | 'Spell2_1'
  | 'Spell2_2'
  | 'Spell2_3'
  | 'Attack2'
  | 'Dance_Start'
  | 'Dance_Loop'
  | 'kled_run0_lookat_l60'
  | 'kled_run0_lookat_r60'
  | 'kled_run0_lookat_0'
  | 'Spell3_To_Run'
  | 'Spell3'
  | 'kled_spell2'
  | 'Spell1'
  | 'Spell2_To_Idle'
  | 'Attack3'
  | 'Recall'
  | 'Laugh'
  | 'Run1_to_0'
  | 'kled_spell4'
  | 'Run_Injured'
  | 'Spell4_Into'
  | 'Spell4_OutAttack'
  | 'Spell4_To_Run0'
  | 'Spell1_To_Run'
  | 'Spell4_Cycle_to_Run0'
  | 'Mount_On_To_Run'
  | 'RunHaste'
  | 'Spell1_2'
  | 'Crit'
  | 'Spell1_To_Idle'
  | 'Run_Celebrate'
  | 'Joke_Loop'
  | 'Joke_2_Into'
  | 'Joke_2_Loop'
  | 'Recall_Winddown'
  | 'Turn90'
  | 'Turn-90'
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
        <primitive object={nodes.Snap_Gun2World} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Mount_Root} />
        <primitive object={nodes.Recall_Mini_Root} />
        <primitive object={nodes.Buffbone_Glb_Healthbar_Loc} />
      </group>
      <group position={[-56.72, -16.29, -132.41]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Kled} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Skaarl}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Wheel} skeleton={nodes.mesh_0_2.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Frog} skeleton={nodes.mesh_0_3.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
