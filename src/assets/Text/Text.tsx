import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import defaultFont from "fonts/font.json"
import * as THREE from "three"
import { extend, MeshProps } from 'react-three-fiber'
extend({ TextGeometry })
 
export interface TextProps {
    text?: string
    color?: string
    fontfile?: any
    textGeometry?: Partial<TextGeometryParameters>
    meshProps?: MeshProps
    centerOrigin?: boolean
}

const Text = (props: TextProps) => {
    const { text, color, textGeometry, fontfile, meshProps } = props

    const font = new FontLoader().parse(fontfile??defaultFont)
    const textGeo = new TextGeometry(text??'DefaultText', { size:0.5, font: font, height:0.1, ...textGeometry })
    let position = meshProps?.position as THREE.Vector3 ?? new THREE.Vector3(0, 0, 0)
    
    if (props.centerOrigin && meshProps?.position) {
        textGeo.computeBoundingBox()
        const bb = textGeo.boundingBox?.getCenter(new THREE.Vector3())!
        position = new THREE.Vector3(position.x - bb.x, position.y - bb.y, position.z - bb.z)
    }
    return (
      <mesh
        geometry={textGeo}
        {...meshProps}
        position={position}
      >
        <meshPhysicalMaterial attach='material' color={color??'#FF0000'} />
      </mesh>
    )
  }

  export default Text