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
    Pelvis_Translate: THREE.Bone
    Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Remote2World: THREE.Bone
    Rope_Space: THREE.Bone
    LauncherRoot: THREE.Bone
    Bullet: THREE.Bone
    Bit_Model: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    OS_Veigar_MAT: THREE.MeshBasicMaterial
    Eyes1: THREE.MeshBasicMaterial
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
        <primitive object={nodes.Pelvis_Translate} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Remote2World} />
        <primitive object={nodes.Rope_Space} />
        <primitive object={nodes.LauncherRoot} />
        <primitive object={nodes.Bullet} />
        <primitive object={nodes.Bit_Model} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-65.77, -0.84, -17.38]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.OS_Veigar_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Eyes1} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Eyes9} skeleton={nodes.mesh_0_2.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Recall_Rope}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Recall_Launcher}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
