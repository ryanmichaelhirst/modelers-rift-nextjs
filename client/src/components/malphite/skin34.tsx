import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
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
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Armor: THREE.MeshBasicMaterial
    Recall_Stone: THREE.MeshBasicMaterial
    Recall_Spurs: THREE.MeshBasicMaterial
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

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
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
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Armor}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Recall_Stone}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Recall_Spurs}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
