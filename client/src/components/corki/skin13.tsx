import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    L_Gun: THREE.Bone
    R_Gun: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    Corki_Arcade_MAT: THREE.MeshBasicMaterial
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
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2_Windup'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Buffbones'
  | 'corki_skin08_additivebomb'
  | 'corki_skin08_run_to_idle'
  | 'Run_WithBomb'
  | 'corki_skin08_spell2_to_idle'
  | 'corki_skin08_spell2_withbomb'
  | 'Spell2_Loop'
  | 'Spell2_WithBomb_Loop'
  | 'Turn_L'
  | 'Turn_R'
  | 'Idle_In'
  | 'Run_In'
  | 'Run_Variant1'
  | 'Run_Variant2'
  | 'Joke'
  | 'Spell4_TRANSA'
  | 'Spell4_TRANSB'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Spell4_TRANSC'
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
        <primitive object={nodes.root} />
        <primitive object={nodes.L_Gun} />
        <primitive object={nodes.R_Gun} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Corki_Arcade_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-143.36, 27.75, -144.88]}
        scale={0.02}
      />
    </group>
  )
}
