
type Props = {
    text: string;
    size?: 'small' | 'big'
    onClick: ()=> void;
}
export default function ColorButton({text, size='small', onClick}: Props) {
    return (
        <div className={`rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300
            ${size === 'big' ? 'p-[0.5rem]' : 'p-[0.2rem]'}
        `}>
        <button onClick={onClick} className={`bg-white rounded-sm text-base hover:opacity-90 transition-opacity
           ${size === 'big' ? 'p-4' : 'p-[0.5rem]'}`}>
            {text}
        </button>
        </div>
    );
}

