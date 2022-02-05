import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BuffBone_Cstm_Healthbar: THREE.Bone
    Chair: THREE.Bone
    Rose1: THREE.Bone
    Rose2: THREE.Bone
    Rose3: THREE.Bone
    Rose4: THREE.Bone
    Rose5: THREE.Bone
    Rose6: THREE.Bone
    Rose: THREE.Bone
    Recall_Root: THREE.Bone
    Recall1_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    RecallChair: THREE.MeshBasicMaterial
    Rose: THREE.MeshBasicMaterial
    BirdRose: THREE.MeshBasicMaterial
    RecallVine: THREE.MeshBasicMaterial
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
  | 'zyra_skin04_idle2'
  | 'zyra_skin04_idle3'
  | 'zyra_skin04_idle4'
  | 'Joke'
  | 'Laugh'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Spell1'
  | 'Spell2'
  | 'zyra_skin04_spell3'
  | 'zyra_skin04_spell4'
  | 'Taunt'
  | 'Turn_L'
  | 'Turn_R'
  | 'zyra_idle5'
  | 'Run1'
  | 'Walk'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BuffBone_Cstm_Healthbar} />
        <primitive object={nodes.Chair} />
        <primitive object={nodes.Rose1} />
        <primitive object={nodes.Rose2} />
        <primitive object={nodes.Rose3} />
        <primitive object={nodes.Rose4} />
        <primitive object={nodes.Rose5} />
        <primitive object={nodes.Rose6} />
        <primitive object={nodes.Rose} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.Recall1_Root} />
      </group>
      <group position={[-98.16, -3.48, -84.06]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.RecallChair}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Rose}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.BirdRose}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.RecallVine}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
