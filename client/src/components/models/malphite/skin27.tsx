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
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Recall_HandStone1: THREE.Bone
    Recall_HandStone2: THREE.Bone
    Recall_Spurs01: THREE.Bone
    Recall_Spurs02: THREE.Bone
    Recall_Spurs03: THREE.Bone
    Recall_Spurs04: THREE.Bone
    Recall_Spurs05: THREE.Bone
    Recall_Spurs06: THREE.Bone
    Recall_Spurs07: THREE.Bone
    Recall_Spurs08: THREE.Bone
    Recall_Spurs09: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Recall_Stone: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt'
  | 'Spell3'
  | 'attack3.pie_c_10_9'
  | 'Recall'
  | 'Recall_Winddown'
  | 'spell1.pie_c_10_9'
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
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Recall_HandStone1} />
        <primitive object={nodes.Recall_HandStone2} />
        <primitive object={nodes.Recall_Spurs01} />
        <primitive object={nodes.Recall_Spurs02} />
        <primitive object={nodes.Recall_Spurs03} />
        <primitive object={nodes.Recall_Spurs04} />
        <primitive object={nodes.Recall_Spurs05} />
        <primitive object={nodes.Recall_Spurs06} />
        <primitive object={nodes.Recall_Spurs07} />
        <primitive object={nodes.Recall_Spurs08} />
        <primitive object={nodes.Recall_Spurs09} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <group position={[-70.01, -1.24, -87.88]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall_Stone}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
