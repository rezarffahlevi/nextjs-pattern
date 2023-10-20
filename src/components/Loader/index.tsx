import NextImage from "next/image";
import team1 from '../../../public/images/team-1.webp';
import { useState } from "react";

// interface MyLoader {
//     src?: string
// }
// const MyLoader = ({
//     src = '',
// }: MyLoader) => {
//     return team1;
// };

// export default MyLoader
const customLoader = (props: any): any => {
    return props.src;
}

export default function Image(props: any) {
    const [src, setSrc] = useState(props?.src ?? '');
    return (
        <img
            {...props}
            src={src}
            // loader={customLoader}
            onError={(e: any) => {
                setSrc('/assets/images/demos/demo1/banner/banner1.jpg');
                // setMovie(object);
            }}
        />
    );
}