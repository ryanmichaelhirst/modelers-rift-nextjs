import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    ROOT: THREE.Bone
    L_thigh: THREE.Bone
    R_thigh: THREE.Bone
    TailL1_a: THREE.Bone
    TailL2_a: THREE.Bone
    TailL3_a: THREE.Bone
    TailL4_a: THREE.Bone
    TailR1_a: THREE.Bone
    TailR2_a: THREE.Bone
    TailR3_a: THREE.Bone
    TailR4_a: THREE.Bone
    Tail_A: THREE.Bone
    weapon: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC1: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC1: THREE.Bone
  }
  materials: {
    MAT_ahri_shadow_fox: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Idle5'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Dance'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_0'
  | 'Turn_L180'
  | 'Turn_R180'
  | 'Recall'
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
        <primitive object={nodes.ROOT} />
        <primitive object={nodes.L_thigh} />
        <primitive object={nodes.R_thigh} />
        <primitive object={nodes.TailL1_a} />
        <primitive object={nodes.TailL2_a} />
        <primitive object={nodes.TailL3_a} />
        <primitive object={nodes.TailL4_a} />
        <primitive object={nodes.TailR1_a} />
        <primitive object={nodes.TailR2_a} />
        <primitive object={nodes.TailR3_a} />
        <primitive object={nodes.TailR4_a} />
        <primitive object={nodes.Tail_A} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC1} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC1} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.MAT_ahri_shadow_fox}
        skeleton={nodes.mesh_0.skeleton}
        position={[-123.5, -6.93, -105.08]}
        scale={0.02}
      />
    </group>
  )
}
