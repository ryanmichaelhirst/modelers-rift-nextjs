import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
  }
  materials: {
    NPC_Pet_Gumps_Base_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'glion_idle_in_variant'
  | 'RunBase'
  | 'Spell1'
  | 'Taunt'
  | 'Celebrate'
  | 'glion_idle_in'
  | 'Joke'
  | 'glion_laugh'
  | 'Idle1'
  | 'Recall'
  | 'Recall_Winddown'
  | 'RunHaste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'glion_into_run'
  | 'Death'
  | 'Turn_0'
  | 'Turn_R'
  | 'Turn_L'
  | 'RunFlight'
  | 'Interact'
  | 'Cast_Cycle'
  | 'Cast_Animation'
  | 'Into_Cast'
  | 'glion_hurt'
  | 'Spray'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'glion_laugh_out'
  | 'Cast_Turn'
  | 'Cast_Damage'
  | 'glion_joke'
  | 'glion_taunt'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.NPC_Pet_Gumps_Base_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-63.8, 0, -63.69]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
