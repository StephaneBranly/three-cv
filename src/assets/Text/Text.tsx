import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import defaultFont from "fonts/font.json"
import { extend, MeshProps } from 'react-three-fiber';
extend({ TextGeometry })
 
export interface TextProps {
    text?: string
    color?: string
    fontfile?: any
    textGeometry?: Partial<TextGeometryParameters>
    meshProps?: MeshProps
}

const Text = (props: TextProps) => {
    const { text, color, textGeometry, fontfile, meshProps } = props;

    const font = new FontLoader().parse(fontfile??defaultFont);
    const textGeo = new TextGeometry(text??'DefaultText', { size:0.5, font: font, height:0.1, ...textGeometry });
    return (
      <mesh
        geometry={textGeo}
        {...meshProps}
      >
        <meshPhysicalMaterial attach='material' color={color??'#FF0000'} />
      </mesh>
    )
  }

  export default Text