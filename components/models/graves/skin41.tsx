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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Weapon_Base: THREE.Bone
    Coin_Base: THREE.Bone
    Card_Base: THREE.Bone
    Grenade_Base: THREE.Bone
    Recall_Base: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Gun: THREE.MeshBasicMaterial
    Coins: THREE.MeshBasicMaterial
    Card: THREE.MeshBasicMaterial
    Grenade: THREE.MeshBasicMaterial
    Monument: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'Joke'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'run.pie_c_11_15'
  | 'Attack1'
  | 'Spell4_Back'
  | 'Recall'
  | 'Respawn'
  | 'Homeguard'
  | 'Idle_In'
  | 'attack1_wreload.pie_c_11_15'
  | 'attack1_wreload_run.pie_c_11_15'
  | 'Reload'
  | 'reload_run.pie_c_11_15'
  | 'Attack2'
  | 'Spell2_To_Run'
  | 'Spell2_To_Idle'
  | 'Spell4_To_Idle'
  | 'Spell4_To_Run'
  | 'Dance_In'
  | 'Recall_Winddown'
  | 'Audio_Reload'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Weapon_Base} />
        <primitive object={nodes.Coin_Base} />
        <primitive object={nodes.Card_Base} />
        <primitive object={nodes.Grenade_Base} />
        <primitive object={nodes.Recall_Base} />
      </group>
      <group position={[-167.61, -8.37, -109.61]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Gun} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Coins} skeleton={nodes.mesh_0_2.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Card} skeleton={nodes.mesh_0_3.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Grenade}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Monument}
          skeleton={nodes.mesh_0_5.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
