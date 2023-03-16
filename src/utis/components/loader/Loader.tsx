import { ClimbingBoxLoader } from 'react-spinners';

type Props = {
    loading:boolean
}

export const Loader = ({loading}:Props)=>{
    return <>
       <ClimbingBoxLoader
            color={"white"}
            loading={loading}
        />
    </>
}