import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
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
    Main_Arrow: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    All_Purpose: THREE.Bone
    Bow_01: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Throne: THREE.Bone
    Foot_Rest: THREE.Bone
    Recall_Arrow1: THREE.Bone
    Recall_Arrow2: THREE.Bone
    Recall_Arrow3: THREE.Bone
    Recall_Arrow4: THREE.Bone
    Recall_Arrow5: THREE.Bone
    Recall_Arrow6: THREE.Bone
    Recall_Arrow7: THREE.Bone
  }
  materials: {
    Ashe_Skin09_MAT: THREE.MeshBasicMaterial
    Ashe_Skin09_Tassles_MAT: THREE.MeshBasicMaterial
    Ashe_Skin09_Bow_MAT: THREE.MeshBasicMaterial
    Ashe_Skin09_Recall_MAT: THREE.MeshBasicMaterial
    Skin09_Arrow_MAT: THREE.MeshBasicMaterial
    Skin09_Recall_Arrows_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Idle5'
  | 'Laugh'
  | 'Recall'
  | 'Run'
  | 'Run2'
  | 'Run3'
  | 'Spell1'
  | 'Spell1_In'
  | 'Spell4'
  | 'Taunt'
  | 'ashe_skin09_taunt'
  | 'Turn_0'
  | 'Turn_L'
  | 'Turn_R'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Joke'
  | 'Spell2'
  | 'Spell3'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Main_Arrow} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.All_Purpose} />
        <primitive object={nodes.Bow_01} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Throne} />
        <primitive object={nodes.Foot_Rest} />
        <primitive object={nodes.Recall_Arrow1} />
        <primitive object={nodes.Recall_Arrow2} />
        <primitive object={nodes.Recall_Arrow3} />
        <primitive object={nodes.Recall_Arrow4} />
        <primitive object={nodes.Recall_Arrow5} />
        <primitive object={nodes.Recall_Arrow6} />
        <primitive object={nodes.Recall_Arrow7} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ashe_Skin09_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Ashe_Skin09_Tassles_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Ashe_Skin09_Bow_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Ashe_Skin09_Recall_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Skin09_Arrow_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Skin09_Recall_Arrows_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
    </group>
  )
}
