import { RotatingLines } from 'react-loader-spinner';

const Spinner = () => {
    return (
        <div className='grid h-[80vh] place-items-center'>
            <RotatingLines
                strokeColor='grey'
                strokeWidth='4'
                animationDuration='1'
                width='100'
                visible={true}
            />
        </div>
    );
};

export default Spinner;
