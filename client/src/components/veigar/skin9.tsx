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
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    mesh_0_11: THREE.SkinnedMesh
    mesh_0_12: THREE.SkinnedMesh
    Pelvis_Translate: THREE.Bone
    Root: THREE.Bone
    Bit_Model: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Remote2World: THREE.Bone
    Rope_Space: THREE.Bone
    LauncherRoot: THREE.Bone
    Bullet: THREE.Bone
  }
  materials: {
    OS_Veigar_MAT: THREE.MeshBasicMaterial
    OS_Veigar_W_Mesh: THREE.MeshBasicMaterial
    Eyes1: THREE.MeshBasicMaterial
    Eyes2: THREE.MeshBasicMaterial
    Eyes3: THREE.MeshBasicMaterial
    Eyes4: THREE.MeshBasicMaterial
    Eyes5: THREE.MeshBasicMaterial
    Eyes6: THREE.MeshBasicMaterial
    Eyes7: THREE.MeshBasicMaterial
    Eyes8: THREE.MeshBasicMaterial
    Eyes9: THREE.MeshBasicMaterial
    Recall_Rope: THREE.MeshBasicMaterial
    Recall_Launcher: THREE.MeshBasicMaterial
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
  | 'veigar_skin09_joke'
  | 'Laugh'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run'
  | 'veigar_skin09_spell1'
  | 'Spell1_Upper'
  | 'veigar_skin09_spell2'
  | 'Spell3_Base'
  | 'Spell3_Upper'
  | 'Spell4'
  | 'veigar_skin09_spell4_trans'
  | 'Taunt'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Pelvis_Translate} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Bit_Model} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Remote2World} />
        <primitive object={nodes.Rope_Space} />
        <primitive object={nodes.LauncherRoot} />
        <primitive object={nodes.Bullet} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.OS_Veigar_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.OS_Veigar_W_Mesh}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Eyes1} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Eyes2} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Eyes3} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Eyes4} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_6.geometry} material={materials.Eyes5} skeleton={nodes.mesh_0_6.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_7.geometry} material={materials.Eyes6} skeleton={nodes.mesh_0_7.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_8.geometry} material={materials.Eyes7} skeleton={nodes.mesh_0_8.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_9.geometry} material={materials.Eyes8} skeleton={nodes.mesh_0_9.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_10.geometry} material={materials.Eyes9} skeleton={nodes.mesh_0_10.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Recall_Rope}
        skeleton={nodes.mesh_0_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_12.geometry}
        material={materials.Recall_Launcher}
        skeleton={nodes.mesh_0_12.skeleton}
      />
    </group>
  )
}
