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
    DragonTech_Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Spawn_Loc: THREE.Bone
    Cliff: THREE.Bone
  }
  materials: {
    EyeDefault: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Wings: THREE.MeshBasicMaterial
    Cliff: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'pegasus_idle.littlelegends_10_10'
  | 'pegasus_tauntintro.littlelegends_10_10'
  | 'Celebrate'
  | 'Run_To_Idle'
  | 'Interact'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'pegasus_damaged.littlelegends_10_10'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'Idle_To_Run'
  | 'pegasus_idle2.littlelegends_10_10'
  | 'pegasus_idle3.littlelegends_10_10'
  | 'Taunt_loop'
  | 'pegasus_idle_to_runfast.littlelegends_10_10'
  | 'pegasus_jokea.littlelegends_10_10'
  | 'pegasus_jokeb.littlelegends_10_10'
  | 'pegasus_jokec.littlelegends_10_10'
  | 'Celebrate_to_Idle'
  | 'pegasus_cast_to_idle.littlelegends_10_10'
  | 'pegasus_greeting_to_idle.littlelegends_10_10'
  | 'pegasus_diveout_to_idle.littlelegends_10_10'
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
        <primitive object={nodes.DragonTech_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Spawn_Loc} />
        <primitive object={nodes.Cliff} />
      </group>
      <group position={[-69.98, -38.7, -110.58]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.EyeDefault}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Body} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Wings} skeleton={nodes.mesh_0_2.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Cliff} skeleton={nodes.mesh_0_3.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
