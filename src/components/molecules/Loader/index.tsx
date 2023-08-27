import NextImage from "next/image";
import team1 from '../../../public/images/team-1.webp';

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
    return (
        <NextImage
            {...props}
            loader={customLoader}
        />
    );
}