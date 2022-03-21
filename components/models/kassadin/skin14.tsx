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
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    R_Pipe4_SKN: THREE.Bone
    R_Pipe3_SKN: THREE.Bone
    R_Pipe2_SKN: THREE.Bone
    L_Pipe4_SKN: THREE.Bone
    L_Pipe3_SKN: THREE.Bone
    L_Pipe2_SKN: THREE.Bone
    C_Buffbone_Glb_Healthbar_Loc: THREE.Bone
    R_Pipe_PV_Ctrl: THREE.Bone
    L_Pipe_PV_Ctrl: THREE.Bone
    BUFFBONE_GLB_VFX_LOC1: THREE.Bone
    BUFFBONE_GLB_VFX_LOC2: THREE.Bone
    BUFFBONE_GLB_VFX_LOC3: THREE.Bone
    BUFFBONE_GLB_VFX_LOC4: THREE.Bone
    BUFFBONE_GLB_VFX_LOC5: THREE.Bone
    BUFFBONE_GLB_VFX_LOC6: THREE.Bone
    BUFFBONE_GLB_VFX_LOC7: THREE.Bone
    BUFFBONE_GLB_VFX_LOC8: THREE.Bone
    weaponBase: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    RecallWeapon: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Channel_In'
  | 'Spell2'
  | 'Idle_In'
  | 'Run_In'
  | 'Spell4_To_Idle'
  | 'Spell4_To_Run'
  | 'kassadin_run_haste'
  | 'Respawn'
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
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.R_Pipe4_SKN} />
        <primitive object={nodes.R_Pipe3_SKN} />
        <primitive object={nodes.R_Pipe2_SKN} />
        <primitive object={nodes.L_Pipe4_SKN} />
        <primitive object={nodes.L_Pipe3_SKN} />
        <primitive object={nodes.L_Pipe2_SKN} />
        <primitive object={nodes.C_Buffbone_Glb_Healthbar_Loc} />
        <primitive object={nodes.R_Pipe_PV_Ctrl} />
        <primitive object={nodes.L_Pipe_PV_Ctrl} />
        <primitive object={nodes.BUFFBONE_GLB_VFX_LOC1} />
        <primitive object={nodes.BUFFBONE_GLB_VFX_LOC2} />
        <primitive object={nodes.BUFFBONE_GLB_VFX_LOC3} />
        <primitive object={nodes.BUFFBONE_GLB_VFX_LOC4} />
        <primitive object={nodes.BUFFBONE_GLB_VFX_LOC5} />
        <primitive object={nodes.BUFFBONE_GLB_VFX_LOC6} />
        <primitive object={nodes.BUFFBONE_GLB_VFX_LOC7} />
        <primitive object={nodes.BUFFBONE_GLB_VFX_LOC8} />
        <primitive object={nodes.weaponBase} />
      </group>
      <group position={[-108.02, -21.55, -71.69]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.RecallWeapon}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
