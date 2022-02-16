import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    F_R_Cloth5: THREE.Bone
    F_R_Cloth6: THREE.Bone
    Weapon: THREE.Bone
    F_L_Cloth5: THREE.Bone
    L_BUFFBONE_GLB_FOOT_LOC: THREE.Bone
    R_BUFFBONE_GLB_FOOT_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    F_L_Cloth6: THREE.Bone
    C_BUFFBONE_CSTM_RECTICLE_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    L_Sona09_Cape1_Grnd: THREE.Bone
    R_Sona09_Cape1_Grnd: THREE.Bone
  }
  materials: {
    Sona_Skin09_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Recall'
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
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.F_R_Cloth5} />
        <primitive object={nodes.F_R_Cloth6} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.F_L_Cloth5} />
        <primitive object={nodes.L_BUFFBONE_GLB_FOOT_LOC} />
        <primitive object={nodes.R_BUFFBONE_GLB_FOOT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.F_L_Cloth6} />
        <primitive object={nodes.C_BUFFBONE_CSTM_RECTICLE_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.L_Sona09_Cape1_Grnd} />
        <primitive object={nodes.R_Sona09_Cape1_Grnd} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Sona_Skin09_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-74.63, -56.93, -96.37]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
